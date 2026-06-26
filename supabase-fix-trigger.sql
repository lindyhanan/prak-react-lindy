-- ============================================================
-- PERBAIKAN TRIGGER: handle_new_user (lebih robust)
-- ============================================================
-- Jalankan script ini di Supabase SQL Editor
-- ============================================================

-- 1. HAPUS TRIGGER LAMA (jika ada)
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;

-- 2. GANTI FUNCTION DENGAN VERSI LEBIH ROBUST
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER
SET search_path = ''
AS $$
DECLARE
    meta_json jsonb;
    full_name_text text;
    role_text text;
BEGIN
    -- Ambil metadata user, handle jika NULL
    meta_json := COALESCE(NEW.raw_user_meta_data, '{}'::jsonb);
    
    -- Ekstrak full_name dengan aman
    full_name_text := NULLIF(meta_json->>'full_name', '');
    IF full_name_text IS NULL THEN
        full_name_text := 'User Baru';
    END IF;
    
    -- Ekstrak role dengan aman (default: member)
    role_text := NULLIF(meta_json->>'role', '');
    IF role_text IS NULL OR role_text NOT IN ('admin', 'member') THEN
        role_text := 'member';
    END IF;

    -- Insert ke profiles
    INSERT INTO public.profiles (id, email, full_name, role, tier, points)
    VALUES (
        NEW.id,
        NEW.email,
        full_name_text,
        role_text::user_role,
        'Bronze',
        0
    );

    RETURN NEW;

EXCEPTION WHEN OTHERS THEN
    -- Log error detail ke Postgres logs untuk debugging
    RAISE WARNING 'handle_new_user error: % (SQLSTATE: %)', SQLERRM, SQLSTATE;
    RAISE;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- 3. BUAT ULANG TRIGGER
CREATE OR REPLACE TRIGGER on_auth_user_created
    AFTER INSERT ON auth.users
    FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================================
-- VERIFIKASI: Cek apakah trigger sudah aktif
-- ============================================================
SELECT 
    trigger_name,
    event_manipulation,
    event_object_table,
    action_timing,
    action_statement
FROM information_schema.triggers
WHERE event_object_table = 'users' 
  AND trigger_schema = 'auth';
