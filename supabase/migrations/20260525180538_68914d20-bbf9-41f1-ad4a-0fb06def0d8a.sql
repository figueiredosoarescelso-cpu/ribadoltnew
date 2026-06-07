-- Harden user_roles INSERT: explicit admin-only INSERT policy to prevent
-- any authenticated user from inserting an admin row for themselves.
DROP POLICY IF EXISTS "Only admins can insert roles" ON public.user_roles;
CREATE POLICY "Only admins can insert roles"
ON public.user_roles
FOR INSERT
TO authenticated
WITH CHECK (private.has_role(auth.uid(), 'admin'::app_role));