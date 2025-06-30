import React, { useState, useEffect } from 'react';
import { 
  X, 
  DollarSign, 
  CreditCard, 
  CheckCircle, 
  AlertTriangle, 
  Loader2, 
  ArrowRight, 
  Shield, 
  Sparkles, 
  Star, 
  Award, 
  Zap,
  Info
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';

interface InvestmentModalProps {
  isOpen: boolean;
  onClose: () => void;
  project: any;
  onInvestmentSuccess?: (amount: number) => void;
}

const InvestmentModal: React.FC<InvestmentModalProps> = ({ 
  isOpen, 
  onClose, 
  project,
  onInvestmentSuccess
}) => {
  const { user } = useAuth();
  const [investmentAmount, setInvestmentAmount] = useState<string>('');
  const [selectedTier, setSelectedTier] = useState<string>('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<boolean>(false);
  const [transactionHash, setTransactionHash] = useState<string | null>(null);
  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState({
    cardNumber: '',
    cardName: '',
    expiry: '',
    cvc: ''
  });

  // Investment tiers
  const investmentTiers = [
    { 
      id: 'supporter', 
      name: 'Supporter', 
      min: 1000, 
      max: 9999, 
      benefits: ['Early access to updates', 'Exclusive newsletter', 'Name in supporters list'],
      color: 'text-primary',
      bgColor: 'bg-primary/10',
      icon: Star
    },
    { 
      id: 'backer', 
      name: 'Backer', 
      min: 10000, 
      max: 49999, 
      benefits: ['All Supporter benefits', 'Quarterly investor calls', 'Beta access to product'],
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      icon: Award
    },
    { 
      id: 'partner', 
      name: 'Partner', 
      min: 50000, 
      max: 99999, 
      benefits: ['All Backer benefits', 'Advisory board seat', 'Revenue sharing (1%)'],
      color: 'text-accent',
      bgColor: 'bg-accent/10',
      icon: Sparkles
    },
    { 
      id: 'executive', 
      name: 'Executive', 
      min: 100000, 
      max: 1000000, 
      benefits: ['All Partner benefits', 'Board seat', 'Revenue sharing (3%)', 'Co-branding opportunities'],
      color: 'text-secondary',
      bgColor: 'bg-secondary/10',
      icon: Zap
    }
  ];

  useEffect(() => {
    if (isOpen) {
      setInvestmentAmount('');
      setSelectedTier('');
      setError(null);
      setSuccess(false);
      setTransactionHash(null);
      setShowPaymentForm(false);
      setPaymentDetails({
        cardNumber: '',
        cardName: '',
        expiry: '',
        cvc: ''
      });
    }
  }, [isOpen]);

  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInvestmentAmount(value);
    
    // Auto-select tier based on amount
    const amount = parseFloat(value);
    if (!isNaN(amount)) {
      const tier = investmentTiers.find(t => amount >= t.min && amount <= t.max);
      setSelectedTier(tier ? tier.id : '');
    } else {
      setSelectedTier('');
    }
  };

  const handleTierSelect = (tierId: string) => {
    setSelectedTier(tierId);
    const tier = investmentTiers.find(t => t.id === tierId);
    if (tier) {
      setInvestmentAmount(tier.min.toString());
    }
  };

  const handleContinue = () => {
    const amount = parseFloat(investmentAmount);
    if (isNaN(amount) || amount <= 0) {
      setError('Please enter a valid investment amount');
      return;
    }

    if (amount < 1000) {
      setError('Minimum investment amount is $1,000');
      return;
    }

    if (!selectedTier) {
      setError('Please select an investment tier');
      return;
    }

    setError(null);
    setShowPaymentForm(true);
  };

  const handlePaymentDetailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPaymentDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const validatePaymentForm = () => {
    if (!paymentDetails.cardNumber.trim() || paymentDetails.cardNumber.length < 16) {
      setError('Please enter a valid card number');
      return false;
    }
    if (!paymentDetails.cardName.trim()) {
      setError('Please enter the cardholder name');
      return false;
    }
    if (!paymentDetails.expiry.trim() || !paymentDetails.expiry.includes('/')) {
      setError('Please enter a valid expiry date (MM/YY)');
      return false;
    }
    if (!paymentDetails.cvc.trim() || paymentDetails.cvc.length < 3) {
      setError('Please enter a valid CVC code');
      return false;
    }
    return true;
  };

  const processInvestment = async () => {
    if (!validatePaymentForm()) return;
    if (!user) {
      setError('You must be signed in to invest');
      return;
    }

    setIsProcessing(true);
    setError(null);

    try {
      // Generate a mock transaction hash
      const mockTxHash = `0x${Math.random().toString(36).substring(2, 15)}${Math.random().toString(36).substring(2, 15)}`;
      setTransactionHash(mockTxHash);

      // If we have Supabase configured, record the investment
      if (supabase) {
        const amount = parseFloat(investmentAmount);
        
        // Record the purchase in the database
        const { error: purchaseError } = await supabase
          .from('project_purchases')
          .insert({
            buyer_id: user.id,
            marketplace_item_id: project.id,
            purchase_price: amount,
            transaction_hash: mockTxHash,
            status: 'completed'
          });

        if (purchaseError) {
          console.error('Error recording purchase:', purchaseError);
          throw new Error('Failed to record investment');
        }

        // Update the marketplace item's purchase count
        const { error: updateError } = await supabase
          .from('marketplace_items')
          .update({ 
            purchase_count: (project.purchase_count || 0) + 1,
            updated_at: new Date().toISOString()
          })
          .eq('id', project.id);

        if (updateError) {
          console.error('Error updating marketplace item:', updateError);
        }
      }

      // Simulate processing delay
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      setSuccess(true);
      
      // Call the success callback
      if (onInvestmentSuccess) {
        onInvestmentSuccess(parseFloat(investmentAmount));
      }
      
      // Close the modal after a delay
      setTimeout(() => {
        onClose();
      }, 5000);
      
    } catch (error) {
      console.error('Investment error:', error);
      setError(error instanceof Error ? error.message : 'An error occurred during the investment process');
    } finally {
      setIsProcessing(false);
    }
  };

  if (!isOpen) return null;

  const selectedTierData = investmentTiers.find(t => t.id === selectedTier);

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="neo-card bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-light-border">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-secondary rounded-xl flex items-center justify-center">
              <DollarSign size={24} className="text-white" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-text-primary">Invest in Project</h2>
              <p className="text-text-secondary">{project.title}</p>
            </div>
          </div>
          <button 
            onClick={onClose}
            disabled={isProcessing}
            className="p-2 hover:bg-light-hover rounded-lg transition-colors duration-300 disabled:opacity-50"
          >
            <X size={24} className="text-text-secondary" />
          </button>
        </div>

        <div className="p-6">
          {success ? (
            <div className="text-center py-8">
              <div className="w-20 h-20 bg-success/20 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle size={40} className="text-success" />
              </div>
              <h3 className="text-2xl font-bold text-text-primary mb-4">Investment Successful!</h3>
              <p className="text-text-secondary mb-6">
                Your investment of {formatCurrency(parseFloat(investmentAmount))} has been processed successfully.
              </p>
              {transactionHash && (
                <div className="bg-light-card p-4 rounded-xl mb-6">
                  <p className="text-sm text-text-muted mb-2">Transaction Hash:</p>
                  <p className="font-mono text-sm text-text-primary break-all">{transactionHash}</p>
                </div>
              )}
              <p className="text-text-secondary">
                You will receive a confirmation email with further details shortly.
              </p>
              <button
                onClick={onClose}
                className="mt-6 px-6 py-3 bg-primary text-white rounded-xl font-medium hover:scale-105 transition-all duration-300"
              >
                Close
              </button>
            </div>
          ) : showPaymentForm ? (
            <div className="space-y-6">
              <div className="bg-light-card p-6 rounded-xl border border-light-border">
                <h3 className="text-xl font-bold text-text-primary mb-4">Payment Details</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Card Number
                    </label>
                    <input
                      type="text"
                      name="cardNumber"
                      value={paymentDetails.cardNumber}
                      onChange={handlePaymentDetailChange}
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-4 py-3 border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary"
                      maxLength={16}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Cardholder Name
                    </label>
                    <input
                      type="text"
                      name="cardName"
                      value={paymentDetails.cardName}
                      onChange={handlePaymentDetailChange}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        Expiry Date
                      </label>
                      <input
                        type="text"
                        name="expiry"
                        value={paymentDetails.expiry}
                        onChange={handlePaymentDetailChange}
                        placeholder="MM/YY"
                        className="w-full px-4 py-3 border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary"
                        maxLength={5}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-text-secondary mb-2">
                        CVC
                      </label>
                      <input
                        type="text"
                        name="cvc"
                        value={paymentDetails.cvc}
                        onChange={handlePaymentDetailChange}
                        placeholder="123"
                        className="w-full px-4 py-3 border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary"
                        maxLength={4}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-light-card p-6 rounded-xl border border-light-border">
                <h3 className="text-xl font-bold text-text-primary mb-4">Investment Summary</h3>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Project:</span>
                    <span className="font-semibold text-text-primary">{project.title}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Investment Amount:</span>
                    <span className="font-semibold text-primary">{formatCurrency(parseFloat(investmentAmount))}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Investment Tier:</span>
                    <span className="font-semibold text-secondary">{selectedTierData?.name || 'Custom'}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-text-secondary">Processing Fee:</span>
                    <span className="font-semibold text-text-primary">{formatCurrency(parseFloat(investmentAmount) * 0.02)}</span>
                  </div>
                  <div className="border-t border-light-border pt-3 flex justify-between">
                    <span className="font-bold text-text-primary">Total:</span>
                    <span className="font-bold text-primary">{formatCurrency(parseFloat(investmentAmount) * 1.02)}</span>
                  </div>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-error/10 border border-error/20 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle size={20} className="text-error" />
                    <p className="text-error font-medium">{error}</p>
                  </div>
                </div>
              )}

              <div className="flex space-x-4">
                <button
                  onClick={() => setShowPaymentForm(false)}
                  disabled={isProcessing}
                  className="flex-1 py-3 bg-white border border-light-border hover:bg-light-hover rounded-xl font-medium transition-all duration-300 disabled:opacity-50"
                >
                  Back
                </button>
                <button
                  onClick={processInvestment}
                  disabled={isProcessing}
                  className="flex-1 py-3 bg-secondary text-white rounded-xl font-medium hover:scale-105 transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
                >
                  {isProcessing ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>Processing...</span>
                    </>
                  ) : (
                    <>
                      <CreditCard size={20} />
                      <span>Complete Investment</span>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-4 p-4 bg-light-card rounded-xl">
                <div className="flex items-center space-x-2 text-text-muted text-sm">
                  <Info size={16} />
                  <p>This is a demo payment form. No real transactions will be processed.</p>
                </div>
              </div>
            </div>
          ) : (
            <div className="space-y-6">
              {/* Project Info */}
              <div className="bg-light-card p-6 rounded-xl border border-light-border">
                <div className="flex items-center space-x-4 mb-4">
                  <img 
                    src={project.thumbnail_url}
                    alt={project.title}
                    className="w-16 h-16 object-cover rounded-xl"
                  />
                  <div>
                    <h3 className="font-bold text-text-primary">{project.title}</h3>
                    <p className="text-text-secondary text-sm">{project.founder_name} • {project.category}</p>
                  </div>
                  {project.status === 'pending' && (
                    <div className="ml-auto bg-warning/20 text-warning px-3 py-1 rounded-full text-xs font-medium flex items-center space-x-1">
                      <Clock size={12} />
                      <span>PENDING</span>
                    </div>
                  )}
                </div>
                <p className="text-text-secondary text-sm mb-4 line-clamp-2">{project.description}</p>
                <div className="flex justify-between text-sm">
                  <span className="text-text-secondary">Valuation:</span>
                  <span className="font-semibold text-text-primary">{formatCurrency(project.price)}</span>
                </div>
              </div>

              {/* Investment Amount */}
              <div className="bg-light-card p-6 rounded-xl border border-light-border">
                <h3 className="text-xl font-bold text-text-primary mb-4">Investment Amount</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-text-secondary mb-2">
                      Enter Amount (USD)
                    </label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <DollarSign size={20} className="text-text-muted" />
                      </div>
                      <input
                        type="number"
                        value={investmentAmount}
                        onChange={handleAmountChange}
                        placeholder="10000"
                        min="1000"
                        className="w-full pl-10 pr-4 py-3 border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary text-lg font-mono"
                      />
                    </div>
                    <p className="text-xs text-text-muted mt-2">Minimum investment: $1,000</p>
                  </div>
                </div>
              </div>

              {/* Investment Tiers */}
              <div className="bg-light-card p-6 rounded-xl border border-light-border">
                <h3 className="text-xl font-bold text-text-primary mb-4">Investment Tiers</h3>
                <div className="space-y-4">
                  {investmentTiers.map((tier) => {
                    const IconComponent = tier.icon;
                    return (
                      <div 
                        key={tier.id}
                        onClick={() => handleTierSelect(tier.id)}
                        className={`p-4 border rounded-xl cursor-pointer transition-all duration-300 ${
                          selectedTier === tier.id 
                            ? `${tier.bgColor} border-primary` 
                            : 'border-light-border hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-2">
                          <div className="flex items-center space-x-2">
                            <IconComponent size={20} className={tier.color} />
                            <span className={`font-semibold ${tier.color}`}>{tier.name}</span>
                          </div>
                          <span className="text-text-muted text-sm">
                            {formatCurrency(tier.min)} - {formatCurrency(tier.max)}
                          </span>
                        </div>
                        <div className="text-sm text-text-secondary">
                          <ul className="space-y-1">
                            {tier.benefits.map((benefit, index) => (
                              <li key={index} className="flex items-center space-x-2">
                                <CheckCircle size={12} className="text-success" />
                                <span>{benefit}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="p-4 bg-error/10 border border-error/20 rounded-xl">
                  <div className="flex items-center space-x-2">
                    <AlertTriangle size={20} className="text-error" />
                    <p className="text-error font-medium">{error}</p>
                  </div>
                </div>
              )}

              {/* Continue Button */}
              <button
                onClick={handleContinue}
                disabled={!investmentAmount || parseFloat(investmentAmount) < 1000 || !selectedTier}
                className="w-full py-3 bg-secondary text-white rounded-xl font-medium hover:scale-105 transition-all duration-300 disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                <ArrowRight size={20} />
                <span>Continue to Payment</span>
              </button>

              {/* Disclaimer */}
              <div className="p-4 bg-light-card rounded-xl">
                <div className="flex items-center space-x-2 text-text-muted text-sm">
                  <Shield size={16} />
                  <p>Your investment is protected by our secure platform and blockchain verification.</p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

// Helper function to format currency
const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

export default InvestmentModal;