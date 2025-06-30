/*
  # Fix project purchases table creation

  1. Check if table exists before creating policies
  2. Drop existing policies before recreating them
  3. Ensure all functionality is preserved
*/

-- Create project_purchases table if it doesn't exist
CREATE TABLE IF NOT EXISTS project_purchases (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  buyer_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  marketplace_item_id uuid NOT NULL REFERENCES marketplace_items(id) ON DELETE CASCADE,
  purchase_price decimal(10,2) NOT NULL,
  transaction_hash text,
  status text DEFAULT 'pending' CHECK (status IN ('pending', 'completed', 'failed', 'refunded')),
  created_at timestamptz DEFAULT now(),
  completed_at timestamptz
);

-- Enable RLS
ALTER TABLE project_purchases ENABLE ROW LEVEL SECURITY;

-- Drop existing policies if they exist
DROP POLICY IF EXISTS "Users can view their own purchases" ON project_purchases;
DROP POLICY IF EXISTS "Users can create purchases" ON project_purchases;

-- Create policies
CREATE POLICY "Users can view their own purchases"
  ON project_purchases
  FOR SELECT
  TO authenticated
  USING (auth.uid() = buyer_id);

CREATE POLICY "Users can create purchases"
  ON project_purchases
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = buyer_id);

-- Create function to update purchase count on marketplace items
CREATE OR REPLACE FUNCTION update_purchase_count()
RETURNS TRIGGER AS $$
BEGIN
  IF TG_OP = 'INSERT' THEN
    UPDATE marketplace_items 
    SET purchase_count = purchase_count + 1,
        updated_at = now()
    WHERE id = NEW.marketplace_item_id;
    RETURN NEW;
  END IF;
  RETURN NULL;
END;
$$ LANGUAGE plpgsql;

-- Create trigger for purchase count
DROP TRIGGER IF EXISTS trigger_update_purchase_count ON project_purchases;
CREATE TRIGGER trigger_update_purchase_count
  AFTER INSERT ON project_purchases
  FOR EACH ROW
  EXECUTE FUNCTION update_purchase_count();

-- Add indexes for better performance
CREATE INDEX IF NOT EXISTS idx_project_purchases_buyer ON project_purchases(buyer_id);
CREATE INDEX IF NOT EXISTS idx_project_purchases_item ON project_purchases(marketplace_item_id);
CREATE INDEX IF NOT EXISTS idx_project_purchases_status ON project_purchases(status);
CREATE INDEX IF NOT EXISTS idx_project_purchases_created ON project_purchases(created_at DESC);

-- Add comments for documentation
COMMENT ON TABLE project_purchases IS 'Stores user investments in marketplace projects';
COMMENT ON COLUMN project_purchases.buyer_id IS 'Reference to the user who made the purchase';
COMMENT ON COLUMN project_purchases.marketplace_item_id IS 'Reference to the purchased marketplace item';
COMMENT ON COLUMN project_purchases.purchase_price IS 'Amount paid for the investment';
COMMENT ON COLUMN project_purchases.transaction_hash IS 'Blockchain transaction hash (if applicable)';
COMMENT ON COLUMN project_purchases.status IS 'Status of the purchase (pending, completed, failed, refunded)';
COMMENT ON COLUMN project_purchases.created_at IS 'Timestamp when the purchase was initiated';
COMMENT ON COLUMN project_purchases.completed_at IS 'Timestamp when the purchase was completed';