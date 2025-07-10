
-- Create user profiles table for storing additional user information
CREATE TABLE public.profiles (
  id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT NOT NULL,
  email TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on profiles
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Create policies for profiles
CREATE POLICY "Users can view their own profile" ON public.profiles
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can insert their own profile" ON public.profiles
  FOR INSERT WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON public.profiles
  FOR UPDATE USING (auth.uid() = id);

-- Create function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.email),
    NEW.email
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Create trigger for new user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- Create assignments table
CREATE TABLE public.assignments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title TEXT NOT NULL,
  subject TEXT NOT NULL,
  grade TEXT NOT NULL,
  description TEXT,
  due_date DATE,
  status TEXT DEFAULT 'pending',
  created_by UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on assignments
ALTER TABLE public.assignments ENABLE ROW LEVEL SECURITY;

-- Create policies for assignments
CREATE POLICY "Users can view their own assignments" ON public.assignments
  FOR SELECT USING (auth.uid() = created_by);

CREATE POLICY "Users can create assignments" ON public.assignments
  FOR INSERT WITH CHECK (auth.uid() = created_by);

CREATE POLICY "Users can update their own assignments" ON public.assignments
  FOR UPDATE USING (auth.uid() = created_by);

CREATE POLICY "Users can delete their own assignments" ON public.assignments
  FOR DELETE USING (auth.uid() = created_by);

-- Create students table
CREATE TABLE public.students (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  grade TEXT NOT NULL,
  subject TEXT,
  performance_score INTEGER DEFAULT 0,
  teacher_id UUID REFERENCES auth.users(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on students
ALTER TABLE public.students ENABLE ROW LEVEL SECURITY;

-- Create policies for students
CREATE POLICY "Teachers can view their students" ON public.students
  FOR SELECT USING (auth.uid() = teacher_id);

CREATE POLICY "Teachers can create students" ON public.students
  FOR INSERT WITH CHECK (auth.uid() = teacher_id);

CREATE POLICY "Teachers can update their students" ON public.students
  FOR UPDATE USING (auth.uid() = teacher_id);

CREATE POLICY "Teachers can delete their students" ON public.students
  FOR DELETE USING (auth.uid() = teacher_id);

-- Insert sample data for assignments
INSERT INTO public.assignments (title, subject, grade, description, due_date, status, created_by) VALUES
('Mathematics Worksheet - Addition', 'Mathematics', 'Grade 3', 'Practice addition problems with carrying', '2024-01-20', 'active', auth.uid()),
('Hindi Story Writing', 'Hindi', 'Grade 4', 'Write a short story about friendship', '2024-01-25', 'pending', auth.uid()),
('Science Project - Plants', 'Science', 'Grade 5', 'Create a model showing parts of plants', '2024-01-30', 'active', auth.uid()),
('English Grammar Test', 'English', 'Grade 3', 'Test on verbs and nouns', '2024-01-22', 'completed', auth.uid());

-- Insert sample data for students
INSERT INTO public.students (name, grade, subject, performance_score, teacher_id) VALUES
('Rahul Sharma', 'Grade 3', 'Mathematics', 85, auth.uid()),
('Priya Patel', 'Grade 4', 'Hindi', 92, auth.uid()),
('Amit Kumar', 'Grade 5', 'Science', 78, auth.uid()),
('Sneha Gupta', 'Grade 3', 'English', 88, auth.uid()),
('Vikash Singh', 'Grade 4', 'Mathematics', 76, auth.uid()),
('Ritu Yadav', 'Grade 5', 'Science', 94, auth.uid());
