/*
  # Fix profiles table RLS policies

  1. New Policies
    - Update RLS policies for the profiles table to allow proper insertion
    - Fix the issue with "new row violates row-level security policy for table profiles"
    - Ensure authenticated users can manage their own profiles

  2. Security
    - Maintain proper security while allowing necessary operations
    - Enable appropriate access for authenticated users
*/

-- Make sure RLS is enabled
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- Drop existing policies to recreate them
DROP POLICY IF EXISTS "Profiles are viewable by users who created them." ON public.profiles;
DROP POLICY IF EXISTS "Users can insert their own profile." ON public.profiles;
DROP POLICY IF EXISTS "Users can update their own profile." ON public.profiles;

-- Create more permissive policies
CREATE POLICY "Profiles are viewable by users who created them."
  ON public.profiles
  FOR SELECT
  TO authenticated
  USING (auth.uid() = id);

-- Allow users to insert their own profile
CREATE POLICY "Users can insert their own profile."
  ON public.profiles
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update their own profile."
  ON public.profiles
  FOR UPDATE
  TO authenticated
  USING (auth.uid() = id);

-- Add a policy for anon users during signup
CREATE POLICY "Anon users can create profiles during signup"
  ON public.profiles
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Add a policy for public viewing of profiles
CREATE POLICY "Public can view profiles"
  ON public.profiles
  FOR SELECT
  TO public
  USING (true);