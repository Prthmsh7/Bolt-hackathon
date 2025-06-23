# Bolt Startup Pitch Portal Frontend

A React-based frontend for the Bolt Startup Pitch Portal that allows founders to submit their pitches, which are then stored on IPFS and minted as NFTs on Algorand.

## Features

- Wallet connection (MyAlgo and Pera Wallet support)
- Pitch submission form with file upload
- IPFS storage integration
- NFT minting on Algorand

## Setup

1. Install dependencies:
```bash
npm install
```

2. Start the development server:
```bash
npm run dev
```

## Environment Variables

Create a `.env` file in the frontend directory with:

```env
VITE_API_URL=http://localhost:3000 # Your backend API URL
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build

## Tech Stack

- React with TypeScript
- Vite
- Chakra UI
- Algorand SDK
- MyAlgo/Pera Wallet integration
- Axios for API calls
