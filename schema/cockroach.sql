CREATE TABLE IF NOT EXISTS student_profiles (
  user_id STRING PRIMARY KEY,
  full_name STRING,
  email STRING,
  grade STRING,
  gpa DECIMAL(3, 2),
  sat_score INT,
  act_score INT,
  intended_major STRING,
  location STRING,
  interests STRING[] NOT NULL DEFAULT ARRAY[]:::STRING[],
  preferred_location STRING NOT NULL DEFAULT 'any',
  max_annual_budget DECIMAL(12, 2),
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE TABLE IF NOT EXISTS universities (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name STRING NOT NULL,
  location STRING NOT NULL,
  rating INT NOT NULL CHECK (rating BETWEEN 1 AND 5),
  acceptance_rate DECIMAL(5, 2),
  avg_sat STRING,
  avg_gpa STRING,
  tuition STRING,
  programs STRING[] NOT NULL DEFAULT ARRAY[]:::STRING[],
  strengths STRING[] NOT NULL DEFAULT ARRAY[]:::STRING[],
  weaknesses STRING[] NOT NULL DEFAULT ARRAY[]:::STRING[],
  application_deadline DATE,
  image_url STRING,
  description STRING,
  curriculum_url STRING,
  performance_notes STRING,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS universities_rating_idx ON universities (rating DESC);
CREATE INDEX IF NOT EXISTS universities_deadline_idx ON universities (application_deadline);

CREATE TABLE IF NOT EXISTS applications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id STRING NOT NULL REFERENCES student_profiles (user_id) ON DELETE CASCADE,
  university_id UUID NOT NULL REFERENCES universities (id) ON DELETE CASCADE,
  status STRING NOT NULL DEFAULT 'saved',
  notes STRING,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, university_id)
);

CREATE INDEX IF NOT EXISTS applications_user_status_idx ON applications (user_id, status);

CREATE TABLE IF NOT EXISTS notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id STRING NOT NULL REFERENCES student_profiles (user_id) ON DELETE CASCADE,
  university_id UUID REFERENCES universities (id) ON DELETE SET NULL,
  type STRING NOT NULL,
  title STRING NOT NULL,
  message STRING NOT NULL,
  is_read BOOL NOT NULL DEFAULT false,
  due_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS notifications_user_unread_idx ON notifications (user_id, is_read, created_at DESC);

CREATE TABLE IF NOT EXISTS chat_messages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id STRING NOT NULL REFERENCES student_profiles (user_id) ON DELETE CASCADE,
  role STRING NOT NULL CHECK (role IN ('user', 'assistant', 'system')),
  content STRING NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);

CREATE INDEX IF NOT EXISTS chat_messages_user_created_idx ON chat_messages (user_id, created_at DESC);
