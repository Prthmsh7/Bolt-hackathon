/*
  # Create investment system for marketplace

  1. New Tables
    - `investment_tiers` - Defines investment tiers with benefits
    - `investments` - Records user investments in projects

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users

  3. Features
    - Track investments with transaction details
    - Associate investments with marketplace items
    - Record investment tiers and benefits
*/

-- Create investment_tiers table
CREATE TABLE IF NOT EXISTS investment_tiers (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  min_amount decimal(12,2) NOT NULL,
  max_amount decimal(12,2) NOT NULL,
  benefits jsonb DEFAULT '[]'::jsonb,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create investments table
CREATE TABLE IF NOT EXISTS investments (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  investor_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  marketplace_item_id uuid NOT NULL REFERENCES marketplace_items(id) ON DELETE CASCADE,
  amount decimal(12,2) NOT NULL,
  tier_id uuid REFERENCES investment_tiers(id),
  transaction_hash text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  payment_method text DEFAULT 'card',
  payment_details jsonb DEFAULT '{}'::jsonb,
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

-- Enable RLS
ALTER TABLE investment_tiers ENABLE ROW LEVEL SECURITY;
ALTER TABLE investments ENABLE ROW LEVEL SECURITY;

-- Investment tiers policies (public read, admin write)
CREATE POLICY "Anyone can view investment tiers"
  ON investment_tiers
  FOR SELECT
  TO public
  USING (true);

-- Investments policies
CREATE POLICY "Users can view their own investments"
  ON investments
  FOR SELECT
  TO authenticated
  USING (auth.uid() = investor_id);

CREATE POLICY "Users can create investments"
  ON investments
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = investor_id);

-- Create indexes for performance
CREATE INDEX IF NOT EXISTS idx_investments_investor ON investments(investor_id);
CREATE INDEX IF NOT EXISTS idx_investments_marketplace_item ON investments(marketplace_item_id);
CREATE INDEX IF NOT EXISTS idx_investments_status ON investments(status);
CREATE INDEX IF NOT EXISTS idx_investments_created_at ON investments(created_at DESC);

-- Function to update marketplace item stats when investment is made
CREATE OR REPLACE FUNCTION update_marketplace_item_on_investment()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' AND NEW.status = 'completed' THEN
    UPDATE marketplace_items 
    SET purchase_count = purchase_count + 1,
        updated_at = now()
    WHERE id = NEW.marketplace_item_id;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for marketplace item update
DROP TRIGGER IF EXISTS trigger_update_marketplace_on_investment ON investments;
CREATE TRIGGER trigger_update_marketplace_on_investment
  AFTER INSERT ON investments
  FOR EACH ROW
  EXECUTE FUNCTION update_marketplace_item_on_investment();

-- Insert default investment tiers
INSERT INTO investment_tiers (name, min_amount, max_amount, benefits)
VALUES 
  ('Supporter', 1000, 9999, '["Early access to updates", "Exclusive newsletter", "Name in supporters list"]'),
  ('Backer', 10000, 49999, '["All Supporter benefits", "Quarterly investor calls", "Beta access to product"]'),
  ('Partner', 50000, 99999, '["All Backer benefits", "Advisory board seat", "Revenue sharing (1%)"]'),
  ('Executive', 100000, 1000000, '["All Partner benefits", "Board seat", "Revenue sharing (3%)", "Co-branding opportunities"]')
ON CONFLICT DO NOTHING;

-- Add comments for documentation
COMMENT ON TABLE investment_tiers IS 'Defines investment tiers with benefits and amount ranges';
COMMENT ON TABLE investments IS 'Records user investments in marketplace projects';