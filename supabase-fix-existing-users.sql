-- ============================================================
-- ISI PROFILE UNTUK USER YANG SUDAH TERLANJUR REGISTRASI
-- ============================================================
-- Jalankan ini di Supabase SQL Editor
-- ============================================================

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

-- Cek hasilnya
SELECT id, email, full_name, role, tier FROM public.profiles;
