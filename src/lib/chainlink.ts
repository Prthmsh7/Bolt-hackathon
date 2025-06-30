// Chainlink Integration for Seedster Platform

// Chainlink contract addresses (Ethereum Sepolia testnet)
export const CHAINLINK_CONTRACTS = {
  // Price Feeds
  ETH_USD: '0x694AA1769357215DE4FAC081bf1f309aDC325306',
  BTC_USD: '0x1b44F3514812d835EB1BDB0acB33d3fA3351Ee43',
  USDC_USD: '0xA2F78ab2355fe2f984D808B5CeE7FD0A93D5270E',
  
  // Chainlink Functions
  FUNCTIONS_ROUTER: '0xb83E47C2bC239B3bf370bc41e1459A34b41238D0',
  DON_ID: '0x66756e2d657468657265756d2d7365706f6c69612d3100000000000000000000',
  
  // Chainlink Automation
  AUTOMATION_REGISTRY: '0xE16Df59B887e3Caa439E0b29B42bA2e7976FD8b2',
  
  // Chainlink CCIP
  CCIP_ROUTER: '0x0BF3dE8c5D3e8A2B34D2BEeB17ABfCeBaf363A59'
};

// ABI for Chainlink Price Feed
export const PRICE_FEED_ABI = [
  {
    "inputs": [],
    "name": "latestRoundData",
    "outputs": [
      { "internalType": "uint80", "name": "roundId", "type": "uint80" },
      { "internalType": "int256", "name": "answer", "type": "int256" },
      { "internalType": "uint256", "name": "startedAt", "type": "uint256" },
      { "internalType": "uint256", "name": "updatedAt", "type": "uint256" },
      { "internalType": "uint80", "name": "answeredInRound", "type": "uint80" }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];

// Chainlink Functions source code for AI scoring
export const AI_SCORING_SOURCE = `
const projectData = args[0];
const openaiKey = secrets.openaiKey;

const prompt = \`Analyze this startup project and return ONLY a JSON object with the following structure:
{
  "score": number (0-100),
  "reasoning": "brief explanation",
  "risk_level": "low|medium|high",
  "market_potential": number (0-100),
  "team_strength": number (0-100),
  "technology_innovation": number (0-100)
}

Project Data: \${projectData}\`;

const response = await Functions.makeHttpRequest({
  url: "https://api.openai.com/v1/chat/completions",
  method: "POST",
  headers: {
    "Authorization": \`Bearer \${openaiKey}\`,
    "Content-Type": "application/json"
  },
  data: {
    model: "gpt-4",
    messages: [
      {
        role: "system",
        content: "You are an expert startup investor. Analyze projects objectively and return only valid JSON."
      },
      {
        role: "user",
        content: prompt
      }
    ],
    max_tokens: 500,
    temperature: 0.3
  }
});

if (response.error) {
  throw Error("OpenAI API request failed");
}

const aiResponse = response.data.choices[0].message.content;
const cleanJson = aiResponse.replace(/\`\`\`json|\`\`\`/g, '').trim();

try {
  const parsed = JSON.parse(cleanJson);
  return Functions.encodeString(JSON.stringify(parsed));
} catch (e) {
  return Functions.encodeString(JSON.stringify({
    score: 50,
    reasoning: "AI analysis failed, using default score",
    risk_level: "medium",
    market_potential: 50,
    team_strength: 50,
    technology_innovation: 50
  }));
}
`;

export class ChainlinkService {
  constructor() {
    // Initialize without provider/signer for browser compatibility
  }

  // Get latest price from Chainlink Price Feed
  async getLatestPrice(priceFeedAddress: string): Promise<{
    price: string;
    decimals: number;
    updatedAt: Date;
  }> {
    try {
      // Simulate price feed for demo purposes
      const price = priceFeedAddress === CHAINLINK_CONTRACTS.ETH_USD 
        ? (3000 + Math.random() * 500).toString()
        : priceFeedAddress === CHAINLINK_CONTRACTS.BTC_USD
        ? (60000 + Math.random() * 5000).toString()
        : "1.00";
      
      return {
        price,
        decimals: 8,
        updatedAt: new Date()
      };
    } catch (error) {
      console.error('Error fetching price:', error);
      throw new Error('Failed to fetch price from Chainlink');
    }
  }

  // Get ETH/USD price
  async getETHPrice(): Promise<number> {
    const { price } = await this.getLatestPrice(CHAINLINK_CONTRACTS.ETH_USD);
    return parseFloat(price);
  }

  // Get BTC/USD price
  async getBTCPrice(): Promise<number> {
    const { price } = await this.getLatestPrice(CHAINLINK_CONTRACTS.BTC_USD);
    return parseFloat(price);
  }

  // Calculate dynamic project valuation
  async calculateDynamicValuation(
    baseValue: number,
    aiScore: number,
    category: string
  ): Promise<{
    valuation: number;
    ethPrice: number;
    valuationInETH: number;
    priceMultiplier: number;
  }> {
    try {
      const ethPrice = await this.getETHPrice();
      
      // Category multipliers
      const categoryMultipliers: { [key: string]: number } = {
        'AI/ML': 1.5,
        'Blockchain': 1.4,
        'Fintech': 1.3,
        'Healthtech': 1.2,
        'Edtech': 1.1,
        'IoT': 1.0,
        'Gaming': 0.9,
        'E-commerce': 0.8,
        'default': 1.0
      };

      const categoryMultiplier = categoryMultipliers[category] || categoryMultipliers.default;
      const scoreMultiplier = (aiScore / 100) * 2; // 0-2x multiplier based on AI score
      const marketMultiplier = ethPrice > 3000 ? 1.2 : 0.8; // Bull/bear market adjustment

      const priceMultiplier = categoryMultiplier * scoreMultiplier * marketMultiplier;
      const valuation = baseValue * priceMultiplier;
      const valuationInETH = valuation / ethPrice;

      return {
        valuation,
        ethPrice,
        valuationInETH,
        priceMultiplier
      };
    } catch (error) {
      console.error('Error calculating dynamic valuation:', error);
      // Fallback to static calculation
      return {
        valuation: baseValue,
        ethPrice: 3000, // Fallback ETH price
        valuationInETH: baseValue / 3000,
        priceMultiplier: 1.0
      };
    }
  }

  // Simulate Chainlink Functions call for AI scoring
  async getAIProjectScore(projectData: {
    title: string;
    description: string;
    category: string;
    founderName: string;
    teamSize: number;
    githubRepo?: string;
    demoLink?: string;
  }): Promise<{
    score: number;
    reasoning: string;
    riskLevel: 'low' | 'medium' | 'high';
    marketPotential: number;
    teamStrength: number;
    technologyInnovation: number;
  }> {
    try {
      // In a real implementation, this would call Chainlink Functions
      // For demo purposes, we'll simulate the AI scoring
      
      // Simulate AI analysis based on project characteristics
      let baseScore = 50;
      
      // Category scoring
      const categoryScores: { [key: string]: number } = {
        'AI/ML': 85,
        'Blockchain': 80,
        'Fintech': 75,
        'Healthtech': 70,
        'Edtech': 65,
        'IoT': 60,
        'Gaming': 55,
        'E-commerce': 50
      };
      
      baseScore = categoryScores[projectData.category] || 50;
      
      // Adjust based on team size
      if (projectData.teamSize > 3) baseScore += 10;
      if (projectData.teamSize > 5) baseScore += 5;
      
      // Adjust based on demo/github presence
      if (projectData.demoLink) baseScore += 15;
      if (projectData.githubRepo) baseScore += 10;
      
      // Add some randomness to simulate AI variability
      const randomAdjustment = (Math.random() - 0.5) * 20;
      const finalScore = Math.max(0, Math.min(100, baseScore + randomAdjustment));
      
      // Determine risk level
      let riskLevel: 'low' | 'medium' | 'high' = 'medium';
      if (finalScore > 80) riskLevel = 'low';
      if (finalScore < 40) riskLevel = 'high';
      
      // Component scores
      const marketPotential = Math.max(0, Math.min(100, finalScore + (Math.random() - 0.5) * 30));
      const teamStrength = Math.max(0, Math.min(100, finalScore + (Math.random() - 0.5) * 25));
      const technologyInnovation = Math.max(0, Math.min(100, finalScore + (Math.random() - 0.5) * 35));
      
      return {
        score: Math.round(finalScore),
        reasoning: `Project scored ${Math.round(finalScore)}/100 based on category (${projectData.category}), team composition, and technical indicators.`,
        riskLevel,
        marketPotential: Math.round(marketPotential),
        teamStrength: Math.round(teamStrength),
        technologyInnovation: Math.round(technologyInnovation)
      };
      
    } catch (error) {
      console.error('Error getting AI project score:', error);
      
      // Fallback scoring
      return {
        score: 50,
        reasoning: 'AI analysis temporarily unavailable, using baseline score',
        riskLevel: 'medium',
        marketPotential: 50,
        teamStrength: 50,
        technologyInnovation: 50
      };
    }
  }

  // Simulate milestone tracking for automation
  async checkMilestones(projectId: string, githubRepo?: string): Promise<{
    milestonesCompleted: number;
    totalMilestones: number;
    nextMilestone: string;
    shouldReleaseFunds: boolean;
    metrics: {
      githubCommits: number;
      demoUptime: number;
      userGrowth: number;
    };
  }> {
    try {
      // In a real implementation, this would integrate with:
      // - GitHub API for commit tracking
      // - Uptime monitoring for demo status
      // - Analytics APIs for user metrics
      
      // Simulate milestone checking
      const metrics = {
        githubCommits: Math.floor(Math.random() * 100) + 10,
        demoUptime: Math.random() * 100,
        userGrowth: Math.random() * 200
      };
      
      // Define milestone criteria
      const milestones = [
        { name: 'Initial Development', criteria: { commits: 10, uptime: 0, users: 0 } },
        { name: 'MVP Launch', criteria: { commits: 50, uptime: 80, users: 10 } },
        { name: 'User Traction', criteria: { commits: 100, uptime: 95, users: 100 } },
        { name: 'Market Validation', criteria: { commits: 200, uptime: 99, users: 500 } }
      ];
      
      let milestonesCompleted = 0;
      let nextMilestone = milestones[0].name;
      
      for (let i = 0; i < milestones.length; i++) {
        const milestone = milestones[i];
        const completed = 
          metrics.githubCommits >= milestone.criteria.commits &&
          metrics.demoUptime >= milestone.criteria.uptime &&
          metrics.userGrowth >= milestone.criteria.users;
          
        if (completed) {
          milestonesCompleted = i + 1;
        } else {
          nextMilestone = milestone.name;
          break;
        }
      }
      
      // Should release funds if a new milestone was just completed
      const shouldReleaseFunds = milestonesCompleted > 0 && Math.random() > 0.7;
      
      return {
        milestonesCompleted,
        totalMilestones: milestones.length,
        nextMilestone,
        shouldReleaseFunds,
        metrics
      };
      
    } catch (error) {
      console.error('Error checking milestones:', error);
      return {
        milestonesCompleted: 0,
        totalMilestones: 4,
        nextMilestone: 'Initial Development',
        shouldReleaseFunds: false,
        metrics: {
          githubCommits: 0,
          demoUptime: 0,
          userGrowth: 0
        }
      };
    }
  }

  // Simulate cross-chain investment flow
  async simulateCCIPTransfer(
    sourceChain: string,
    destinationChain: string,
    amount: number,
    projectId: string
  ): Promise<{
    txHash: string;
    estimatedTime: number;
    fees: number;
    status: 'pending' | 'confirmed' | 'failed';
  }> {
    try {
      // Simulate CCIP cross-chain transfer
      const chainFees: { [key: string]: number } = {
        'ethereum': 0.01,
        'polygon': 0.001,
        'arbitrum': 0.005,
        'optimism': 0.003,
        'avalanche': 0.002
      };
      
      const estimatedTimes: { [key: string]: number } = {
        'ethereum': 15,
        'polygon': 5,
        'arbitrum': 2,
        'optimism': 3,
        'avalanche': 3
      };
      
      const fees = (chainFees[sourceChain] || 0.01) + (chainFees[destinationChain] || 0.01);
      const estimatedTime = Math.max(
        estimatedTimes[sourceChain] || 15,
        estimatedTimes[destinationChain] || 15
      );
      
      // Generate mock transaction hash
      const txHash = `0x${Math.random().toString(16).substring(2, 66)}`;
      
      // Simulate success rate (95% success)
      const status = Math.random() > 0.05 ? 'confirmed' : 'failed';
      
      return {
        txHash,
        estimatedTime,
        fees,
        status
      };
      
    } catch (error) {
      console.error('Error simulating CCIP transfer:', error);
      return {
        txHash: '0x0000000000000000000000000000000000000000000000000000000000000000',
        estimatedTime: 15,
        fees: 0.01,
        status: 'failed'
      };
    }
  }
}

// Initialize Chainlink service
export const initializeChainlinkService = async (): Promise<ChainlinkService> => {
  try {
    return new ChainlinkService();
  } catch (error) {
    console.error('Error initializing Chainlink service:', error);
    return new ChainlinkService();
  }
};

// Export types
export interface ProjectScore {
  score: number;
  reasoning: string;
  riskLevel: 'low' | 'medium' | 'high';
  marketPotential: number;
  teamStrength: number;
  technologyInnovation: number;
}

export interface DynamicValuation {
  valuation: number;
  ethPrice: number;
  valuationInETH: number;
  priceMultiplier: number;
}

export interface MilestoneStatus {
  milestonesCompleted: number;
  totalMilestones: number;
  nextMilestone: string;
  shouldReleaseFunds: boolean;
  metrics: {
    githubCommits: number;
    demoUptime: number;
    userGrowth: number;
  };
}

export interface CCIPTransfer {
  txHash: string;
  estimatedTime: number;
  fees: number;
  status: 'pending' | 'confirmed' | 'failed';
}