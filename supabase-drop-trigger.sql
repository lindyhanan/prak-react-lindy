-- ============================================================
-- HAPUS TRIGGER BERMASALAH
-- ============================================================
-- Jalankan ini di Supabase SQL Editor
-- ============================================================

-- Hapus trigger & function yang error
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Verifikasi: cek apakah masih ada trigger
SELECT * FROM information_schema.triggers 
WHERE event_object_table = 'users' AND trigger_schema = 'auth';
