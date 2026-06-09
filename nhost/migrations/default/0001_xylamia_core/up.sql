CREATE EXTENSION IF NOT EXISTS pgcrypto;

CREATE TABLE public.student_profiles (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL UNIQUE,
  full_name text,
  email text,
  grade text,
  gpa numeric(3, 2),
  sat_score integer,
  act_score integer,
  intended_major text,
  location text,
  interests text[] NOT NULL DEFAULT '{}',
  preferred_location text NOT NULL DEFAULT 'any',
  max_annual_budget numeric(12, 2),
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE TABLE public.universities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  location text NOT NULL,
  rating integer NOT NULL CHECK (rating BETWEEN 1 AND 5),
  acceptance_rate numeric(5, 2),
  avg_sat text,
  avg_gpa text,
  tuition text,
  programs text[] NOT NULL DEFAULT '{}',
  strengths text[] NOT NULL DEFAULT '{}',
  weaknesses text[] NOT NULL DEFAULT '{}',
  application_deadline date,
  image_url text,
  description text,
  curriculum_url text,
  performance_notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX universities_rating_idx ON public.universities (rating DESC);
CREATE INDEX universities_deadline_idx ON public.universities (application_deadline);

CREATE TABLE public.applications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  university_id uuid NOT NULL REFERENCES public.universities (id) ON DELETE CASCADE,
  status text NOT NULL DEFAULT 'saved',
  notes text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  UNIQUE (user_id, university_id)
);

CREATE INDEX applications_user_status_idx ON public.applications (user_id, status);

CREATE TABLE public.notifications (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  university_id uuid REFERENCES public.universities (id) ON DELETE SET NULL,
  type text NOT NULL,
  title text NOT NULL,
  message text NOT NULL,
  is_read boolean NOT NULL DEFAULT false,
  due_at timestamptz,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX notifications_user_unread_idx ON public.notifications (user_id, is_read, created_at DESC);

CREATE TABLE public.chat_messages (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL,
  role text NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content text NOT NULL,
  created_at timestamptz NOT NULL DEFAULT now()
);

CREATE INDEX chat_messages_user_created_idx ON public.chat_messages (user_id, created_at DESC);
