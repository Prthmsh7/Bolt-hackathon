# Bolt Hackathon - Startup Pitch Portal

A platform where startup founders can register and pitch their startup ideas, with intellectual property (IP) protection through blockchain technology.

## Key Features

1. **IPFS Integration**: Upload pitch metadata/PDF to IPFS using Pinata
2. **NFT Minting**: Create NFTs on Algorand containing IPFS references (via user's Pera Wallet)
3. **Metadata Storage**: Save all metadata in Supabase for easy access

## Tech Stack

- **Backend**: Node.js
- **Frontend**: React with TypeScript
- **Storage**: 
  - IPFS (via Pinata) for pitch documents
  - Supabase for metadata and user data
- **Blockchain**: Algorand for NFT minting (user connects via Pera Wallet)

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   - Copy `.env.example` to `.env`
   - Fill in your configuration values:
     - Supabase credentials
     - Pinata API credentials

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
.
├── auth/               # Authentication and startup registration
├── src/               # Main source code
├── frontend/          # React frontend application
└── config/            # Configuration files
```

## Environment Variables

Required environment variables:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key

# Pinata Configuration
PINATA_API_KEY=your_pinata_api_key
PINATA_API_SECRET=your_pinata_api_secret
```

**Note**: Algorand connections are handled through user wallets (Pera Wallet) - no server-side Algorand configuration needed.

## API Endpoints

### POST /api/startups/register/init
Initialize startup registration with pitch document

**Request Body:**
```json
{
  "name": "Startup Name",
  "description": "Startup Description",
  "walletAddress": "user_algorand_address",
  "pitchFile": [File]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "ipfsUrl": "ipfs://...",
    "nftTxnData": {
      "txn": "encoded_transaction",
      "message": "Please sign the transaction in your wallet"
    }
  }
}
```

### POST /api/startups/register/finalize
Finalize registration after user signs transaction

**Request Body:**
```json
{
  "userId": "user_id",
  "pitchId": "pitch_id", 
  "ipfsUrl": "ipfs://...",
  "signedTxn": "signed_transaction_bytes"
}
```

## Development

1. The `auth.service.js` handles:
   - Uploading pitch documents to IPFS via Pinata
   - Preparing NFT transactions for user signing
   - Storing metadata in Supabase after transaction confirmation

2. Each startup registration follows these steps:
   - Upload pitch to IPFS
   - Prepare NFT transaction for user wallet
   - User signs transaction via Pera Wallet
   - Submit signed transaction to Algorand
   - Store all metadata in Supabase

## Security Notes

- Never commit your `.env` file
- Users manage their own Algorand accounts via Pera Wallet
- Use appropriate access control for Supabase tables