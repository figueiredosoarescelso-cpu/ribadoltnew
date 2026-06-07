
-- Fix WARN 2: drop broad public SELECT on storage.objects, keep admin-only SELECT
DROP POLICY IF EXISTS "Public read media" ON storage.objects;

CREATE POLICY "Admins list media"
ON storage.objects FOR SELECT
TO authenticated
USING (bucket_id = 'media' AND public.has_role(auth.uid(), 'admin'));

-- Fix WARN 1: leads insert no longer trivially `true`
DROP POLICY IF EXISTS "Anyone can submit a lead" ON public.leads;

CREATE POLICY "Anyone can submit a valid lead"
ON public.leads FOR INSERT
TO anon, authenticated
WITH CHECK (
  length(trim(name)) > 0
  AND length(trim(email)) > 3
  AND email LIKE '%_@_%._%'
  AND length(coalesce(message, '')) < 5000
);

-- Fix WARN 3-6: revoke public execution on internal trigger functions
REVOKE EXECUTE ON FUNCTION public.handle_new_user() FROM PUBLIC, anon, authenticated;
REVOKE EXECUTE ON FUNCTION public.update_updated_at_column() FROM PUBLIC, anon, authenticated;
