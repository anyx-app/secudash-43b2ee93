
-- Enable necessary extensions
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create profiles table (extends auth.users)
CREATE TABLE IF NOT EXISTS public.profiles (
  id UUID REFERENCES auth.users(id) ON DELETE CASCADE PRIMARY KEY,
  full_name TEXT,
  role TEXT DEFAULT 'viewer' CHECK (role IN ('admin', 'analyst', 'viewer')),
  avatar_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create assets table
CREATE TABLE IF NOT EXISTS public.assets (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  type TEXT NOT NULL,
  ip_address INET,
  status TEXT DEFAULT 'offline',
  risk_score INTEGER DEFAULT 0,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create vulnerabilities table
CREATE TABLE IF NOT EXISTS public.vulnerabilities (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  asset_id UUID REFERENCES public.assets(id) ON DELETE CASCADE,
  cve_id TEXT,
  title TEXT NOT NULL,
  severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  status TEXT DEFAULT 'open' CHECK (status IN ('open', 'in_progress', 'resolved', 'false_positive')),
  description TEXT,
  remediation TEXT,
  discovered_at TIMESTAMPTZ DEFAULT NOW(),
  resolved_at TIMESTAMPTZ
);

-- Create compliance_standards table
CREATE TABLE IF NOT EXISTS public.compliance_standards (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  version TEXT,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create compliance_checks table
CREATE TABLE IF NOT EXISTS public.compliance_checks (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  standard_id UUID REFERENCES public.compliance_standards(id) ON DELETE CASCADE,
  asset_id UUID REFERENCES public.assets(id) ON DELETE SET NULL,
  control_id TEXT NOT NULL,
  status TEXT CHECK (status IN ('pass', 'fail', 'warning')),
  last_checked_at TIMESTAMPTZ DEFAULT NOW()
);

-- Create threat_events table
CREATE TABLE IF NOT EXISTS public.threat_events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  asset_id UUID REFERENCES public.assets(id) ON DELETE SET NULL,
  type TEXT NOT NULL,
  severity TEXT CHECK (severity IN ('low', 'medium', 'high', 'critical')),
  description TEXT,
  source_ip INET,
  status TEXT DEFAULT 'detected' CHECK (status IN ('detected', 'investigating', 'contained', 'resolved')),
  detected_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.assets ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.vulnerabilities ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_standards ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.compliance_checks ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.threat_events ENABLE ROW LEVEL SECURITY;

-- Policies for profiles
CREATE POLICY "Public profiles are viewable by everyone" 
  ON public.profiles FOR SELECT USING (true);
CREATE POLICY "Users can update own profile" 
  ON public.profiles FOR UPDATE USING (auth.uid() = id);

-- Policies for assets
CREATE POLICY "Assets are viewable by authenticated users" 
  ON public.assets FOR SELECT TO authenticated USING (true);
CREATE POLICY "Admins can insert assets" 
  ON public.assets FOR INSERT TO authenticated WITH CHECK (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );
CREATE POLICY "Admins can update assets" 
  ON public.assets FOR UPDATE TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role = 'admin')
  );

-- Policies for vulnerabilities
CREATE POLICY "Vulnerabilities are viewable by authenticated users" 
  ON public.vulnerabilities FOR SELECT TO authenticated USING (true);
CREATE POLICY "Analysts and Admins can manage vulnerabilities" 
  ON public.vulnerabilities FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'analyst'))
  );

-- Policies for compliance_standards (Read Only)
CREATE POLICY "Compliance standards are viewable by everyone" 
  ON public.compliance_standards FOR SELECT USING (true);

-- Policies for compliance_checks
CREATE POLICY "Compliance checks are viewable by authenticated users" 
  ON public.compliance_checks FOR SELECT TO authenticated USING (true);
CREATE POLICY "Analysts and Admins can manage compliance checks" 
  ON public.compliance_checks FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'analyst'))
  );

-- Policies for threat_events
CREATE POLICY "Threat events are viewable by authenticated users" 
  ON public.threat_events FOR SELECT TO authenticated USING (true);
CREATE POLICY "Analysts and Admins can manage threat events" 
  ON public.threat_events FOR ALL TO authenticated USING (
    EXISTS (SELECT 1 FROM public.profiles WHERE id = auth.uid() AND role IN ('admin', 'analyst'))
  );

-- Function to handle new user signup
CREATE OR REPLACE FUNCTION public.handle_new_user() 
RETURNS trigger AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, role)
  VALUES (new.id, new.raw_user_meta_data->>'full_name', 'viewer');
  RETURN new;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE OR REPLACE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE PROCEDURE public.handle_new_user();
