require('dotenv').config();
const { createClient } = require('@supabase/supabase-js');
const pinataSDK = require('@pinata/sdk');
const algosdk = require('algosdk');

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

    // Test Algorand Connection
    console.log('\nTesting Algorand connection...');
    const algodClient = new algosdk.Algodv2(
      '',
      process.env.ALGOD_SERVER,
      process.env.ALGOD_PORT
    );

    const status = await algodClient.status().do();
    console.log('✅ Algorand connection successful, last round:', status['last-round']);

  } catch (error) {
    console.error('Error during testing:', error);
  }
}

testConnections(); 