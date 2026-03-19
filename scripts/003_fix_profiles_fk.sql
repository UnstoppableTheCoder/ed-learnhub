-- Remove the foreign key constraint from profiles to allow demo data
-- The trigger will still create profiles for auth users

ALTER TABLE public.profiles DROP CONSTRAINT IF EXISTS profiles_id_fkey;

-- Add a policy to allow inserting demo profiles (for seeding)
DROP POLICY IF EXISTS "profiles_insert_demo" ON public.profiles;
CREATE POLICY "profiles_insert_demo" ON public.profiles FOR INSERT WITH CHECK (true);
