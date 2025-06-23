# 🎟️ Token‑Funded Projects Platform (TFP)

**Token‑Funded Projects Platform** is a fractional‑ownership marketplace that empowers developers to mint digital tokens representing shares in their projects—like AI agents, e-commerce tools, or SaaS—and offers investors micro‑shares with ongoing royalty income and liquidity.

---

## 🚀 Why It Matters

- For **Developers**: Access funding early by selling fractional project ownership (e.g., 1,000 tokens = 100 % of future earnings). Retain control while scaling your idea.
- For **Investors**: Invest as little as ₹10–₹20 in innovative projects and earn proportional revenue when the project makes money.

---

## 🔍 Key Features

### 1. Project Registration & Token Minting  
- Developers register a project → receive 1,000 minted tokens (each = 0.1 %).  
- Set token price, token allocation, soft/hard fundraising caps.

### 2. Primary Funding Round  
- Runs for a fixed duration (e.g., 60 days).  
- Investors contribute via fiat or crypto; tokens are escrowed until round close.

### 3. Live Pitch Investment Events  
- **Pitch Day**: 10–15 minute live stream with demo and investor Q&A.  
- **Tap‑to‑Invest**: Live contributions via in‑stream button.  
- **Mini‑Auction Window**: 24‑hour auction immediately after pitch.

### 4. Secondary Trading Windows  
- Weekly‑scheduled "Trading Thursdays" (24 hrs) for secondary token trading.  
- Orders are matched and settled via smart contracts.

### 5. Automated Royalties & Distributions  
- Revenue triggers auto distribution of earnings to token holders via smart contract.

### 6. AI‑Powered Valuation & Insights  
- Real‑time pricing engine analyzing similar projects, developer traction, trading volume—recommends token price.

### 7. Compliance & Access Control  
- KYC/AML and accreditation checks.  
- Phased access: early access for current investors, then public.  
- Optional lock‑up / holding periods for early buyers.


















FILECOIN & SUPABASE
Looking at your project and the hackathon requirements, I can confirm that YES, we absolutely have the required Filecoin/FilCDN integration features that are compulsory for the hackathon track:

✅ Required Features Already Implemented:
1. PDP Storage Deal with CDN Enabled
✅ Videos are uploaded to FilCDN (Filecoin CDN)
✅ Storage deals are created automatically during upload
✅ Deal information is tracked (Deal ID, Provider, Price, Status)
✅ Database stores Filecoin-specific metadata (CID, Deal ID, Provider, etc.)
2. FilCDN Integration
✅ Complete FilCDN client implementation (src/lib/filcdn.ts)
✅ File upload to Filecoin network via FilCDN
✅ Content retrieval using CIDs
✅ Streaming URLs for video playback
✅ Thumbnail storage on Filecoin
✅ Content existence verification
🎯 Hackathon-Specific Features:
Video Streaming Application ✅
✅ Full video streaming platform
✅ Video player with advanced controls
✅ Upload interface specifically for Filecoin storage
✅ Content discovery and browsing
✅ User authentication and profiles
Filecoin Integration Highlights:
Decentralized Storage: Videos stored permanently on Filecoin
Content Addressing: Each video has a unique CID
Storage Deals: Automatic deal creation with storage providers
CDN Delivery: Fast content delivery via FilCDN
Cryptographic Verification: Content integrity guaranteed
Censorship Resistance: Decentralized, unstoppable content
UI Features for Hackathon Demo:
🔹 Filecoin Badge: Videos show "Stored on Filecoin" indicator
🔹 Storage Details Panel: Shows CID, Deal ID, Provider info
🔹 Upload Status: Real-time Filecoin upload progress
🔹 Demo Mode: Works with/without FilCDN for testing
📊 Database Schema Compliance:
The database already includes all Filecoin-related fields:

filecoin_cid - Content Identifier
filecoin_deal_id - Storage deal reference
storage_provider - Provider address
file_size - File size tracking
storage_status - Deal status monitoring
🚀 Ready for Hackathon Submission:
Your project perfectly matches the hackathon requirements:

✅ Architecture: Uses FilCDN for Filecoin content delivery
✅ Design: Modern, responsive video streaming interface
✅ Build: Complete application with Filecoin integration
✅ Fetch Content: Retrieves videos from Filecoin PDP deals
The application demonstrates a real-world use case of decentralized video storage and streaming, which is exactly what the hackathon is looking for. You're all set! 🎉

so does this mean we've removed supabase?

No, we have NOT removed Supabase!

Here's what we actually have - a hybrid architecture that combines the best of both worlds:

🏗️ Current Architecture:
Supabase (Still Active) ✅
Database: All video metadata, user profiles, comments, likes, subscriptions
Authentication: User sign-up, sign-in, session management
Real-time features: Comments, likes, user interactions
Row Level Security: Data protection and access control
FilCDN/Filecoin (Added) ✅
Video Storage: Actual video files stored on Filecoin network
Thumbnail Storage: Image files on decentralized storage
Content Delivery: Fast streaming via FilCDN
Permanent Storage: Cryptographically verified, censorship-resistant
📊 How They Work Together:

User uploads video → FilCDN stores file → Returns CID → Supabase stores metadata
                                                    ↓
Video metadata in Supabase includes:
- filecoin_cid (Content Identifier)
- filecoin_deal_id (Storage deal reference)
- storage_provider (Provider address)
- video_url (FilCDN streaming URL)
🔄 Data Flow:
Upload: Video → FilCDN → Filecoin Network
Metadata: Video info → Supabase Database
Playback: CID → FilCDN → Stream to user
Interactions: Comments/Likes → Supabase
💡 Why This Hybrid Approach is Perfect:
Supabase: Fast queries, real-time features, user management
Filecoin: Permanent storage, decentralization, hackathon requirements
Best Performance: Metadata queries are instant, video streaming is decentralized
Scalability: Database scales with Supabase, storage scales with Filecoin
This architecture gives you:

✅ Hackathon compliance (Filecoin storage)
✅ Production performance (Supabase for fast operations)
✅ Decentralization (Videos can't be censored or lost)
✅ User experience (Fast app interactions)
So Supabase is very much still there and essential to the platform! 🚀

8.0M monthly tokens remaining.
Subscribe to Pro 50 for 2x more usage

Clear
Update





---


SDB-Project123

