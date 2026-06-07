ALTER TABLE public.obras ADD COLUMN IF NOT EXISTS is_featured_home boolean NOT NULL DEFAULT false;

-- Mark the first 3 published obras (by sort_order) as featured on home
WITH first_three AS (
  SELECT id FROM public.obras WHERE published = true ORDER BY sort_order, created_at LIMIT 3
)
UPDATE public.obras SET is_featured_home = true WHERE id IN (SELECT id FROM first_three);