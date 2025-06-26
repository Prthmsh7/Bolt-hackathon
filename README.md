# Seedora - The Ultimate Developer & Investor Platform

<div align="center">
  <img src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg?auto=compress&cs=tinysrgb&w=800&h=400&dpr=2" alt="Seedora Banner" width="800" height="400" style="border-radius: 12px; margin-bottom: 20px;">
  
  [![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
  [![React](https://img.shields.io/badge/React-18.2.0-blue.svg)](https://reactjs.org/)
  [![TypeScript](https://img.shields.io/badge/TypeScript-5.0.2-blue.svg)](https://www.typescriptlang.org/)
  [![Supabase](https://img.shields.io/badge/Supabase-2.39.0-green.svg)](https://supabase.com/)
  [![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.3.3-38B2AC.svg)](https://tailwindcss.com/)
</div>

## 🚀 Overview

**Seedora** is a revolutionary platform that bridges the gap between innovative developers and forward-thinking investors. Built with cutting-edge technology, it provides a comprehensive ecosystem for intellectual property protection, project showcasing, investment opportunities, and AI-powered market insights.

### 🎯 Mission Statement

To democratize innovation by providing developers with the tools to protect their intellectual property while connecting them with investors who can help bring their ideas to life.

## ✨ Key Features

### 🛡️ Intellectual Property Protection
- **Blockchain-based IP Registration**: Permanent, tamper-proof registration of projects on the blockchain
- **IPFS Storage**: Decentralized storage using Pinata for project documents and metadata
- **Legal Compliance**: HIPAA-compliant data handling and secure document management
- **Automated Timestamping**: Cryptographic proof of creation and ownership dates

### 🔗 GitHub Integration
- **OAuth Authentication**: Seamless GitHub account connection
- **Repository Showcase**: Display your best repositories with detailed metrics
- **Code Quality Metrics**: Automatic analysis of stars, forks, and contribution patterns
- **Technical Credibility**: Link repositories to IP registrations for verification

### 💰 Investment Marketplace
- **Project Discovery**: Browse registered IP projects available for investment
- **Smart Filtering**: Advanced search and categorization system
- **Investment Tracking**: Monitor your portfolio performance and returns
- **Secure Transactions**: Blockchain-based investment recording

### 🤖 MCP-Powered Analytics
- **Machine Callable Programs**: AI-powered market analysis and insights
- **Real-time Data Processing**: Live market trends and investment opportunities
- **Risk Assessment**: Automated risk analysis for investment decisions
- **Predictive Analytics**: Market forecasting and trend prediction

### 🎨 Modern User Experience
- **Responsive Design**: Optimized for all devices and screen sizes
- **Dark/Light Themes**: Customizable interface preferences
- **Accessibility**: WCAG 2.1 compliant design
- **Performance Optimized**: Fast loading times and smooth interactions

## 🏗️ Technical Architecture

### Frontend Stack
```
React 18.2.0 + TypeScript 5.0.2
├── UI Framework: Tailwind CSS 3.3.3
├── Icons: Lucide React 0.263.1
├── State Management: React Hooks + Context API
├── Routing: React Router (SPA)
├── Build Tool: Vite 4.4.5
└── Package Manager: npm
```

### Backend & Services
```
Supabase (Backend-as-a-Service)
├── Authentication: Row Level Security (RLS)
├── Database: PostgreSQL with real-time subscriptions
├── Storage: File uploads and management
├── Edge Functions: Serverless API endpoints
└── Real-time: WebSocket connections
```

### Blockchain & Storage
```
Decentralized Infrastructure
├── IPFS: Pinata for document storage
├── Algorand: Blockchain for IP registration
├── Wallet Integration: Pera Wallet support
└── Smart Contracts: Automated IP protection
```

### AI & Analytics
```
MCP (Machine Callable Programs)
├── Market Analysis: Real-time trend detection
├── Investment Insights: AI-powered recommendations
├── Risk Assessment: Automated portfolio analysis
└── Predictive Modeling: Future market forecasting
```

## 🚀 Getting Started

### Prerequisites

Before you begin, ensure you have the following installed:
- **Node.js** (v18.0.0 or higher)
- **npm** (v8.0.0 or higher)
- **Git** (for version control)

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/your-username/seedora.git
   cd seedora
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   
   Copy the example environment file:
   ```bash
   cp .env.example .env
   ```

   Configure your environment variables:
   ```env
   # Supabase Configuration
   VITE_SUPABASE_URL=your_supabase_project_url
   VITE_SUPABASE_ANON_KEY=your_supabase_anon_key

   # Pinata Configuration (for IPFS)
   VITE_PINATA_API_KEY=your_pinata_api_key
   VITE_PINATA_API_SECRET=your_pinata_api_secret

   # FilCDN Configuration (for Filecoin storage with CDN)
   VITE_FILCDN_API_KEY=your_filcdn_api_key
   VITE_FILCDN_BASE_URL=https://api.filcdn.io/v1
   VITE_FILCDN_ENABLED=true

   # GitHub OAuth Configuration
   VITE_GITHUB_CLIENT_ID=your_github_oauth_client_id
   VITE_GITHUB_CLIENT_SECRET=your_github_oauth_client_secret

   # Optional: Algorand Configuration
   VITE_ALGOD_TOKEN=
   VITE_ALGOD_SERVER=https://testnet-api.algonode.cloud
   VITE_ALGOD_PORT=443
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   
   Navigate to `http://localhost:5173` to see the application running.

## 🔧 Configuration Guide

### Supabase Setup

1. **Create a Supabase Project**
   - Visit [supabase.com](https://supabase.com)
   - Create a new project
   - Copy your project URL and anon key

2. **Database Schema**
   
   Run the provided migration files to set up the database schema:
   ```sql
   -- Tables created:
   - profiles (user profiles)
   - ip_registrations (IP protection records)
   - marketplace_items (public marketplace listings)
   - project_likes (user engagement tracking)
   - project_purchases (investment tracking)
   ```

3. **Row Level Security (RLS)**
   
   All tables have RLS enabled with appropriate policies for:
   - Public read access for marketplace items
   - User-specific access for personal data
   - Secure authentication flows

### GitHub Integration Setup

1. **Create GitHub OAuth App**
   - Go to GitHub Settings > Developer settings > OAuth Apps
   - Create a new OAuth App
   - Set Authorization callback URL to: `http://localhost:5173/auth/github/callback`
   - Copy Client ID and Client Secret to your `.env` file

2. **Permissions Required**
   - `repo`: Access to repositories
   - `user:email`: Access to user email

### IPFS/Pinata Configuration

1. **Create Pinata Account**
   - Visit [pinata.cloud](https://pinata.cloud)
   - Create an account and generate API keys
   - Add keys to your `.env` file

2. **Storage Features**
   - Automatic file uploads to IPFS
   - Metadata storage for IP registrations
   - Permanent, decentralized storage

### Algorand Wallet Integration

1. **Pera Wallet Setup**
   - Install Pera Wallet browser extension or mobile app
   - Create or import an Algorand wallet
   - Connect to the application for blockchain transactions

## 📱 Application Structure

### Component Architecture

```
src/
├── components/
│   ├── Auth.tsx                 # Authentication modal
│   ├── Dashboard.tsx            # Main dashboard
│   ├── Marketplace.tsx          # Investment marketplace
│   ├── UserProfile.tsx          # User profile management
│   ├── EnhancedAnalytics.tsx    # MCP-powered analytics
│   ├── GitHubIntegration.tsx    # GitHub repository management
│   ├── IPRegistration.tsx       # IP protection workflow
│   ├── MCPAssistant.tsx         # AI assistant chat
│   ├── MCPAssistantButton.tsx   # Floating chat button
│   ├── LandingPage.tsx          # Marketing landing page
│   ├── Navbar.tsx               # Navigation component
│   ├── VideoPlayer.tsx          # Video content player
│   ├── VideoUploadModal.tsx     # Video upload interface
│   ├── WalletConnect.tsx        # Blockchain wallet connection
│   └── AuctionSystem.tsx        # Nouns-style auction system
├── contexts/
│   └── AuthContext.tsx          # Authentication state management
├── data/
│   └── demoProjects.ts          # Sample project data
├── lib/
│   ├── supabase.ts              # Supabase client configuration
│   ├── filcdn.ts                # FilCDN/Filecoin integration
│   └── pinata.service.ts        # IPFS storage service
├── services/
│   └── pinata.service.ts        # Pinata API integration
├── types/
│   └── Video.ts                 # TypeScript type definitions
└── styles/
    └── index.css                # Global styles and animations
```

### Data Flow Architecture

```
User Interaction
    ↓
React Components
    ↓
Context API (State Management)
    ↓
Supabase Client
    ↓
PostgreSQL Database
    ↓
Real-time Updates
```

### Authentication Flow

```
1. User clicks "Sign In"
2. AuthModal component opens
3. User enters credentials
4. Supabase Auth processes request
5. JWT token stored in browser
6. User state updated via Context
7. Protected routes become accessible
8. Real-time subscriptions activated
```

## 🎨 Design System

### Color Palette

```css
/* Primary Colors */
--primary: #f97316 (Orange)
--secondary: #dc2626 (Red)
--accent: #f59e0b (Amber)

/* Semantic Colors */
--success: #10b981 (Green)
--warning: #f59e0b (Amber)
--error: #ef4444 (Red)

/* Neutral Colors */
--text-primary: #1f2937
--text-secondary: #4b5563
--text-muted: #6b7280
--light-bg: #fafafa
--light-card: #f8fafc
```

### Typography

```css
/* Font Family */
font-family: 'Inter', system-ui, sans-serif;

/* Font Sizes */
text-xs: 0.75rem
text-sm: 0.875rem
text-base: 1rem
text-lg: 1.125rem
text-xl: 1.25rem
text-2xl: 1.5rem
text-3xl: 1.875rem
text-4xl: 2.25rem
text-5xl: 3rem
```

### Animation System

```css
/* Custom Animations */
.fade-in: Smooth entrance animation
.slide-in-left: Left-to-right slide
.slide-in-right: Right-to-left slide
.bounce-in: Elastic entrance
.pulse-glow: Breathing glow effect
.card-hover: Interactive card animation
.btn-animate: Button interaction feedback
```

## 🔐 Security Features

### Authentication Security
- **JWT Tokens**: Secure session management
- **Row Level Security**: Database-level access control
- **HTTPS Only**: Encrypted data transmission
- **CSRF Protection**: Cross-site request forgery prevention

### Data Protection
- **Encryption at Rest**: All sensitive data encrypted
- **Secure File Upload**: Virus scanning and validation
- **Privacy Controls**: User data anonymization options
- **GDPR Compliance**: European data protection standards

### Blockchain Security
- **Wallet Integration**: Secure private key management
- **Smart Contract Audits**: Verified contract code
- **Immutable Records**: Tamper-proof IP registration
- **Multi-signature Support**: Enhanced transaction security

## 🤖 MCP (Machine Callable Programs) Integration

### What is MCP?

Machine Callable Programs (MCP) is an advanced AI system that provides:
- **Real-time Market Analysis**: Live data processing and trend detection
- **Investment Insights**: AI-powered recommendations and risk assessment
- **Predictive Analytics**: Future market forecasting and opportunity identification
- **Natural Language Interface**: Chat-based interaction with AI assistant

### MCP Features in Seedora

1. **Market Trend Analysis**
   ```typescript
   // Example MCP query
   "Analyze trending projects in AI/ML category"
   
   // Response includes:
   - Top performing projects
   - Growth metrics
   - Investment recommendations
   - Risk assessments
   ```

2. **Investment Opportunity Detection**
   ```typescript
   // MCP identifies undervalued projects
   - High community engagement
   - Low current valuation
   - Strong technical metrics
   - Founder track record
   ```

3. **Risk Assessment**
   ```typescript
   // Portfolio risk analysis
   - Diversification recommendations
   - Market volatility assessment
   - Regulatory risk factors
   - Technical risk evaluation
   ```

4. **Predictive Modeling**
   ```typescript
   // Future market predictions
   - Category growth forecasts
   - Investment timing recommendations
   - Market sentiment analysis
   - Competitive landscape mapping
   ```

### Using the MCP Assistant

The MCP Assistant is accessible via a floating chat button in the bottom-right corner:

1. **Click the chat icon** to open the assistant
2. **Ask natural language questions** about investments, markets, or projects
3. **Receive AI-powered insights** with confidence scores and data sources
4. **Export insights** to your analytics dashboard for further analysis

## 📊 Analytics & Insights

### Dashboard Metrics

The analytics dashboard provides comprehensive insights:

1. **Investment Performance**
   - Total portfolio value
   - Return on investment (ROI)
   - Performance by category
   - Historical growth charts

2. **Market Intelligence**
   - Trending projects
   - Category performance
   - Investment opportunities
   - Risk assessments

3. **User Engagement**
   - Project views and likes
   - Community interaction
   - Social proof metrics
   - Reputation scoring

4. **Platform Statistics**
   - Active users
   - Total investments
   - Success rates
   - Growth metrics

### Nouns-Style Auction System

Inspired by Nouns DAO, we've implemented a unique auction system:

1. **Daily Auctions**: One featured project auctioned every 24 hours
2. **NFT Representation**: Each auction creates a unique Noun representing the project
3. **Governance Rights**: Auction winners receive platform governance tokens
4. **Community Engagement**: Transparent, fair auction process

## 🎥 Video Content System

### FilCDN Integration

Our video system leverages FilCDN for decentralized storage:

1. **Filecoin Storage**: Videos stored on the Filecoin network
2. **CDN Acceleration**: Global content delivery network for fast streaming
3. **Permanent Storage**: Immutable, censorship-resistant video hosting
4. **Cost Optimization**: Efficient storage deals and retrieval

### Video Features

- **HD Streaming**: Support for multiple quality levels
- **Interactive Player**: Custom controls with advanced features
- **Investment Integration**: Direct investment options within videos
- **Social Features**: Likes, comments, and sharing capabilities

## 🌐 Deployment

### Production Deployment

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify** (recommended)
   ```bash
   # Connect your repository to Netlify
   # Set environment variables in Netlify dashboard
   # Deploy automatically on git push
   ```

3. **Alternative Deployment Options**
   - Vercel
   - AWS Amplify
   - Firebase Hosting
   - Custom server deployment

### Environment Variables for Production

Ensure all environment variables are properly configured:
- Database connections
- API keys and secrets
- OAuth configurations
- CDN settings

## 🧪 Testing

### Running Tests

```bash
# Run unit tests
npm run test

# Run integration tests
npm run test:integration

# Run end-to-end tests
npm run test:e2e

# Generate coverage report
npm run test:coverage
```

### Testing Strategy

1. **Unit Tests**: Component-level testing with Jest and React Testing Library
2. **Integration Tests**: API and database integration testing
3. **E2E Tests**: Full user workflow testing with Playwright
4. **Performance Tests**: Load testing and optimization validation

## 🤝 Contributing

We welcome contributions from the community! Here's how to get started:

### Development Workflow

1. **Fork the repository**
2. **Create a feature branch**
   ```bash
   git checkout -b feature/amazing-feature
   ```
3. **Make your changes**
4. **Add tests** for new functionality
5. **Commit your changes**
   ```bash
   git commit -m 'Add amazing feature'
   ```
6. **Push to your branch**
   ```bash
   git push origin feature/amazing-feature
   ```
7. **Open a Pull Request**

### Code Standards

- **TypeScript**: Strict type checking enabled
- **ESLint**: Code linting and formatting
- **Prettier**: Consistent code formatting
- **Conventional Commits**: Standardized commit messages

### Areas for Contribution

- 🐛 Bug fixes and improvements
- ✨ New features and enhancements
- 📚 Documentation improvements
- 🎨 UI/UX enhancements
- 🔧 Performance optimizations
- 🧪 Test coverage expansion

## 📚 API Documentation

### Supabase API Endpoints

#### Authentication
```typescript
// Sign up
POST /auth/v1/signup
{
  "email": "user@example.com",
  "password": "securepassword"
}

// Sign in
POST /auth/v1/token?grant_type=password
{
  "email": "user@example.com",
  "password": "securepassword"
}
```

#### IP Registrations
```typescript
// Create IP registration
POST /rest/v1/ip_registrations
{
  "title": "My Amazing Project",
  "description": "Project description",
  "category": "AI/ML",
  "ipfs_hash": "QmHash..."
}

// Get user's IP registrations
GET /rest/v1/ip_registrations?user_id=eq.{user_id}
```

#### Marketplace
```typescript
// Get marketplace items
GET /rest/v1/marketplace_items?status=eq.active

// Like a project
POST /rest/v1/project_likes
{
  "marketplace_item_id": "uuid",
  "user_id": "uuid"
}
```

### GitHub API Integration

```typescript
// Get user repositories
GET https://api.github.com/user/repos
Headers: {
  "Authorization": "token {github_token}"
}

// Get repository details
GET https://api.github.com/repos/{owner}/{repo}
```

## 🔍 Troubleshooting

### Common Issues

1. **Environment Variables Not Loading**
   ```bash
   # Ensure .env file is in root directory
   # Restart development server after changes
   npm run dev
   ```

2. **Supabase Connection Issues**
   ```bash
   # Verify Supabase URL and keys
   # Check network connectivity
   # Ensure RLS policies are configured
   ```

3. **GitHub OAuth Errors**
   ```bash
   # Verify OAuth app configuration
   # Check callback URL settings
   # Ensure client ID and secret are correct
   ```

4. **Build Errors**
   ```bash
   # Clear node modules and reinstall
   rm -rf node_modules package-lock.json
   npm install
   ```

### Performance Optimization

1. **Bundle Size Optimization**
   - Code splitting with React.lazy()
   - Tree shaking for unused code
   - Image optimization and lazy loading

2. **Database Optimization**
   - Proper indexing on frequently queried columns
   - Query optimization with select statements
   - Real-time subscription management

3. **Caching Strategies**
   - Browser caching for static assets
   - API response caching
   - CDN utilization for global performance

## 📈 Roadmap

### Short-term Goals (Q1 2024)

- [ ] **Mobile App Development**: React Native mobile application
- [ ] **Advanced Analytics**: Enhanced MCP integration with more AI models
- [ ] **Social Features**: User following, project recommendations
- [ ] **Payment Integration**: Stripe integration for seamless transactions

### Medium-term Goals (Q2-Q3 2024)

- [ ] **Multi-chain Support**: Ethereum, Polygon, and other blockchain networks
- [ ] **DAO Governance**: Community-driven platform governance
- [ ] **API Marketplace**: Third-party integrations and extensions
- [ ] **Enterprise Features**: White-label solutions for organizations

### Long-term Vision (Q4 2024 and beyond)

- [ ] **Global Expansion**: Multi-language support and regional compliance
- [ ] **AI-Powered Matching**: Advanced investor-project matching algorithms
- [ ] **Regulatory Compliance**: SEC compliance for investment features
- [ ] **Ecosystem Expansion**: Partner integrations and marketplace growth

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

```
MIT License

Copyright (c) 2024 Seedora

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 🙏 Acknowledgments

### Technologies Used

- **React Team**: For the amazing React framework
- **Supabase Team**: For the excellent backend-as-a-service platform
- **Tailwind CSS**: For the utility-first CSS framework
- **Lucide**: For the beautiful icon library
- **Vite**: For the fast build tool and development server

### Inspiration

- **Nouns DAO**: For the innovative auction mechanism
- **GitHub**: For the developer-first approach
- **Y Combinator**: For the startup ecosystem inspiration
- **AngelList**: For the investment platform concepts

### Community

Special thanks to all contributors, beta testers, and community members who have helped shape Seedora into what it is today.

---

<div align="center">
  <p>Built with ❤️ by the Seedora team</p>
  <p>
    <a href="https://seedora.dev">Website</a> •
    <a href="https://docs.seedora.dev">Documentation</a> •
    <a href="https://github.com/seedora/seedora">GitHub</a> •
    <a href="https://twitter.com/seedora">Twitter</a>
  </p>
</div>