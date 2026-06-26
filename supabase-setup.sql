-- ============================================================
-- TAHAP 1: INISIALISASI DATABASE SUPABASE
-- Jalankan script ini di Supabase SQL Editor (project: nooqhfnmdpyluzxfiugw)
-- ============================================================

-- ===================== 1. ENUM DEFINITIONS =====================
CREATE TYPE user_role AS ENUM ('admin', 'member', 'guest');
CREATE TYPE order_status AS ENUM ('pending', 'completed', 'cancelled');
CREATE TYPE member_tier AS ENUM ('Bronze', 'Silver', 'Gold');

-- ===================== 2. TABEL PROFILES =====================
CREATE TABLE public.profiles (
    id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
    email TEXT NOT NULL,
    full_name TEXT,
    phone TEXT,
    role user_role DEFAULT 'member'::user_role,
    points INT DEFAULT 0,
    tier member_tier DEFAULT 'Bronze'::member_tier,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ===================== 3. TABEL PRODUCTS =====================
CREATE TABLE public.products (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    name TEXT NOT NULL,
    description TEXT,
    price NUMERIC(12, 2) NOT NULL CHECK (price >= 0),
    stock INT NOT NULL CHECK (stock >= 0),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ===================== 4. TABEL ORDERS =====================
CREATE TABLE public.orders (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    customer_id UUID REFERENCES public.profiles(id) ON DELETE RESTRICT NOT NULL,
    total_amount NUMERIC(12, 2) DEFAULT 0 CHECK (total_amount >= 0),
    points_earned INT DEFAULT 0,
    status order_status DEFAULT 'pending'::order_status NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc'::text, NOW()) NOT NULL
);

-- ===================== 5. TABEL ORDER ITEMS =====================
CREATE TABLE public.order_items (
    id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
    order_id UUID REFERENCES public.orders(id) ON DELETE CASCADE NOT NULL,
    product_id UUID REFERENCES public.products(id) ON DELETE RESTRICT NOT NULL,
    quantity INT NOT NULL CHECK (quantity > 0),
    price NUMERIC(12, 2) NOT NULL CHECK (price >= 0)
);

-- ===================== 6. TRIGGER: SINKRONISASI REGISTRASI =====================

CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
    INSERT INTO public.profiles (id, email, full_name, role, tier, points)
    VALUES (
        NEW.id,
        NEW.email,
        COALESCE(NEW.raw_user_meta_data->>'full_name', 'User Baru'),
        COALESCE((NEW.raw_user_meta_data->>'role')::user_role, 'member'::user_role),
        'Bronze',
        0
    );
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ===================== 7. TRIGGER: POIN & TIER OTOMATIS =====================

CREATE OR REPLACE FUNCTION public.calculate_order_points_and_tier()
RETURNS TRIGGER AS $$
DECLARE
    calculated_points INT;
    total_user_points INT;
    new_tier member_tier;
BEGIN
    -- Hanya berjalan jika status berubah menjadi 'completed'
    IF NEW.status = 'completed' AND OLD.status != 'completed' THEN
        -- 1. Hitung poin dari order ini (Kelipatan Rp 10.000)
        calculated_points := FLOOR(NEW.total_amount / 10000);
        
        -- Update poin di order terkait
        UPDATE public.orders SET points_earned = calculated_points WHERE id = NEW.id;

        -- 2. Tambahkan poin ke profil customer
        UPDATE public.profiles 
        SET points = points + calculated_points
        WHERE id = NEW.customer_id
        RETURNING points INTO total_user_points;

        -- 3. Tentukan Tier Baru
        IF total_user_points >= 5000 THEN
            new_tier := 'Gold'::member_tier;
        ELSIF total_user_points >= 1000 THEN
            new_tier := 'Silver'::member_tier;
        ELSE
            new_tier := 'Bronze'::member_tier;
        END IF;

        -- Update Tier di profil
        UPDATE public.profiles SET tier = new_tier WHERE id = NEW.customer_id;
    END IF;
    RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

CREATE OR REPLACE TRIGGER on_order_status_completed
    AFTER UPDATE OF status ON public.orders
    FOR EACH ROW EXECUTE FUNCTION public.calculate_order_points_and_tier();

-- ===================== 8. ROW LEVEL SECURITY (RLS) =====================

-- Aktifkan RLS global
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.products ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.order_items ENABLE ROW LEVEL SECURITY;

-- Helper function untuk cek status Admin
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS BOOLEAN AS $$
BEGIN
    RETURN (SELECT role FROM public.profiles WHERE id = auth.uid()) = 'admin'::user_role;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- POLICY: PROFILES
CREATE POLICY "Admin bisa melakukan apa saja di profiles" ON public.profiles
    FOR ALL TO authenticated USING (public.is_admin());

CREATE POLICY "User bisa melihat profil sendiri" ON public.profiles
    FOR SELECT TO authenticated USING (auth.uid() = id);

CREATE POLICY "User bisa mengubah profil sendiri" ON public.profiles
    FOR UPDATE TO authenticated USING (auth.uid() = id);

-- POLICY: PRODUCTS
CREATE POLICY "Semua orang (termasuk guest) bisa melihat produk" ON public.products
    FOR SELECT TO public USING (true);

CREATE POLICY "Hanya admin yang bisa memodifikasi produk" ON public.products
    FOR ALL TO authenticated USING (public.is_admin());

-- POLICY: ORDERS
CREATE POLICY "Admin bisa melihat dan mengubah semua order" ON public.orders
    FOR ALL TO authenticated USING (public.is_admin());

CREATE POLICY "Member bisa melihat order milik sendiri" ON public.orders
    FOR SELECT TO authenticated USING (auth.uid() = customer_id);

CREATE POLICY "Member bisa membuat order baru" ON public.orders
    FOR INSERT TO authenticated WITH CHECK (auth.uid() = customer_id);

-- POLICY: ORDER_ITEMS
CREATE POLICY "Admin bisa mengelola semua item order" ON public.order_items
    FOR ALL TO authenticated USING (public.is_admin());

CREATE POLICY "Member bisa melihat item order sendiri" ON public.order_items
    FOR SELECT TO authenticated USING (
        EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.customer_id = auth.uid())
    );

CREATE POLICY "Member bisa memasukkan item ke order sendiri" ON public.order_items
    FOR INSERT TO authenticated WITH CHECK (
        EXISTS (SELECT 1 FROM public.orders WHERE orders.id = order_items.order_id AND orders.customer_id = auth.uid())
    );

-- ===================== 9. SEEDER: BUAT AKUN ADMIN PERTAMA =====================
-- Catatan: Buat user admin dulu dari Supabase Auth UI (Authentication > Add User),
-- lalu jalankan query berikut untuk mengubah role-nya menjadi admin:
-- UPDATE public.profiles SET role = 'admin' WHERE email = 'admin@email.com';
-- GANTI 'admin@email.com' dengan email yang sudah didaftarkan sebagai admin!

