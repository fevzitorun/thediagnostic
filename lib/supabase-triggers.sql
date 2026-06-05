-- ─── SUPABASE SQL EDITOR'A UYGULA ─────────────────────────────────────────────
-- 1. supabase.com → Projen → SQL Editor → Yeni query
-- 2. Aşağıdaki kodu yapıştır → Run

-- Yeni kullanıcı kaydolunca profiles tablosuna otomatik kayıt atar
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (
    id,
    role,
    platform,
    first_name,
    last_name,
    gdpr_consent,
    marketing_consent,
    created_at,
    updated_at
  ) VALUES (
    new.id,
    'patient',
    'scanbook',
    COALESCE(new.raw_user_meta_data->>'first_name', ''),
    COALESCE(new.raw_user_meta_data->>'last_name', ''),
    true,
    COALESCE((new.raw_user_meta_data->>'marketing_consent')::boolean, false),
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO NOTHING;
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger'ı bağla
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
