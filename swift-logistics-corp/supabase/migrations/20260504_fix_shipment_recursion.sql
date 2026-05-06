-- Create a secure shipment creation function to bypass RLS recursion
CREATE OR REPLACE FUNCTION public.create_shipment(
  p_customer_id UUID,
  p_package_description TEXT,
  p_package_weight_kg NUMERIC,
  p_pickup_address TEXT,
  p_drop_address TEXT,
  p_recipient_name TEXT,
  p_recipient_phone TEXT,
  p_price NUMERIC,
  p_eta_minutes INTEGER
)
RETURNS TABLE(id UUID, tracking_id TEXT)
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public, row_security = off
AS $$
BEGIN
  RETURN QUERY
  INSERT INTO public.shipments (
    customer_id,
    package_description,
    package_weight_kg,
    pickup_address,
    drop_address,
    recipient_name,
    recipient_phone,
    price,
    eta_minutes,
    status
  ) VALUES (
    p_customer_id,
    p_package_description,
    p_package_weight_kg,
    p_pickup_address,
    p_drop_address,
    p_recipient_name,
    p_recipient_phone,
    p_price,
    p_eta_minutes,
    'pending'
  )
  RETURNING public.shipments.id, public.shipments.tracking_id;
END; $$;

-- Grant execute to authenticated users
GRANT EXECUTE ON FUNCTION public.create_shipment(UUID, TEXT, NUMERIC, TEXT, TEXT, TEXT, TEXT, NUMERIC, INTEGER) TO authenticated;

-- Allow the function to be called via RPC
ALTER FUNCTION public.create_shipment(UUID, TEXT, NUMERIC, TEXT, TEXT, TEXT, TEXT, NUMERIC, INTEGER) SECURITY DEFINER;
