/*
  # Update marketplace policies to show all IP registrations

  1. Changes
    - Modify marketplace items policy to show all items regardless of status
    - Update the auto-creation trigger to include pending items

  This migration ensures that all IP registrations, including those with pending status,
  are visible in the marketplace.
*/

-- Update the marketplace items policy to show all items regardless of status
DROP POLICY IF EXISTS "Anyone can view active marketplace items" ON marketplace_items;

CREATE POLICY "Anyone can view all marketplace items"
  ON marketplace_items
  FOR SELECT
  TO public
  USING (true);

-- Update the auto-creation trigger to include pending items
CREATE OR REPLACE FUNCTION create_marketplace_item_from_ip()
RETURNS TRIGGER AS $$
BEGIN
  -- Create marketplace item for all IP registrations, not just approved ones
  IF (NEW.status = 'pending' OR NEW.status = 'approved') AND 
     NOT EXISTS (SELECT 1 FROM marketplace_items WHERE ip_registration_id = NEW.id) THEN
    INSERT INTO marketplace_items (
      ip_registration_id,
      title,
      description,
      price,
      category,
      founder_name,
      company_name,
      demo_link,
      presentation_video,
      ipfs_url,
      thumbnail_url,
      status
    ) VALUES (
      NEW.id,
      NEW.title,
      NEW.description,
      CASE 
        WHEN NEW.category = 'AI/ML' THEN 50000
        WHEN NEW.category = 'Blockchain' THEN 75000
        WHEN NEW.category = 'Fintech' THEN 60000
        WHEN NEW.category = 'Healthtech' THEN 80000
        ELSE 40000
      END, -- Dynamic pricing based on category
      NEW.category,
      NEW.founder_name,
      NEW.company_name,
      NEW.demo_link,
      NEW.presentation_video,
      NEW.ipfs_url,
      COALESCE(
        'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=2',
        'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=2'
      ),
      NEW.status
    ) ON CONFLICT (ip_registration_id) DO NOTHING;
  END IF;
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Add pending items to marketplace for existing IP registrations
DO $$
DECLARE
  ip_record RECORD;
BEGIN
  FOR ip_record IN 
    SELECT * FROM ip_registrations 
    WHERE status = 'pending' 
    AND id NOT IN (SELECT ip_registration_id FROM marketplace_items WHERE ip_registration_id IS NOT NULL)
  LOOP
    INSERT INTO marketplace_items (
      ip_registration_id,
      title,
      description,
      price,
      category,
      founder_name,
      company_name,
      demo_link,
      presentation_video,
      ipfs_url,
      thumbnail_url,
      status
    ) VALUES (
      ip_record.id,
      ip_record.title,
      ip_record.description,
      CASE 
        WHEN ip_record.category = 'AI/ML' THEN 50000
        WHEN ip_record.category = 'Blockchain' THEN 75000
        WHEN ip_record.category = 'Fintech' THEN 60000
        WHEN ip_record.category = 'Healthtech' THEN 80000
        ELSE 40000
      END,
      ip_record.category,
      ip_record.founder_name,
      ip_record.company_name,
      ip_record.demo_link,
      ip_record.presentation_video,
      ip_record.ipfs_url,
      CASE 
        WHEN ip_record.category = 'AI/ML' THEN 'https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=2'
        WHEN ip_record.category = 'Blockchain' THEN 'https://images.pexels.com/photos/8369648/pexels-photo-8369648.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=2'
        WHEN ip_record.category = 'Fintech' THEN 'https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=2'
        WHEN ip_record.category = 'Healthtech' THEN 'https://images.pexels.com/photos/3938023/pexels-photo-3938023.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=2'
        ELSE 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=400&h=225&dpr=2'
      END,
      ip_record.status
    );
  END LOOP;
END $$;