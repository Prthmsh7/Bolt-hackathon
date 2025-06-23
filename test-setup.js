require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const pinataSDK = require('@pinata/sdk');

async function testConnections() {
  try {
    // Test Supabase Connection
    console.log('Testing Supabase connection...');
    const supabase = createClient(
      process.env.SUPABASE_URL,
      process.env.SUPABASE_KEY
    );
    
    // Test Supabase by inserting and reading a test record
    const { data: testData, error: testError } = await supabase
      .from('startups')
      .insert([
        {
          user_id: 'test-user',
          name: 'Test Startup',
          description: 'Test Description',
          ipfs_url: 'test-ipfs-url',
          nft_tx_hash: 'test-tx-hash'
        }
      ])
      .select();
    
    if (testError) {
      console.error('Error testing Supabase:', testError);
    } else {
      console.log('✅ Supabase connection successful');
      // Clean up test data
      await supabase
        .from('startups')
        .delete()
        .match({ user_id: 'test-user' });
    }

    // Test Pinata Connection
    console.log('\nTesting Pinata connection...');
    const pinata = new pinataSDK(
      process.env.PINATA_API_KEY,
      process.env.PINATA_API_SECRET
    );
    
    const testPinData = {
      test: 'Hello Pinata!'
    };
    
    const result = await pinata.pinJSONToIPFS(testPinData);
    console.log('✅ Pinata test successful, IPFS hash:', result.IpfsHash);

    console.log('\n✅ All backend services are working correctly!');
    console.log('Note: Algorand connections are handled by user wallets (Pera Wallet) in the frontend.');

  } catch (error) {
    console.error('Error during testing:', error);
  }
}

testConnections();