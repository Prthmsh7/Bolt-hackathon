import React, { useState, useEffect } from 'react';
import { 
  Layers, 
  Building, 
  Leaf, 
  Gamepad, 
  FileText, 
  DollarSign, 
  BarChart3, 
  RefreshCw, 
  CheckCircle, 
  AlertTriangle, 
  Clock, 
  Zap, 
  ArrowRight, 
  Plus, 
  Users, 
  Activity, 
  Globe, 
  Send, 
  Target, 
  Landmark, 
  CreditCard,
  Sparkles,
  Flame,
  Brain
} from 'lucide-react';
import { 
  TokenizationService, 
  initializeTokenizationService, 
  RealEstateToken, 
  CarbonCredit, 
  GameAsset, 
  InvoiceFactoring, 
  Commodity 
} from '../lib/tokenization';

interface TokenizationDashboardProps {
  onBack: () => void;
}

const TokenizationDashboard: React.FC<TokenizationDashboardProps> = ({ onBack }) => {
  const [tokenizationService, setTokenizationService] = useState<TokenizationService | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'overview' | 'real-estate' | 'carbon-credits' | 'game-assets' | 'invoice-factoring' | 'commodities'>('overview');
  
  // Tokenization data states
  const [realEstateTokens, setRealEstateTokens] = useState<RealEstateToken[]>([]);
  const [carbonCredits, setCarbonCredits] = useState<CarbonCredit[]>([]);
  const [gameAssets, setGameAssets] = useState<GameAsset[]>([]);
  const [invoiceFactoring, setInvoiceFactoring] = useState<InvoiceFactoring[]>([]);
  const [commodities, setCommodities] = useState<Commodity[]>([]);
  
  // Form states
  const [propertyForm, setPropertyForm] = useState({
    propertyId: '',
    value: '',
    location: '',
    totalShares: ''
  });
  const [propertyLoading, setPropertyLoading] = useState(false);
  const [propertyResult, setPropertyResult] = useState<any>(null);
  
  const [carbonForm, setCarbonForm] = useState({
    projectId: '',
    amount: '',
    verifier: 'Verra'
  });
  const [carbonLoading, setCarbonLoading] = useState(false);
  const [carbonResult, setCarbonResult] = useState<any>(null);
  
  const [gameAssetForm, setGameAssetForm] = useState({
    assetName: '',
    game: '',
    assetType: '',
    rarity: 'Rare',
    totalUnits: ''
  });
  const [gameAssetLoading, setGameAssetLoading] = useState(false);
  const [gameAssetResult, setGameAssetResult] = useState<any>(null);

  useEffect(() => {
    initializeServices();
  }, []);

  const initializeServices = async () => {
    try {
      setIsLoading(true);
      const service = await initializeTokenizationService();
      setTokenizationService(service);
      
      // Load initial data
      await loadTokenizationData(service);
      
    } catch (error) {
      console.error('Error initializing Tokenization services:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const loadTokenizationData = async (service: TokenizationService) => {
    try {
      const [realEstate, carbon, game, invoice, commodity] = await Promise.all([
        service.getRealEstateTokens(),
        service.getCarbonCredits(),
        service.getGameAssets(),
        service.getInvoiceFactoring(),
        service.getCommodities()
      ]);
      
      setRealEstateTokens(realEstate);
      setCarbonCredits(carbon);
      setGameAssets(game);
      setInvoiceFactoring(invoice);
      setCommodities(commodity);
      
    } catch (error) {
      console.error('Error loading tokenization data:', error);
    }
  };

  const refreshData = async () => {
    if (!tokenizationService) return;
    await loadTokenizationData(tokenizationService);
  };

  const handleTokenizeProperty = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenizationService || !propertyForm.propertyId || !propertyForm.value || !propertyForm.location || !propertyForm.totalShares) return;
    
    try {
      setPropertyLoading(true);
      setPropertyResult(null);
      
      const result = await tokenizationService.simulateTokenizeProperty(
        propertyForm.propertyId,
        parseInt(propertyForm.value),
        propertyForm.location,
        parseInt(propertyForm.totalShares)
      );
      
      setPropertyResult(result);
      
      if (result.status === 'confirmed') {
        // Reset form after successful tokenization
        setPropertyForm({
          propertyId: '',
          value: '',
          location: '',
          totalShares: ''
        });
      }
    } catch (error) {
      console.error('Error tokenizing property:', error);
    } finally {
      setPropertyLoading(false);
    }
  };

  const handleMintCarbonCredits = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenizationService || !carbonForm.projectId || !carbonForm.amount) return;
    
    try {
      setCarbonLoading(true);
      setCarbonResult(null);
      
      const result = await tokenizationService.simulateMintCarbonCredits(
        carbonForm.projectId,
        parseInt(carbonForm.amount),
        carbonForm.verifier
      );
      
      setCarbonResult(result);
      
      if (result.status === 'confirmed') {
        // Reset form after successful minting
        setCarbonForm({
          projectId: '',
          amount: '',
          verifier: 'Verra'
        });
      }
    } catch (error) {
      console.error('Error minting carbon credits:', error);
    } finally {
      setCarbonLoading(false);
    }
  };

  const handleTokenizeGameAsset = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tokenizationService || !gameAssetForm.assetName || !gameAssetForm.game || !gameAssetForm.assetType || !gameAssetForm.totalUnits) return;
    
    try {
      setGameAssetLoading(true);
      setGameAssetResult(null);
      
      const result = await tokenizationService.simulateTokenizeGameAsset(
        gameAssetForm.assetName,
        gameAssetForm.game,
        gameAssetForm.assetType,
        gameAssetForm.rarity,
        parseInt(gameAssetForm.totalUnits)
      );
      
      setGameAssetResult(result);
      
      if (result.status === 'confirmed') {
        // Reset form after successful tokenization
        setGameAssetForm({
          assetName: '',
          game: '',
          assetType: '',
          rarity: 'Rare',
          totalUnits: ''
        });
      }
    } catch (error) {
      console.error('Error tokenizing game asset:', error);
    } finally {
      setGameAssetLoading(false);
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const formatPercentage = (value: number) => {
    return `${value.toFixed(2)}%`;
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-light-bg flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center mx-auto mb-4 animate-pulse">
            <Layers size={32} className="text-white" />
          </div>
          <h2 className="text-2xl font-bold text-text-primary mb-2">Initializing Tokenization Services</h2>
          <p className="text-text-secondary">Connecting to tokenization platform...</p>
        </div>
      </div>
    );
  }

  const renderOverview = () => (
    <div className="space-y-8">
      {/* Hero Section */}
      <div className="bg-accent rounded-3xl p-8 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/20 rounded-full -translate-y-32 translate-x-32"></div>
        
        <div className="relative z-10">
          <div className="flex items-center space-x-4 mb-6">
            <div className="w-16 h-16 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
              <Layers size={32} className="text-white" />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-text-primary">Real-World Asset Tokenization</h1>
              <p className="text-text-secondary text-lg">Bringing real assets on-chain</p>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Building size={20} className="text-primary" />
                <span className="font-semibold text-text-primary">Real Estate</span>
              </div>
              <div className="text-2xl font-bold text-primary">
                {realEstateTokens.length}
              </div>
              <div className="text-sm text-text-secondary">Properties</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Leaf size={20} className="text-success" />
                <span className="font-semibold text-text-primary">Carbon</span>
              </div>
              <div className="text-2xl font-bold text-success">
                {carbonCredits.length}
              </div>
              <div className="text-sm text-text-secondary">Projects</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <Gamepad size={20} className="text-secondary" />
                <span className="font-semibold text-text-primary">Game Assets</span>
              </div>
              <div className="text-2xl font-bold text-secondary">
                {gameAssets.length}
              </div>
              <div className="text-sm text-text-secondary">Assets</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <FileText size={20} className="text-error" />
                <span className="font-semibold text-text-primary">Invoices</span>
              </div>
              <div className="text-2xl font-bold text-error">
                {invoiceFactoring.length}
              </div>
              <div className="text-sm text-text-secondary">Invoices</div>
            </div>
            
            <div className="bg-white/80 backdrop-blur-sm rounded-xl p-4 border border-white/20">
              <div className="flex items-center space-x-3 mb-2">
                <DollarSign size={20} className="text-warning" />
                <span className="font-semibold text-text-primary">Commodities</span>
              </div>
              <div className="text-2xl font-bold text-warning">
                {commodities.length}
              </div>
              <div className="text-sm text-text-secondary">Assets</div>
            </div>
          </div>
        </div>
      </div>

      {/* Real Estate Tokenization */}
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
              <Building size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Real Estate Tokenization</h2>
              <p className="text-text-secondary">Fractional ownership of properties</p>
            </div>
          </div>
          <button 
            onClick={() => setActiveTab('real-estate')}
            className="flex items-center space-x-2 text-primary font-medium"
          >
            <span>View Details</span>
            <ArrowRight size={16} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {realEstateTokens.slice(0, 2).map((token, index) => (
            <div key={index} className="bg-light-card rounded-xl p-6 border border-light-border hover:shadow-lg transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
                  <Building size={24} className="text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-text-primary">{token.location}</h3>
                  <p className="text-text-secondary text-sm">{token.assetType}</p>
                </div>
                <div className="ml-auto text-right">
                  <div className="font-bold text-text-primary">{formatCurrency(token.value)}</div>
                  <div className="text-xs text-text-muted">Total Value</div>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Price Per Share:</span>
                  <span className="font-medium text-text-primary">{formatCurrency(token.pricePerShare)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Available Shares:</span>
                  <span className="font-medium text-text-primary">{token.availableShares} / {token.totalShares}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Annual Yield:</span>
                  <span className="font-medium text-success">{formatPercentage(token.annualYield)}</span>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button className="flex-1 py-2 bg-primary text-white rounded-lg font-medium hover:scale-105 transition-all duration-300">
                  Buy Shares
                </button>
                <button className="flex-1 py-2 bg-white border border-light-border text-text-primary rounded-lg font-medium hover:bg-light-hover transition-all duration-300">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Carbon Credits */}
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-success rounded-xl flex items-center justify-center">
              <Leaf size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Carbon Credits</h2>
              <p className="text-text-secondary">Verified carbon offset projects</p>
            </div>
          </div>
          <button 
            onClick={() => setActiveTab('carbon-credits')}
            className="flex items-center space-x-2 text-success font-medium"
          >
            <span>View Details</span>
            <ArrowRight size={16} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {carbonCredits.slice(0, 2).map((credit, index) => (
            <div key={index} className="bg-light-card rounded-xl p-6 border border-light-border hover:shadow-lg transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-success/10 rounded-xl flex items-center justify-center">
                  <Leaf size={24} className="text-success" />
                </div>
                <div>
                  <h3 className="font-bold text-text-primary">{credit.location}</h3>
                  <p className="text-text-secondary text-sm">{credit.creditType}</p>
                </div>
                <div className="ml-auto text-right">
                  <div className="font-bold text-text-primary">{formatCurrency(credit.pricePerTon * credit.amount)}</div>
                  <div className="text-xs text-text-muted">Total Value</div>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Price Per Ton:</span>
                  <span className="font-medium text-text-primary">${credit.pricePerTon.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Available Credits:</span>
                  <span className="font-medium text-text-primary">{credit.availableCredits.toLocaleString()} tons</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Verifier:</span>
                  <span className="font-medium text-text-primary">{credit.verifier}</span>
                </div>
              </div>
              
              <div className="flex space-x-3">
                <button className="flex-1 py-2 bg-success text-white rounded-lg font-medium hover:scale-105 transition-all duration-300">
                  Buy Credits
                </button>
                <button className="flex-1 py-2 bg-white border border-light-border text-text-primary rounded-lg font-medium hover:bg-light-hover transition-all duration-300">
                  View Details
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Game Assets */}
      <div className="bg-white rounded-2xl border border-light-border p-8 shadow-sm">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
              <Gamepad size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Game Assets</h2>
              <p className="text-text-secondary">In-game items and virtual real estate</p>
            </div>
          </div>
          <button 
            onClick={() => setActiveTab('game-assets')}
            className="flex items-center space-x-2 text-secondary font-medium"
          >
            <span>View Details</span>
            <ArrowRight size={16} />
          </button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {gameAssets.slice(0, 3).map((asset, index) => (
            <div key={index} className="bg-light-card rounded-xl p-6 border border-light-border hover:shadow-lg transition-all duration-300">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
                  <Gamepad size={24} className="text-secondary" />
                </div>
                <div>
                  <h3 className="font-bold text-text-primary">{asset.assetName}</h3>
                  <p className="text-text-secondary text-sm">{asset.game}</p>
                </div>
              </div>
              
              <div className="space-y-3 mb-4">
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Type:</span>
                  <span className="font-medium text-text-primary">{asset.assetType}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Rarity:</span>
                  <span className={`font-medium ${
                    asset.rarity === 'Legendary' ? 'text-secondary' :
                    asset.rarity === 'Epic' ? 'text-primary' :
                    asset.rarity === 'Rare' ? 'text-success' :
                    'text-text-primary'
                  }`}>{asset.rarity}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Price:</span>
                  <span className="font-medium text-text-primary">{asset.price} ETH</span>
                </div>
              </div>
              
              <button className="w-full py-2 bg-secondary text-white rounded-lg font-medium hover:scale-105 transition-all duration-300">
                Purchase Asset
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  const renderRealEstate = () => (
    <div className="text-center py-16 bg-white rounded-2xl border border-light-border">
      <Building size={64} className="mx-auto mb-6 text-text-muted opacity-50" />
      <h3 className="text-2xl font-bold text-text-primary mb-3">Real Estate Tokenization Coming Soon</h3>
      <p className="text-text-secondary mb-8 max-w-md mx-auto">
        We're working on bringing a detailed real estate tokenization interface to the platform. Check back soon!
      </p>
    </div>
  );

  const renderCarbonCredits = () => (
    <div className="text-center py-16 bg-white rounded-2xl border border-light-border">
      <Leaf size={64} className="mx-auto mb-6 text-text-muted opacity-50" />
      <h3 className="text-2xl font-bold text-text-primary mb-3">Carbon Credits Interface Coming Soon</h3>
      <p className="text-text-secondary mb-8 max-w-md mx-auto">
        We're working on bringing a detailed carbon credits interface to the platform. Check back soon!
      </p>
    </div>
  );

  const renderGameAssets = () => (
    <div className="text-center py-16 bg-white rounded-2xl border border-light-border">
      <Gamepad size={64} className="mx-auto mb-6 text-text-muted opacity-50" />
      <h3 className="text-2xl font-bold text-text-primary mb-3">Game Assets Interface Coming Soon</h3>
      <p className="text-text-secondary mb-8 max-w-md mx-auto">
        We're working on bringing a detailed game assets interface to the platform. Check back soon!
      </p>
    </div>
  );

  return (
    <div className="min-h-screen bg-light-bg">
      {/* Header */}
      <header className="bg-white/95 backdrop-blur-md border-b border-light-border sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={onBack}
                className="p-3 bg-white border border-light-border rounded-xl hover:bg-light-hover transition-all duration-300 shadow-sm hover:shadow-md"
              >
                ←
              </button>
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-primary rounded-2xl flex items-center justify-center shadow-lg">
                  <Layers size={24} className="text-white" />
                </div>
                <div>
                  <h1 className="text-3xl font-bold text-text-primary">Tokenization Platform</h1>
                  <p className="text-text-secondary text-lg">Real-world asset tokenization</p>
                </div>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2 px-4 py-2 bg-success/10 rounded-xl text-success">
                <CheckCircle size={16} />
                <span className="text-sm font-medium">Platform Connected</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Tab Navigation */}
      <div className="bg-white border-b border-light-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex space-x-1">
            {[
              { id: 'overview', label: 'Overview', icon: BarChart3 },
              { id: 'real-estate', label: 'Real Estate', icon: Building },
              { id: 'carbon-credits', label: 'Carbon Credits', icon: Leaf },
              { id: 'game-assets', label: 'Game Assets', icon: Gamepad },
              { id: 'invoice-factoring', label: 'Invoice Factoring', icon: FileText },
              { id: 'commodities', label: 'Commodities', icon: DollarSign }
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`flex items-center space-x-2 px-6 py-4 font-medium text-base transition-colors duration-300 ${
                  activeTab === tab.id 
                    ? 'text-primary border-b-2 border-primary' 
                    : 'text-text-secondary hover:text-text-primary'
                }`}
              >
                <tab.icon size={18} />
                <span>{tab.label}</span>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'overview' && renderOverview()}
        {activeTab === 'real-estate' && renderRealEstate()}
        {activeTab === 'carbon-credits' && renderCarbonCredits()}
        {activeTab === 'game-assets' && renderGameAssets()}
        {activeTab === 'invoice-factoring' && (
          <div className="text-center py-16 bg-white rounded-2xl border border-light-border">
            <FileText size={64} className="mx-auto mb-6 text-text-muted opacity-50" />
            <h3 className="text-2xl font-bold text-text-primary mb-3">Invoice Factoring Coming Soon</h3>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              We're working on bringing invoice factoring functionality to the platform. Check back soon!
            </p>
          </div>
        )}
        {activeTab === 'commodities' && (
          <div className="text-center py-16 bg-white rounded-2xl border border-light-border">
            <DollarSign size={64} className="mx-auto mb-6 text-text-muted opacity-50" />
            <h3 className="text-2xl font-bold text-text-primary mb-3">Commodities Tokenization Coming Soon</h3>
            <p className="text-text-secondary mb-8 max-w-md mx-auto">
              We're working on bringing commodities tokenization to the platform. Check back soon!
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default TokenizationDashboard;