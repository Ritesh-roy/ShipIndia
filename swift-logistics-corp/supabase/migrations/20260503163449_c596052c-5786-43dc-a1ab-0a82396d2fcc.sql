-- Roles enum
CREATE TYPE public.app_role AS ENUM ('admin', 'driver', 'customer');
CREATE TYPE public.account_type AS ENUM ('person', 'store');
CREATE TYPE public.shipment_status AS ENUM ('pending', 'assigned', 'picked_up', 'in_transit', 'delivered', 'cancelled', 'failed');
CREATE TYPE public.driver_availability AS ENUM ('online', 'offline', 'on_trip');

-- PROFILES
CREATE TABLE public.profiles (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  full_name TEXT,
  phone TEXT,
  email TEXT,
  account_type public.account_type NOT NULL DEFAULT 'person',
  avatar_url TEXT,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.profiles ENABLE ROW LEVEL SECURITY;

-- USER ROLES (separate table — never on profiles)
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  role public.app_role NOT NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  UNIQUE (user_id, role)
);
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Security definer role checker
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role public.app_role)
RETURNS BOOLEAN
LANGUAGE SQL STABLE SECURITY DEFINER SET search_path = public
AS $$
  SELECT EXISTS (SELECT 1 FROM public.user_roles WHERE user_id = _user_id AND role = _role)
$$;

-- DRIVERS
CREATE TABLE public.drivers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL UNIQUE REFERENCES auth.users(id) ON DELETE CASCADE,
  vehicle_type TEXT,
  vehicle_number TEXT,
  license_number TEXT,
  current_lat DOUBLE PRECISION,
  current_lng DOUBLE PRECISION,
  availability public.driver_availability NOT NULL DEFAULT 'offline',
  total_earnings NUMERIC(10,2) NOT NULL DEFAULT 0,
  rating NUMERIC(3,2) NOT NULL DEFAULT 5.0,
  total_trips INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.drivers ENABLE ROW LEVEL SECURITY;

-- SHIPMENTS
CREATE TABLE public.shipments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  tracking_id TEXT NOT NULL UNIQUE DEFAULT ('SL' || to_char(now(),'YYMMDD') || lpad((floor(random()*100000))::text,5,'0')),
  customer_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  driver_id UUID REFERENCES public.drivers(id) ON DELETE SET NULL,
  status public.shipment_status NOT NULL DEFAULT 'pending',
  package_description TEXT,
  package_weight_kg NUMERIC(8,2),
  pickup_address TEXT NOT NULL,
  pickup_lat DOUBLE PRECISION,
  pickup_lng DOUBLE PRECISION,
  drop_address TEXT NOT NULL,
  drop_lat DOUBLE PRECISION,
  drop_lng DOUBLE PRECISION,
  current_lat DOUBLE PRECISION,
  current_lng DOUBLE PRECISION,
  recipient_name TEXT,
  recipient_phone TEXT,
  price NUMERIC(10,2) NOT NULL DEFAULT 0,
  distance_km NUMERIC(8,2),
  eta_minutes INTEGER,
  scheduled_at TIMESTAMPTZ,
  delivered_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now(),
  updated_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.shipments ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_shipments_customer ON public.shipments(customer_id);
CREATE INDEX idx_shipments_driver ON public.shipments(driver_id);
CREATE INDEX idx_shipments_status ON public.shipments(status);

-- SHIPMENT EVENTS (status & GPS pings)
CREATE TABLE public.shipment_events (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  shipment_id UUID NOT NULL REFERENCES public.shipments(id) ON DELETE CASCADE,
  event_type TEXT NOT NULL,
  message TEXT,
  lat DOUBLE PRECISION,
  lng DOUBLE PRECISION,
  created_by UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.shipment_events ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_shipment_events_shipment ON public.shipment_events(shipment_id);

-- NOTIFICATIONS
CREATE TABLE public.notifications (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  type TEXT NOT NULL,
  title TEXT NOT NULL,
  message TEXT,
  read BOOLEAN NOT NULL DEFAULT false,
  data JSONB,
  created_at TIMESTAMPTZ NOT NULL DEFAULT now()
);
ALTER TABLE public.notifications ENABLE ROW LEVEL SECURITY;
CREATE INDEX idx_notifications_user ON public.notifications(user_id, read);

-- updated_at trigger
CREATE OR REPLACE FUNCTION public.touch_updated_at()
RETURNS TRIGGER LANGUAGE plpgsql AS $$
BEGIN NEW.updated_at = now(); RETURN NEW; END; $$;

CREATE TRIGGER trg_profiles_updated BEFORE UPDATE ON public.profiles FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER trg_drivers_updated BEFORE UPDATE ON public.drivers FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();
CREATE TRIGGER trg_shipments_updated BEFORE UPDATE ON public.shipments FOR EACH ROW EXECUTE FUNCTION public.touch_updated_at();

-- Auto-create profile + customer role on signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER LANGUAGE plpgsql SECURITY DEFINER SET search_path = public AS $$
BEGIN
  INSERT INTO public.profiles (id, full_name, email, phone, account_type)
  VALUES (
    NEW.id,
    COALESCE(NEW.raw_user_meta_data->>'full_name', NEW.raw_user_meta_data->>'name', ''),
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'phone', NEW.phone),
    COALESCE((NEW.raw_user_meta_data->>'account_type')::public.account_type, 'person')
  );
  -- Default role from metadata or 'customer'
  INSERT INTO public.user_roles (user_id, role)
  VALUES (NEW.id, COALESCE((NEW.raw_user_meta_data->>'role')::public.app_role, 'customer'));
  -- If driver, also create driver row
  IF (NEW.raw_user_meta_data->>'role') = 'driver' THEN
    INSERT INTO public.drivers (user_id) VALUES (NEW.id);
  END IF;
  RETURN NEW;
END; $$;

CREATE TRIGGER on_auth_user_created
AFTER INSERT ON auth.users
FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============ RLS POLICIES ============

-- profiles
CREATE POLICY "Users view own profile" ON public.profiles FOR SELECT TO authenticated USING (auth.uid() = id);
CREATE POLICY "Admins view all profiles" ON public.profiles FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Users update own profile" ON public.profiles FOR UPDATE TO authenticated USING (auth.uid() = id);
CREATE POLICY "Users insert own profile" ON public.profiles FOR INSERT TO authenticated WITH CHECK (auth.uid() = id);

-- user_roles
CREATE POLICY "Users view own roles" ON public.user_roles FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins view all roles" ON public.user_roles FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins manage roles" ON public.user_roles FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- drivers
CREATE POLICY "Drivers view own record" ON public.drivers FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Drivers update own record" ON public.drivers FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Admins view all drivers" ON public.drivers FOR SELECT TO authenticated USING (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Admins manage drivers" ON public.drivers FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));
CREATE POLICY "Customers can view assigned driver basic" ON public.drivers FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.shipments s WHERE s.driver_id = drivers.id AND s.customer_id = auth.uid())
);

-- shipments
CREATE POLICY "Customers view own shipments" ON public.shipments FOR SELECT TO authenticated USING (auth.uid() = customer_id);
CREATE POLICY "Customers create shipments" ON public.shipments FOR INSERT TO authenticated WITH CHECK (auth.uid() = customer_id);
CREATE POLICY "Customers update own pending shipments" ON public.shipments FOR UPDATE TO authenticated USING (auth.uid() = customer_id AND status = 'pending');
CREATE POLICY "Drivers view assigned shipments" ON public.shipments FOR SELECT TO authenticated USING (
  EXISTS (SELECT 1 FROM public.drivers d WHERE d.id = shipments.driver_id AND d.user_id = auth.uid())
);
CREATE POLICY "Drivers view pending pool" ON public.shipments FOR SELECT TO authenticated USING (
  status = 'pending' AND public.has_role(auth.uid(),'driver')
);
CREATE POLICY "Drivers update assigned shipments" ON public.shipments FOR UPDATE TO authenticated USING (
  EXISTS (SELECT 1 FROM public.drivers d WHERE d.id = shipments.driver_id AND d.user_id = auth.uid())
);
CREATE POLICY "Admins manage shipments" ON public.shipments FOR ALL TO authenticated USING (public.has_role(auth.uid(),'admin')) WITH CHECK (public.has_role(auth.uid(),'admin'));

-- shipment_events
CREATE POLICY "Stakeholders view events" ON public.shipment_events FOR SELECT TO authenticated USING (
  EXISTS (
    SELECT 1 FROM public.shipments s
    LEFT JOIN public.drivers d ON d.id = s.driver_id
    WHERE s.id = shipment_events.shipment_id
      AND (s.customer_id = auth.uid() OR d.user_id = auth.uid() OR public.has_role(auth.uid(),'admin'))
  )
);
CREATE POLICY "Drivers and admins insert events" ON public.shipment_events FOR INSERT TO authenticated WITH CHECK (
  public.has_role(auth.uid(),'driver') OR public.has_role(auth.uid(),'admin')
);

-- notifications
CREATE POLICY "Users read own notifications" ON public.notifications FOR SELECT TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "Users update own notifications" ON public.notifications FOR UPDATE TO authenticated USING (auth.uid() = user_id);
CREATE POLICY "System insert notifications" ON public.notifications FOR INSERT TO authenticated WITH CHECK (true);

-- realtime
ALTER PUBLICATION supabase_realtime ADD TABLE public.shipments;
ALTER PUBLICATION supabase_realtime ADD TABLE public.shipment_events;
ALTER PUBLICATION supabase_realtime ADD TABLE public.notifications;
ALTER PUBLICATION supabase_realtime ADD TABLE public.drivers;