/*
  # Create project_purchases table

  1. New Tables
    - `project_purchases`
      - `id` (uuid, primary key)
      - `buyer_id` (uuid, references users)
      - `marketplace_item_id` (uuid, references marketplace_items)
      - `purchase_price` (decimal)
      - `transaction_hash` (text)
      - `status` (text)
      - `created_at` (timestamp)
      - `completed_at` (timestamp)
  2. Security
    - Enable RLS on `project_purchases` table
    - Add policies for authenticated users to view and create their own purchases
  3. Triggers
    - Add trigger to update purchase count on marketplace items
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

-- Create policies (only if they don't exist)
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'project_purchases' AND policyname = 'Users can view their own purchases'
  ) THEN
    CREATE POLICY "Users can view their own purchases"
      ON project_purchases
      FOR SELECT
      TO authenticated
      USING (auth.uid() = buyer_id);
  END IF;

  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'project_purchases' AND policyname = 'Users can create purchases'
  ) THEN
    CREATE POLICY "Users can create purchases"
      ON project_purchases
      FOR INSERT
      TO authenticated
      WITH CHECK (auth.uid() = buyer_id);
  END IF;
END $$;

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