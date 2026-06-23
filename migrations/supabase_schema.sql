-- ─── MYSTERY LAB DATABASE SCHEMA & SECURITY POLICIES 🧪 ───

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Admin Users Catalog Table
CREATE TABLE IF NOT EXISTS admins (
    user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 2. User Profiles Table (Linked to Supabase auth.users)
CREATE TABLE IF NOT EXISTS profiles (
    id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
    name text,
    email text UNIQUE NOT NULL,
    avatar_url text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    updated_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 3. Science Kits Table
CREATE TABLE IF NOT EXISTS science_kits (
    id text PRIMARY KEY,
    name text NOT NULL,
    description text,
    price numeric NOT NULL,
    age_recommendation text,
    contents text[],
    image_url text,
    gradient text DEFAULT 'gradient-purple',
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 4. Experiments Table
CREATE TABLE IF NOT EXISTS experiments (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    title text NOT NULL,
    description text NOT NULL,
    difficulty text CHECK (difficulty IN ('Easy', 'Medium', 'Hard')) DEFAULT 'Easy',
    estimated_time text DEFAULT '15 mins',
    instructions text[],
    materials text[],
    video_url text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 5. Bookmarks & Favorites Table
CREATE TABLE IF NOT EXISTS bookmarks (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
    experiment_id uuid REFERENCES experiments(id) ON DELETE CASCADE,
    kit_id text REFERENCES science_kits(id) ON DELETE CASCADE,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL,
    CONSTRAINT one_target_check CHECK (
        (experiment_id IS NOT NULL AND kit_id IS NULL) OR 
        (experiment_id IS NULL AND kit_id IS NOT NULL)
    ),
    UNIQUE (user_id, experiment_id, kit_id)
);

-- 6. Contact & Enquiries Table (Captures leads and registrations)
CREATE TABLE IF NOT EXISTS contact_requests (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL, -- Null if anonymous visitor
    name text NOT NULL,
    email text NOT NULL,
    phone text,
    subject text NOT NULL CHECK (subject IN ('birthday-party', 'school-program', 'workshop', 'kit-purchase', 'general', 'partnership', 'career')),
    message text NOT NULL,
    status text CHECK (status IN ('Pending', 'Contacted', 'Resolved')) DEFAULT 'Pending',
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 7. Newsletter Subscriptions
CREATE TABLE IF NOT EXISTS newsletter (
    email text PRIMARY KEY,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 8. Bookings & Workshop Registrations
CREATE TABLE IF NOT EXISTS bookings (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    event_title text NOT NULL,
    student_name text NOT NULL,
    student_age integer NOT NULL,
    contact_phone text NOT NULL,
    preferred_date date,
    status text CHECK (status IN ('Pending', 'Confirmed', 'Cancelled')) DEFAULT 'Pending',
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 9. Feedback & Reviews
CREATE TABLE IF NOT EXISTS feedback (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id uuid REFERENCES auth.users(id) ON DELETE CASCADE,
    name text NOT NULL,
    rating integer CHECK (rating >= 1 AND rating <= 5) NOT NULL,
    comments text,
    created_at timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);

-- 10. Activity Logging
CREATE TABLE IF NOT EXISTS activity_logs (
    id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
    admin_id uuid REFERENCES auth.users(id) ON DELETE SET NULL,
    action text NOT NULL,
    description text,
    timestamp timestamp with time zone DEFAULT timezone('utc'::text, now()) NOT NULL
);


-- ─── SECURITY & ROW-LEVEL SECURITY (RLS) POLICIES 🛡️ ───

-- Helper function to check if the caller is an Admin
CREATE OR REPLACE FUNCTION is_admin(user_id uuid)
RETURNS boolean AS $$
BEGIN
    RETURN EXISTS (SELECT 1 FROM admins WHERE admins.user_id = $1);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Enable RLS on all tables
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE science_kits ENABLE ROW LEVEL SECURITY;
ALTER TABLE experiments ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookmarks ENABLE ROW LEVEL SECURITY;
ALTER TABLE contact_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter ENABLE ROW LEVEL SECURITY;
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;
ALTER TABLE feedback ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;

-- A. Profiles Policies
CREATE POLICY "Allow users to select their own profile" ON profiles
    FOR SELECT TO authenticated USING (auth.uid() = id OR is_admin(auth.uid()));

CREATE POLICY "Allow users to insert/update their own profile" ON profiles
    FOR ALL TO authenticated USING (auth.uid() = id) WITH CHECK (auth.uid() = id);

-- B. Science Kits & Experiments (Read for all, edit for admins only)
CREATE POLICY "Public read for science kits" ON science_kits FOR SELECT TO public USING (true);
CREATE POLICY "Admin write for science kits" ON science_kits FOR ALL TO authenticated USING (is_admin(auth.uid()));

CREATE POLICY "Public read for experiments" ON experiments FOR SELECT TO public USING (true);
CREATE POLICY "Admin write for experiments" ON experiments FOR ALL TO authenticated USING (is_admin(auth.uid()));

-- C. Bookmarks Policies (Owner isolated CRUD)
CREATE POLICY "User CRUD bookmarks" ON bookmarks FOR ALL TO authenticated
    USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);

-- D. Contact Requests Policies (Public insert, admin CRUD)
CREATE POLICY "Allow public inserts for contact requests" ON contact_requests FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Admin select/update/delete for contact requests" ON contact_requests FOR ALL TO authenticated USING (is_admin(auth.uid()));

-- E. Newsletter Policies (Public insert, admin CRUD)
CREATE POLICY "Allow public newsletter signup" ON newsletter FOR INSERT TO public WITH CHECK (true);
CREATE POLICY "Admin newsletter management" ON newsletter FOR ALL TO authenticated USING (is_admin(auth.uid()));

-- F. Bookings Policies (Owner read/update, admin CRUD)
CREATE POLICY "User bookings access" ON bookings FOR ALL TO authenticated
    USING (auth.uid() = user_id OR is_admin(auth.uid())) WITH CHECK (auth.uid() = user_id OR is_admin(auth.uid()));

-- G. Feedback Policies (Authenticated insert, public read, admin delete)
CREATE POLICY "Public read feedback" ON feedback FOR SELECT TO public USING (true);
CREATE POLICY "Authenticated insert feedback" ON feedback FOR INSERT TO authenticated WITH CHECK (auth.uid() = user_id);
CREATE POLICY "Admin feedback delete" ON feedback FOR DELETE TO authenticated USING (is_admin(auth.uid()));

-- H. Activity Logs Policies
CREATE POLICY "Admins read and write logs" ON activity_logs FOR ALL TO authenticated USING (is_admin(auth.uid()));

-- I. Admins Policies
CREATE POLICY "Admins list view" ON admins FOR SELECT TO authenticated USING (is_admin(auth.uid()));


-- ─── SEED INITIAL DATA 🧪 ───
INSERT INTO science_kits (id, name, description, price, age_recommendation, contents, image_url, gradient) VALUES
('starter', 'Starter Kit', 99, '5-8 years', ARRAY['Basic chemistry set', 'Microscope (100x)', 'Experiment guide (15 activities)', 'Safety equipment', 'Digital access code'], 'https://images.pexels.com/photos/8471903/pexels-photo-8471903.jpeg?auto=compress&cs=tinysrgb&w=400', 'gradient-blue'),
('family', 'Family Lab', 199, '6-12 years', ARRAY['Advanced chemistry & physics set', 'Digital microscope (400x)', 'Comprehensive guide (35 activities)', 'Lab equipment & tools', 'Family project challenges', 'Online community access'], 'https://images.pexels.com/photos/8471916/pexels-photo-8471916.jpeg?auto=compress&cs=tinysrgb&w=400', 'gradient-purple'),
('classroom', 'Classroom Bundle', 499, 'Grades K-6', ARRAY['Complete lab setup (30 students)', 'Professional equipment', 'Curriculum-aligned activities (50+)', 'Teacher training materials', 'Assessment tools', 'Ongoing curriculum support'], 'https://images.pexels.com/photos/8471908/pexels-photo-8471908.jpeg?auto=compress&cs=tinysrgb&w=400', 'gradient-pink')
ON CONFLICT (id) DO NOTHING;
