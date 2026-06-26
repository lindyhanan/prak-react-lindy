-- ============================================================
-- BACKFILL PROFILE + UPGRADE ADMIN SATU SQL
-- ============================================================

-- 1. Isi profile untuk user yang belum punya
INSERT INTO public.profiles (id, email, full_name, role, tier, points)
SELECT 
    au.id,
    au.email,
    COALESCE(au.raw_user_meta_data->>'full_name', 'User Baru'),
    'member',
    'Bronze',
    0
FROM auth.users au
LEFT JOIN public.profiles p ON p.id = au.id
WHERE p.id IS NULL;

-- 2. Upgrade admin@gmail.com jadi admin
UPDATE public.profiles SET role = 'admin' WHERE email = 'admin@gmail.com';

-- 3. Cek hasilnya
SELECT id, email, full_name, role, tier FROM public.profiles;
