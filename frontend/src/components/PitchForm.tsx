import { useState } from 'react';
import { PinataService } from '../services/pinata.service';

interface PitchFormProps {
  walletAddress: string;
}

interface PitchFormData {
  title: string;
  description: string;
  file?: File;
  category: string;
  founderName: string;
}

export function PitchForm({ walletAddress }: PitchFormProps) {
  const [formData, setFormData] = useState<PitchFormData>({
    title: '',
    description: '',
    category: '',
    founderName: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ipfsHash, setIpfsHash] = useState<string | null>(null);
  const pinataService = new PinataService();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setFormData(prev => ({ ...prev, file: e.target.files![0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setLoading(true);
      setError(null);
      setIpfsHash(null);

      // Upload pitch document if provided
      let documentHash = '';
      if (formData.file) {
        documentHash = await pinataService.uploadFile(formData.file, {
          type: 'pitch_document',
          category: formData.category,
          founderName: formData.founderName,
          walletAddress
        });
      }

      // Upload pitch metadata
      const metadataHash = await pinataService.uploadJSON({
        title: formData.title,
        description: formData.description,
        documentHash,
        category: formData.category,
        founderName: formData.founderName,
        walletAddress,
        createdAt: new Date().toISOString(),
      });

      const ipfsUrl = await pinataService.getIPFSUrl(metadataHash);
      setIpfsHash(ipfsUrl);
      
      // Clear form if successful
      if (!documentHash) {
        setFormData({
          title: '',
          description: '',
          category: '',
          founderName: '',
        });
      }
    } catch (err) {
      console.error('Error registering IP:', err);
      setError('Failed to register IP. Please check your Pinata credentials and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '800px', margin: '40px auto', padding: '20px' }}>
      <h1 style={{ fontSize: '24px', marginBottom: '20px', textAlign: 'center' }}>
        Register Your Startup IP
      </h1>

      {error && (
        <div style={{ 
          padding: '12px', 
          backgroundColor: '#FEE2E2', 
          color: '#DC2626', 
          borderRadius: '8px',
          marginBottom: '20px' 
        }}>
          {error}
        </div>
      )}
      
      {ipfsHash && (
        <div style={{ 
          padding: '12px', 
          backgroundColor: '#ECFDF5', 
          color: '#059669',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <p>✅ IP Registration Successful!</p>
          <p style={{ marginTop: '8px' }}>
            Your IP is now registered on IPFS. View it here:{' '}
            <a 
              href={ipfsHash} 
              target="_blank" 
              rel="noopener noreferrer"
              style={{ color: '#0284C7', textDecoration: 'underline' }}
            >
              {ipfsHash}
            </a>
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} style={{ 
        display: 'flex', 
        flexDirection: 'column', 
        gap: '20px',
        backgroundColor: 'white',
        padding: '24px',
        borderRadius: '12px',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)'
      }}>
        <div>
          <label htmlFor="founderName" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Founder Name
          </label>
          <input
            type="text"
            id="founderName"
            name="founderName"
            value={formData.founderName}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #D1D5DB'
            }}
          />
        </div>

        <div>
          <label htmlFor="category" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Startup Category
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #D1D5DB'
            }}
          >
            <option value="">Select a category</option>
            <option value="fintech">Fintech</option>
            <option value="healthtech">Healthtech</option>
            <option value="edtech">Edtech</option>
            <option value="ecommerce">E-commerce</option>
            <option value="saas">SaaS</option>
            <option value="ai">AI/ML</option>
            <option value="blockchain">Blockchain</option>
            <option value="other">Other</option>
          </select>
        </div>

        <div>
          <label htmlFor="title" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Project Title
          </label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleInputChange}
            required
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #D1D5DB'
            }}
          />
        </div>

        <div>
          <label htmlFor="description" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Project Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            required
            rows={4}
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #D1D5DB'
            }}
          />
        </div>

        <div>
          <label htmlFor="file" style={{ display: 'block', marginBottom: '8px', fontWeight: 'bold' }}>
            Supporting Documents (Optional)
          </label>
          <input
            type="file"
            id="file"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx,.txt,.ppt,.pptx"
            style={{
              width: '100%',
              padding: '8px 12px',
              borderRadius: '6px',
              border: '1px solid #D1D5DB',
              backgroundColor: '#F9FAFB'
            }}
          />
          <p style={{ fontSize: '14px', color: '#6B7280', marginTop: '4px' }}>
            Upload pitch deck, business plan, or any other relevant documents
          </p>
        </div>

        <button
          type="submit"
          disabled={loading}
          style={{
            padding: '12px',
            backgroundColor: loading ? '#9CA3AF' : '#6366F1',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: loading ? 'not-allowed' : 'pointer',
            fontWeight: 'bold',
            marginTop: '12px'
          }}
        >
          {loading ? 'Registering IP...' : 'Register IP on IPFS'}
        </button>
      </form>
    </div>
  );
} 