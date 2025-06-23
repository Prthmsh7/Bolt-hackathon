# Bolt Hackathon - Startup Pitch Portal

A platform where startup founders can register and pitch their startup ideas, with intellectual property (IP) protection through blockchain technology.

## Key Features

1. **IPFS Integration**: Upload pitch metadata/PDF to IPFS using Web3.Storage
2. **NFT Minting**: Create NFTs on Algorand containing IPFS references
3. **Metadata Storage**: Save all metadata in Supabase for easy access

## Tech Stack

- **Backend**: Node.js
- **Storage**: 
  - IPFS (via Web3.Storage) for pitch documents
  - Supabase for metadata and user data
- **Blockchain**: Algorand for NFT minting

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
     - Web3.Storage API token
     - Algorand node details
     - Creator account details

4. Start the development server:
   ```bash
   npm run dev
   ```

## Project Structure

```
.
├── auth/               # Authentication and startup registration
├── src/               # Main source code
└── config/            # Configuration files
```

## Environment Variables

Required environment variables:

```env
# Supabase Configuration
SUPABASE_URL=your_supabase_project_url
SUPABASE_KEY=your_supabase_anon_key

# Web3.Storage Configuration
WEB3_STORAGE_TOKEN=your_web3_storage_token

# Algorand Configuration
ALGOD_TOKEN=your_algod_token
ALGOD_SERVER=http://localhost
ALGOD_PORT=4001

# Algorand Creator Account
CREATOR_ADDRESS=your_algorand_creator_address
CREATOR_MNEMONIC=your_algorand_creator_mnemonic
```

## API Endpoints

### POST /api/startups/register
Register a new startup with pitch document

**Request Body:**
```json
{
  "name": "Startup Name",
  "description": "Startup Description",
  "pitchFile": [File]
}
```

**Response:**
```json
{
  "success": true,
  "data": {
    "startupId": "uuid",
    "ipfsUrl": "ipfs://...",
    "nftTxHash": "algorand_tx_hash"
  }
}
```

## Development

1. The `auth.service.js` handles:
   - Uploading pitch documents to IPFS
   - Minting NFTs on Algorand
   - Storing metadata in Supabase

2. Each startup registration follows these steps:
   - Upload pitch to IPFS
   - Create NFT with IPFS reference
   - Store all metadata in Supabase

## Security Notes

- Never commit your `.env` file
- Keep your Algorand creator account mnemonic secure
- Use appropriate access control for Supabase tables 