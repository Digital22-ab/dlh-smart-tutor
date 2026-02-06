
-- Add explicit deny policy for anonymous/unauthenticated access to profiles
CREATE POLICY "deny_anonymous_access"
ON public.profiles
FOR SELECT
TO anon
USING (false);
