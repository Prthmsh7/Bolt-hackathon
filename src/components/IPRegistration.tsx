import React, { useState } from 'react';
import { 
  Upload, 
  FileText, 
  User, 
  Building, 
  Tag, 
  Loader2, 
  CheckCircle, 
  AlertCircle,
  ExternalLink,
  Shield,
  Globe,
  Video,
  Link,
  Users,
  DollarSign,
  Target,
  Lightbulb,
  Code,
  Presentation,
  Github
} from 'lucide-react';
import { PinataService } from '../services/pinata.service';
import { supabase } from '../lib/supabase';
import { useAuth } from '../contexts/AuthContext';
import { PostgrestError } from '@supabase/supabase-js';

interface IPRegistrationProps {
  walletAddress: string;
  onSuccess?: () => void;
  selectedRepos?: any[];
}

interface IPFormData {
  title: string;
  description: string;
  founderName: string;
  companyName: string;
  category: string;
  projectType: string;
  businessModel: string;
  projectSummary: string;
  developers: string;
  demoLink: string;
  presentationVideo: string;
  githubRepo: string;
  file?: File;
}

export function IPRegistration({ walletAddress, onSuccess, selectedRepos = [] }: IPRegistrationProps) {
  const { user } = useAuth();
  const [formData, setFormData] = useState<IPFormData>({
    title: '',
    description: '',
    founderName: '',
    companyName: '',
    category: '',
    projectType: '',
    businessModel: '',
    projectSummary: '',
    developers: '',
    demoLink: '',
    presentationVideo: '',
    githubRepo: selectedRepos.length > 0 ? selectedRepos[0].full_name : '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<{
    ipfsHash: string;
    ipfsUrl: string;
  } | null>(null);

  const pinataService = new PinataService();

  const categories = [
    'Fintech',
    'Healthtech',
    'Edtech',
    'E-commerce',
    'SaaS',
    'AI/ML',
    'Blockchain',
    'IoT',
    'Cybersecurity',
    'Gaming',
    'Social Media',
    'Productivity',
    'Other'
  ];

  const projectTypes = [
    'Web Application',
    'Mobile Application',
    'Desktop Software',
    'API/Backend Service',
    'Machine Learning Model',
    'Blockchain Protocol',
    'Hardware Device',
    'Algorithm/Method',
    'Research/Study',
    'Other'
  ];

  const businessModels = [
    'SaaS (Software as a Service)',
    'Freemium',
    'Subscription',
    'One-time Purchase',
    'Marketplace Commission',
    'Advertising Revenue',
    'Transaction Fees',
    'Licensing',
    'Consulting Services',
    'Other'
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const validateForm = () => {
    const requiredFields = ['title', 'description', 'founderName', 'category', 'projectType', 'businessModel', 'projectSummary', 'developers'];
    for (const field of requiredFields) {
      if (!formData[field as keyof IPFormData]) {
        setError(`${field.charAt(0).toUpperCase() + field.slice(1)} is required`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!user) {
      setError('You must be signed in to register IP');
      return;
    }

    if (!validateForm()) {
      return;
    }

    try {
      setLoading(true);
      setError(null);
      setSuccess(null);

      console.log('Starting IP registration process...');
      console.log('User ID:', user.id);
      console.log('Form data:', formData);

      // Upload supporting document if provided
      let documentHash = '';
      if (formData.file) {
        console.log('Uploading file to IPFS...');
        documentHash = await pinataService.uploadFile(formData.file, {
          type: 'ip_document',
          category: formData.category,
          founderName: formData.founderName,
          companyName: formData.companyName,
          walletAddress,
          userId: user.id,
        });
        console.log('File uploaded, hash:', documentHash);
      }

      // Upload IP metadata
      console.log('Uploading metadata to IPFS...');
      const metadata = {
        title: formData.title,
        description: formData.description,
        founderName: formData.founderName,
        companyName: formData.companyName,
        category: formData.category,
        projectType: formData.projectType,
        businessModel: formData.businessModel,
        projectSummary: formData.projectSummary,
        developers: formData.developers,
        demoLink: formData.demoLink,
        presentationVideo: formData.presentationVideo,
        githubRepo: formData.githubRepo,
        documentHash,
        walletAddress,
        userId: user.id,
        registeredAt: new Date().toISOString(),
        platform: 'start.dev',
      };

      const metadataHash = await pinataService.uploadJSON(metadata);
      const ipfsUrl = await pinataService.getIPFSUrl(metadataHash);
      
      console.log('Metadata uploaded, hash:', metadataHash);
      console.log('IPFS URL:', ipfsUrl);

      // Prepare data for database insertion with explicit column mapping
      const dbData = {
        user_id: user.id,
        title: formData.title.trim(),
        description: formData.description.trim() || null,
        founder_name: formData.founderName.trim(),
        company_name: formData.companyName.trim() || null,
        category: formData.category,
        wallet_address: walletAddress || null,
        ipfs_hash: metadataHash,
        ipfs_url: ipfsUrl,
        document_hash: documentHash || null,
        project_type: formData.projectType,
        business_model: formData.businessModel,
        project_summary: formData.projectSummary.trim(),
        developers: formData.developers.trim(),
        demo_link: formData.demoLink.trim() || null,
        presentation_video: formData.presentationVideo.trim() || null,
        github_repo: formData.githubRepo.trim() || null,
        status: 'pending', // Set initial status
        created_at: new Date().toISOString(),
      };

      console.log('Inserting data into database:', dbData);

      // Save to Supabase with explicit column selection
      const { data: insertedData, error: dbError } = await supabase
        .from('ip_registrations')
        .insert([dbData]);

      if (dbError) {
        console.error('Database error details:', dbError);
        
        // Handle database error
        const errorMessage = dbError.message;
        
        if (errorMessage.includes('duplicate key')) {
          throw new Error('A project with this title already exists. Please choose a different title.');
        } else if (errorMessage.includes('violates not-null constraint')) {
          throw new Error('Missing required field. Please check all required fields are filled.');
        } else if (errorMessage.includes('permission denied')) {
          throw new Error('Permission denied. Please make sure you are signed in properly.');
        } else if (errorMessage.includes('column') && errorMessage.includes('does not exist')) {
          if (errorMessage.includes('github_repo')) {
            throw new Error('Database schema issue with github_repo column. Please contact support.');
          } else {
            throw new Error(`Database column error: ${errorMessage}`);
          }
        } else if (errorMessage.includes('relation') && errorMessage.includes('does not exist')) {
          throw new Error('Database table not found. Please contact support.');
        } else {
          throw new Error(`Database error: ${errorMessage}\n\nIf this problem persists, please contact support with the error details.`);
        }
      }

      console.log('Successfully inserted into database:', insertedData);

      setSuccess({
        ipfsHash: metadataHash,
        ipfsUrl,
      });

      // Clear form
      setFormData({
        title: '',
        description: '',
        founderName: '',
        companyName: '',
        category: '',
        projectType: '',
        businessModel: '',
        projectSummary: '',
        developers: '',
        demoLink: '',
        presentationVideo: '',
        githubRepo: '',
      });

      // Call success callback after a delay to show success message
      setTimeout(() => {
        if (onSuccess) {
          onSuccess();
        }
      }, 3000);

    } catch (err) {
      console.error('Error registering IP:', err);
      let errorMessage = 'Failed to register IP. Please try again.';
      
      // Type guard for Error objects
      if (err instanceof Error) {
        errorMessage = err.message;
      } else if (err && typeof err === 'object' && 'message' in err && typeof (err as { message: string }).message === 'string') {
        errorMessage = (err as { message: string }).message;
      }
      
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="text-center py-8">
        <div className="w-16 h-16 bg-green-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <CheckCircle size={32} className="text-green-600" />
        </div>
        <h3 className="text-2xl font-bold text-text-primary mb-2">Project Registration Successful!</h3>
        <p className="text-text-secondary mb-6">
          Your project has been successfully registered on IPFS and stored on the blockchain.
        </p>
        
        <div className="bg-light-card rounded-xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <span className="text-text-secondary">IPFS Hash:</span>
            <code className="text-primary font-mono text-sm bg-primary/10 px-2 py-1 rounded">
              {success.ipfsHash}
            </code>
          </div>
          <a
            href={success.ipfsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center space-x-2 w-full py-3 bg-primary hover:bg-primary-dark rounded-xl text-white font-medium transition-all duration-300"
          >
            <Globe size={20} />
            <span>View on IPFS</span>
            <ExternalLink size={16} />
          </a>
        </div>

        <p className="text-text-muted text-sm">
          Redirecting back to your projects in a moment...
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center mx-auto mb-4">
          <Shield size={24} className="text-primary" />
        </div>
        <h2 className="text-2xl font-bold text-text-primary mb-2">Register Your Project</h2>
        <p className="text-text-secondary">
          Protect your intellectual property on the blockchain
          {!pinataService.isConfigured() && (
            <span className="text-yellow-600"> (Demo Mode)</span>
          )}
        </p>
      </div>

      {!pinataService.isConfigured() && (
        <div className="flex items-center space-x-2 p-4 bg-yellow-50 border border-yellow-200 rounded-xl">
          <AlertCircle size={20} className="text-yellow-600 flex-shrink-0" />
          <p className="text-yellow-700 text-sm">
            Demo mode: Configure Pinata API credentials in your environment variables for real IPFS storage.
          </p>
        </div>
      )}

      {error && (
        <div className="flex items-center space-x-2 p-4 bg-red-50 border border-red-200 rounded-xl">
          <AlertCircle size={20} className="text-red-500 flex-shrink-0" />
          <div>
            <p className="text-red-700 text-sm font-medium">{error}</p>
            <p className="text-red-600 text-xs mt-1">
              If this problem persists, please contact support with the error details.
            </p>
          </div>
        </div>
      )}

      {/* GitHub Repository Selection */}
      {selectedRepos && selectedRepos.length > 0 && (
        <div className="p-6 bg-primary/5 border border-primary/20 rounded-xl">
          <div className="flex items-center space-x-3 mb-4">
            <Github size={20} className="text-primary" />
            <h3 className="font-semibold text-text-primary">GitHub Repository Connected</h3>
          </div>
          
          <div className="space-y-4">
            {selectedRepos.map((repo, index) => (
              <div key={index} className="flex items-center justify-between p-4 bg-white rounded-lg border border-light-border">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 bg-gray-100 rounded-lg flex items-center justify-center">
                    <Code size={16} className="text-gray-600" />
                  </div>
                  <div>
                    <h4 className="font-medium text-text-primary">{repo.name}</h4>
                    <div className="flex items-center space-x-2 text-xs text-text-muted">
                      <span>{repo.language}</span>
                      <span>•</span>
                      <div className="flex items-center space-x-1">
                        <span>⭐</span>
                        <span>{repo.stargazers_count}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-primary hover:text-primary-dark"
                >
                  <ExternalLink size={16} />
                </a>
              </div>
            ))}
          </div>
          
          <p className="mt-4 text-sm text-text-muted">
            This repository will be linked to your project registration, providing code verification and technical credibility.
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Basic Information */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
            <User size={20} className="text-primary" />
            <span>Basic Information</span>
          </h3>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Founder Name *
              </label>
              <input
                type="text"
                name="founderName"
                value={formData.founderName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary placeholder-text-muted transition-all duration-300"
                placeholder="Enter your full name"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Company/Startup Name
              </label>
              <input
                type="text"
                name="companyName"
                value={formData.companyName}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary placeholder-text-muted transition-all duration-300"
                placeholder="Enter your company or startup name"
              />
            </div>
          </div>
        </div>

        {/* Project Details */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
            <Lightbulb size={20} className="text-primary" />
            <span>Project Details</span>
          </h3>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Project Title *
            </label>
            <input
              type="text"
              name="title"
              value={formData.title}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary placeholder-text-muted transition-all duration-300"
              placeholder="Enter a descriptive title for your project"
              required
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Category *
              </label>
              <select
                name="category"
                value={formData.category}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary transition-all duration-300"
                required
              >
                <option value="">Select a category</option>
                {categories.map((category) => (
                  <option key={category} value={category}>
                    {category}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-text-primary mb-2">
                Project Type *
              </label>
              <select
                name="projectType"
                value={formData.projectType}
                onChange={handleInputChange}
                className="w-full px-4 py-3 border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary transition-all duration-300"
                required
              >
                <option value="">Select project type</option>
                {projectTypes.map((type) => (
                  <option key={type} value={type}>
                    {type}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Project Summary *
            </label>
            <textarea
              name="projectSummary"
              value={formData.projectSummary}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary placeholder-text-muted transition-all duration-300 resize-none"
              placeholder="Brief summary of your project (elevator pitch)"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Detailed Description *
            </label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={6}
              className="w-full px-4 py-3 border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary placeholder-text-muted transition-all duration-300 resize-none"
              placeholder="Detailed description of your project, technology used, problem it solves, etc."
              required
            />
          </div>
        </div>

        {/* Business Information */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
            <DollarSign size={20} className="text-primary" />
            <span>Business Information</span>
          </h3>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Business Model *
            </label>
            <select
              name="businessModel"
              value={formData.businessModel}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary transition-all duration-300"
              required
            >
              <option value="">Select business model</option>
              {businessModels.map((model) => (
                <option key={model} value={model}>
                  {model}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Team/Developers *
            </label>
            <textarea
              name="developers"
              value={formData.developers}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-4 py-3 border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary placeholder-text-muted transition-all duration-300 resize-none"
              placeholder="List the team members and their roles (e.g., John Doe - Lead Developer, Jane Smith - UI/UX Designer)"
              required
            />
          </div>
        </div>

        {/* GitHub Repository */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
            <Github size={20} className="text-primary" />
            <span>GitHub Repository</span>
          </h3>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              GitHub Repository
            </label>
            <input
              type="text"
              name="githubRepo"
              value={formData.githubRepo}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary placeholder-text-muted transition-all duration-300"
              placeholder="username/repository"
            />
            <p className="text-xs text-text-muted mt-1">
              {selectedRepos && selectedRepos.length > 0 
                ? "Repository selected from your GitHub account" 
                : "Link a GitHub repository to your project (e.g., username/repository)"}
            </p>
          </div>
        </div>

        {/* Media & Links */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
            <Video size={20} className="text-primary" />
            <span>Media & Links</span>
          </h3>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Presentation Video URL
            </label>
            <input
              type="url"
              name="presentationVideo"
              value={formData.presentationVideo}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary placeholder-text-muted transition-all duration-300"
              placeholder="https://youtube.com/watch?v=... or https://vimeo.com/..."
            />
            <p className="text-xs text-text-muted mt-1">Upload your presentation video to YouTube, Vimeo, or similar platform and paste the link here</p>
          </div>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Working Demo Link
            </label>
            <input
              type="url"
              name="demoLink"
              value={formData.demoLink}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-light-border rounded-xl focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary/50 text-text-primary placeholder-text-muted transition-all duration-300"
              placeholder="https://your-demo-site.com or https://github.com/username/repo"
            />
            <p className="text-xs text-text-muted mt-1">Link to live demo, GitHub repository, or prototype</p>
          </div>
        </div>

        {/* File Upload */}
        <div className="space-y-6">
          <h3 className="text-lg font-semibold text-text-primary flex items-center space-x-2">
            <Upload size={20} className="text-primary" />
            <span>Supporting Documents</span>
          </h3>

          <div>
            <label className="block text-sm font-medium text-text-primary mb-2">
              Additional Documents (Optional)
            </label>
            <div className="border-2 border-dashed border-light-border rounded-xl p-6 text-center hover:border-primary/50 transition-all duration-300">
              <input
                type="file"
                onChange={handleFileChange}
                accept=".pdf,.doc,.docx,.txt,.ppt,.pptx,.jpg,.jpeg,.png"
                className="hidden"
                id="file-upload"
              />
              <label htmlFor="file-upload" className="cursor-pointer">
                <Upload size={32} className="mx-auto text-text-muted mb-2" />
                <p className="text-text-primary font-medium mb-1">
                  {formData.file ? formData.file.name : 'Click to upload files'}
                </p>
                <p className="text-text-muted text-sm">
                  Business plan, technical documentation, wireframes, etc. (max 10MB)
                </p>
              </label>
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className="w-full py-4 bg-gradient-to-r from-primary to-secondary hover:from-primary-dark hover:to-secondary-dark disabled:opacity-50 disabled:cursor-not-allowed rounded-xl text-white font-semibold transition-all duration-300 flex items-center justify-center space-x-2 shadow-lg hover:shadow-xl"
        >
          {loading ? (
            <>
              <Loader2 size={20} className="animate-spin" />
              <span>Registering Project...</span>
            </>
          ) : (
            <>
              <Shield size={20} />
              <span>Register Project on Blockchain</span>
            </>
          )}
        </button>
      </form>

      <div className="p-4 bg-light-card rounded-xl">
        <p className="text-text-muted text-sm">
          <strong>Note:</strong> By registering your project, you create an immutable record on IPFS 
          that proves the existence and ownership of your intellectual property at this point in time.
          This helps establish prior art and can be valuable for patent applications and IP protection.
        </p>
      </div>
    </div>
  );
}