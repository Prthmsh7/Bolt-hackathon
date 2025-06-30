import React, { useState, useRef } from 'react';
import { X, Upload, Video, FileText, User, Clock, Eye, Zap, Database, Globe, AlertTriangle, Play, Pause, Volume2, CheckCircle, Loader2 } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { filcdnClient, generateVideoMetadata, createFilecoinDeal } from '../lib/filcdn';
import AuthModal from './Auth';

interface VideoUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onVideoUploaded: (video: any) => void;
}

const VideoUploadModal: React.FC<VideoUploadModalProps> = ({ 
  isOpen, 
  onClose, 
  onVideoUploaded 
}) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [channelName, setChannelName] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [dragActive, setDragActive] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState('');
  const [uploadStatus, setUploadStatus] = useState('');
  const [filecoinCID, setFilecoinCID] = useState('');
  const [dealInfo, setDealInfo] = useState<any>(null);
  const [videoPreview, setVideoPreview] = useState<string | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [videoDuration, setVideoDuration] = useState<number>(0);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const thumbnailInputRef = useRef<HTMLInputElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Check authentication status when modal opens
  React.useEffect(() => {
    if (isOpen) {
      checkAuthStatus();
    }
  }, [isOpen]);

  const checkAuthStatus = async () => {
    try {
      const { data: { user }, error } = await supabase.auth.getUser();
      if (error) {
        console.error('Auth check error:', error);
        setIsAuthenticated(false);
        return;
      }
      
      setIsAuthenticated(!!user);
      
      if (user) {
        // Get user profile for channel name
        const { data: profile } = await supabase
          .from('profiles')
          .select('username, full_name');
        
        if (profile && profile.length > 0 && !channelName) {
          setChannelName(profile[0].username || profile[0].full_name || 'My Channel');
        }
      }
    } catch (error) {
      console.error('Auth status check failed:', error);
      setIsAuthenticated(false);
    }
  };

  const resetForm = () => {
    setTitle('');
    setDescription('');
    setChannelName('');
    setSelectedFile(null);
    setThumbnailFile(null);
    setUploadProgress(0);
    setError('');
    setUploadStatus('');
    setFilecoinCID('');
    setDealInfo(null);
    setVideoPreview(null);
    setVideoDuration(0);
    setIsPlaying(false);
  };

  const handleClose = () => {
    if (!isUploading) {
      resetForm();
      onClose();
    }
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === 'dragenter' || e.type === 'dragover') {
      setDragActive(true);
    } else if (e.type === 'dragleave') {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    
    const files = e.dataTransfer.files;
    if (files && files[0]) {
      handleFileSelect(files[0]);
    }
  };

  const handleFileSelect = (file: File) => {
    if (!file.type.startsWith('video/')) {
      setError('Please select a video file');
      return;
    }
    
    // Check file size (max 500MB)
    const maxSize = 500 * 1024 * 1024; // 500MB
    if (file.size > maxSize) {
      setError('Video file size must be less than 500MB');
      return;
    }
    
    setSelectedFile(file);
    setError('');
    
    // Create preview URL
    const previewUrl = URL.createObjectURL(file);
    setVideoPreview(previewUrl);
    
    if (!title) {
      setTitle(file.name.replace(/\.[^/.]+$/, ''));
    }

    // Get video duration
    const video = document.createElement('video');
    video.preload = 'metadata';
    video.onloadedmetadata = () => {
      setVideoDuration(video.duration);
      URL.revokeObjectURL(video.src);
    };
    video.src = previewUrl;
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileSelect(file);
    }
  };

  const handleThumbnailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setThumbnailFile(file);
      setError('');
    } else {
      setError('Please select an image file for thumbnail');
    }
  };

  const formatDuration = (seconds: number): string => {
    if (!seconds || !isFinite(seconds)) return '0:00';
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const formatFileSize = (bytes: number): string => {
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    if (bytes === 0) return '0 Bytes';
    const i = Math.floor(Math.log(bytes) / Math.log(1024));
    return Math.round(bytes / Math.pow(1024, i) * 100) / 100 + ' ' + sizes[i];
  };

  const toggleVideoPreview = () => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.pause();
      } else {
        videoRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleUpload = async () => {
    if (!selectedFile || !title.trim() || !channelName.trim()) {
      setError('Please fill in all required fields and select a video file');
      return;
    }

    setIsUploading(true);
    setUploadProgress(10);
    setError('');

    try {
      // Check authentication before upload
      const { data: { user }, error: userError } = await supabase.auth.getUser();
      if (userError || !user) {
        setError('Authentication required. Please sign in to upload videos.');
        setShowAuthModal(true);
        return;
      }

      setUploadStatus('Preparing video for FilCDN upload...');
      setUploadProgress(20);

      const isFileCDNEnabled = filcdnClient.isEnabled();
      
      if (isFileCDNEnabled) {
        setUploadStatus('Uploading to FilCDN (Filecoin network with CDN)...');
      } else {
        setUploadStatus('Processing video (Demo mode - FilCDN disabled)...');
      }
      setUploadProgress(30);

      // Generate metadata for Filecoin storage
      const videoMetadata = generateVideoMetadata(selectedFile, videoDuration);

      // Upload video to FilCDN with CDN enabled
      const videoUploadResult = await filcdnClient.uploadVideo(selectedFile, {
        filename: `${Date.now()}-${selectedFile.name}`,
        enableCDN: true, // Enable CDN for fast delivery
        metadata: {
          ...videoMetadata,
          title: title.trim(),
          channel: channelName.trim(),
          uploader: user.id,
          category: 'presentation',
        }
      });

      setFilecoinCID(videoUploadResult.cid);
      
      if (isFileCDNEnabled) {
        setUploadStatus('Video uploaded to Filecoin with CDN! Creating storage deal...');
      } else {
        setUploadStatus('Video processed! Creating demo storage deal...');
      }
      setUploadProgress(60);

      // Create Filecoin deal
      const deal = await createFilecoinDeal(videoUploadResult.cid, videoMetadata);
      setDealInfo(deal);

      // Upload thumbnail to FilCDN if provided
      let thumbnailCID = null;
      let thumbnailUrl = null;
      
      if (thumbnailFile) {
        if (isFileCDNEnabled) {
          setUploadStatus('Uploading thumbnail to FilCDN...');
        } else {
          setUploadStatus('Processing thumbnail...');
        }
        
        // For thumbnails, we can use the regular upload method
        const thumbnailUploadResult = await filcdnClient.uploadVideo(thumbnailFile, {
          filename: `thumbnail-${Date.now()}-${thumbnailFile.name}`,
          enableCDN: true,
          metadata: {
            type: 'thumbnail',
            parentCID: videoUploadResult.cid,
          }
        });
        thumbnailCID = thumbnailUploadResult.cid;
        thumbnailUrl = filcdnClient.getThumbnailUrl(thumbnailCID);
      } else {
        // Generate thumbnail URL from video CID
        thumbnailUrl = filcdnClient.getThumbnailUrl(videoUploadResult.cid);
      }

      setUploadStatus('Saving to database...');
      setUploadProgress(80);

      // Create video record with FilCDN/Filecoin data
      const videoData = {
        title: title.trim(),
        description: description.trim() || null,
        channel_name: channelName.trim(),
        thumbnail_url: thumbnailUrl,
        video_url: videoUploadResult.url, // CDN-optimized URL
        duration: formatDuration(videoDuration),
        user_id: user.id,
        views: 0,
        likes: 0,
        dislikes: 0,
        // Store Filecoin-specific data
        filecoin_cid: videoUploadResult.cid,
        filecoin_deal_id: deal.dealId,
        storage_provider: deal.provider,
        file_size: videoUploadResult.size,
        storage_status: deal.status,
        cdn_enabled: true,
        created_at: new Date().toISOString(),
      };

      // Insert video record into database
      const { data: insertedVideo, error: insertError } = await supabase
        .from('videos')
        .insert(videoData);

      if (insertError) {
        console.error('Database insert error:', insertError);
        throw new Error(`Database error: ${insertError.message}`);
      }

      if (isFileCDNEnabled) {
        setUploadStatus('Upload complete! Video stored on Filecoin with CDN acceleration.');
      } else {
        setUploadStatus('Upload complete! (Demo mode - enable FilCDN for real Filecoin storage with CDN)');
      }
      setUploadProgress(100);

      // Create video object for the UI
      const newVideo = {
        id: videoData.user_id,
        title: videoData.title,
        channel: videoData.channel_name,
        views: '0 views',
        timestamp: 'Just now',
        duration: videoData.duration,
        thumbnail: videoData.thumbnail_url,
        videoUrl: videoData.video_url,
        channelAvatar: 'https://images.pexels.com/photos/1040880/pexels-photo-1040880.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2',
        description: videoData.description || '',
        likes: '0',
        subscribers: '1K',
        filecoinCID: videoUploadResult.cid,
        dealInfo: deal,
        cdnEnabled: true,
      };

      onVideoUploaded(newVideo);
      
      // Keep modal open briefly to show success message
      setTimeout(() => {
        resetForm();
        onClose();
      }, 3000);

    } catch (error) {
      console.error('Upload error:', error);
      let errorMessage = 'Upload failed';
      
      if (error instanceof Error) {
        errorMessage = error.message;
      } else if (typeof error === 'object' && error !== null && 'message' in error) {
        errorMessage = String(error.message);
      }
      
      setError(errorMessage);
      setUploadStatus('');
    } finally {
      setIsUploading(false);
      if (!error) {
        setUploadProgress(0);
      }
    }
  };

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
    setShowAuthModal(false);
    checkAuthStatus(); // Refresh auth status and get user info
  };

  if (!isOpen) return null;

  const isFileCDNEnabled = filcdnClient.isEnabled();

  return (
    <>
      <div className="fixed inset-0 bg-black/80 backdrop-blur-sm flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto border border-light-border shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-light-border bg-light-card">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                <Database size={24} className="text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold text-text-primary">
                  Upload to {isFileCDNEnabled ? 'FilCDN' : 'Platform (Demo)'}
                </h2>
                <p className="text-text-secondary">
                  {isFileCDNEnabled 
                    ? 'Decentralized video storage with CDN acceleration' 
                    : 'Demo mode - Enable FilCDN for Filecoin storage with CDN'
                  }
                </p>
              </div>
            </div>
            <button 
              onClick={handleClose}
              disabled={isUploading}
              className="p-3 hover:bg-light-hover rounded-xl transition-all duration-300 disabled:opacity-50"
            >
              <X size={24} className="text-text-secondary" />
            </button>
          </div>

          <div className="p-6 space-y-8">
            {/* FilCDN Status Banner */}
            <div className={`p-6 bg-primary/10 border border-primary/20 rounded-xl`}>
              <div className="flex items-center space-x-4 mb-4">
                {isFileCDNEnabled ? (
                  <Globe size={24} className="text-primary" />
                ) : (
                  <AlertTriangle size={24} className="text-warning" />
                )}
                <h3 className="font-bold text-xl text-text-primary">
                  {isFileCDNEnabled ? 'Powered by FilCDN + Filecoin Network' : 'Demo Mode Active'}
                </h3>
              </div>
              <p className="text-text-secondary mb-4">
                {isFileCDNEnabled ? (
                  'Your videos are stored on the decentralized Filecoin network with CDN acceleration for fast global delivery. This ensures permanent, censorship-resistant storage with optimal performance.'
                ) : (
                  'FilCDN is currently disabled. Videos will be processed locally for demo purposes. To enable real Filecoin storage with CDN, configure your FilCDN credentials in the environment variables.'
                )}
              </p>
              {isFileCDNEnabled && (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-success" />
                    <span>Filecoin Storage</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-success" />
                    <span>CDN Acceleration</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <CheckCircle size={16} className="text-success" />
                    <span>Global Distribution</span>
                  </div>
                </div>
              )}
              {filecoinCID && (
                <div className="mt-4 p-4 bg-white/50 rounded-lg">
                  <p className="text-sm text-text-muted mb-2">
                    {isFileCDNEnabled ? 'Filecoin CID:' : 'Demo CID:'}
                  </p>
                  <p className="text-base font-mono text-secondary break-all">{filecoinCID}</p>
                  {dealInfo && (
                    <div className="mt-2 text-xs text-text-muted">
                      Deal ID: {dealInfo.dealId} | Provider: {dealInfo.provider} | Price: {dealInfo.price}
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Authentication Notice */}
            {!isAuthenticated && (
              <div className="p-6 bg-primary/10 border border-primary/20 rounded-xl">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-primary font-bold text-lg">Sign in required</p>
                    <p className="text-text-secondary">You need to be signed in to upload videos</p>
                  </div>
                  <button
                    onClick={() => setShowAuthModal(true)}
                    className="px-6 py-3 bg-primary rounded-xl text-white font-medium hover:scale-105 transition-all duration-300 shadow-lg"
                  >
                    Sign In
                  </button>
                </div>
              </div>
            )}

            {/* Error Message */}
            {error && (
              <div className="p-4 bg-error/10 border border-error/20 rounded-xl">
                <p className="text-error font-medium">{error}</p>
              </div>
            )}

            {/* Upload Status */}
            {uploadStatus && (
              <div className="p-6 bg-secondary/10 border border-secondary/20 rounded-xl">
                <div className="flex items-center space-x-4">
                  <Loader2 size={20} className="text-secondary animate-spin" />
                  <p className="text-secondary font-medium">{uploadStatus}</p>
                </div>
                {dealInfo && (
                  <div className="mt-3 text-sm text-text-muted">
                    Deal ID: {dealInfo.dealId} | Provider: {dealInfo.provider} | Price: {dealInfo.price}
                  </div>
                )}
              </div>
            )}

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Left Column - File Upload */}
              <div className="space-y-6">
                {/* File Upload Area */}
                <div className="space-y-4">
                  <label className="block text-lg font-bold text-text-primary">
                    Video File *
                  </label>
                  
                  <div
                    className={`border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 ${
                      dragActive 
                        ? 'border-primary bg-primary/10' 
                        : selectedFile 
                          ? 'border-secondary bg-secondary/10' 
                          : 'border-light-border hover:border-primary/50 hover:bg-primary/5'
                    }`}
                    onDragEnter={handleDrag}
                    onDragLeave={handleDrag}
                    onDragOver={handleDrag}
                    onDrop={handleDrop}
                  >
                    {selectedFile ? (
                      <div className="space-y-4">
                        <div className="w-20 h-20 bg-secondary rounded-xl flex items-center justify-center mx-auto">
                          <Video size={40} className="text-white" />
                        </div>
                        <div>
                          <p className="font-bold text-lg text-text-primary">{selectedFile.name}</p>
                          <p className="text-text-secondary">
                            {formatFileSize(selectedFile.size)} • {formatDuration(videoDuration)}
                          </p>
                          <p className="text-sm text-text-muted mt-2">
                            {isFileCDNEnabled ? 'Ready for FilCDN upload with CDN' : 'Ready for demo processing'}
                          </p>
                        </div>
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="text-primary hover:text-primary-dark font-medium transition-colors"
                        >
                          Choose different file
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-6">
                        <div className="w-20 h-20 bg-light-card rounded-xl flex items-center justify-center mx-auto">
                          <Upload size={40} className="text-text-muted" />
                        </div>
                        <div>
                          <p className="text-2xl font-bold text-text-primary mb-3">
                            Drop your video here
                          </p>
                          <p className="text-text-secondary mb-6">
                            {isFileCDNEnabled ? 'Upload to FilCDN for Filecoin storage with CDN' : 'Process for demo platform'}
                          </p>
                          <button
                            onClick={() => fileInputRef.current?.click()}
                            className="px-8 py-4 bg-primary rounded-xl text-white font-medium hover:scale-105 transition-all duration-300 shadow-lg"
                          >
                            Select Video
                          </button>
                        </div>
                        <p className="text-sm text-text-muted">
                          Supported formats: MP4, WebM, AVI, MOV • Max size: 500MB
                          {isFileCDNEnabled && ' • Stored permanently on Filecoin with CDN'}
                        </p>
                      </div>
                    )}
                  </div>

                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="video/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                </div>

                {/* Video Preview */}
                {videoPreview && (
                  <div className="space-y-4">
                    <label className="block text-lg font-bold text-text-primary">
                      Video Preview
                    </label>
                    <div className="relative bg-black rounded-xl overflow-hidden">
                      <video
                        ref={videoRef}
                        src={videoPreview}
                        className="w-full aspect-video object-cover"
                        onPlay={() => setIsPlaying(true)}
                        onPause={() => setIsPlaying(false)}
                      />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <button
                          onClick={toggleVideoPreview}
                          className="w-16 h-16 bg-primary/80 rounded-full flex items-center justify-center hover:bg-primary transition-all duration-300"
                        >
                          {isPlaying ? (
                            <Pause size={24} className="text-white" />
                          ) : (
                            <Play size={24} className="text-white ml-1" />
                          )}
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Right Column - Video Details */}
              <div className="space-y-6">
                {/* Title */}
                <div className="space-y-3">
                  <label className="flex items-center space-x-2 text-lg font-bold text-text-primary">
                    <FileText size={20} />
                    <span>Title *</span>
                  </label>
                  <input
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Enter video title..."
                    className="w-full px-4 py-4 bg-white border border-light-border rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-text-primary placeholder-text-muted transition-all duration-300 text-lg"
                    maxLength={100}
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Make it catchy and descriptive</span>
                    <span className="text-text-muted">{title.length}/100</span>
                  </div>
                </div>

                {/* Channel Name */}
                <div className="space-y-3">
                  <label className="flex items-center space-x-2 text-lg font-bold text-text-primary">
                    <User size={20} />
                    <span>Channel Name *</span>
                  </label>
                  <input
                    type="text"
                    value={channelName}
                    onChange={(e) => setChannelName(e.target.value)}
                    placeholder="Enter your channel name..."
                    className="w-full px-4 py-4 bg-white border border-light-border rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-text-primary placeholder-text-muted transition-all duration-300 text-lg"
                    maxLength={50}
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Your brand or channel identity</span>
                    <span className="text-text-muted">{channelName.length}/50</span>
                  </div>
                </div>

                {/* Description */}
                <div className="space-y-3">
                  <label className="flex items-center space-x-2 text-lg font-bold text-text-primary">
                    <FileText size={20} />
                    <span>Description</span>
                  </label>
                  <textarea
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    placeholder="Describe your video content, what viewers can expect..."
                    rows={4}
                    className="w-full px-4 py-4 bg-white border border-light-border rounded-xl focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20 text-text-primary placeholder-text-muted transition-all duration-300 resize-none text-lg"
                    maxLength={500}
                  />
                  <div className="flex justify-between text-sm">
                    <span className="text-text-muted">Optional but recommended for better discovery</span>
                    <span className="text-text-muted">{description.length}/500</span>
                  </div>
                </div>

                {/* Thumbnail Upload */}
                <div className="space-y-3">
                  <label className="flex items-center space-x-2 text-lg font-bold text-text-primary">
                    <Eye size={20} />
                    <span>Custom Thumbnail</span>
                  </label>
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={() => thumbnailInputRef.current?.click()}
                      className="px-6 py-3 bg-white border border-light-border rounded-xl hover:border-primary/50 transition-all duration-300 font-medium"
                    >
                      {thumbnailFile ? 'Change Thumbnail' : 'Upload Thumbnail'}
                    </button>
                    {thumbnailFile && (
                      <div className="flex items-center space-x-3 text-text-secondary">
                        <CheckCircle size={20} className="text-success" />
                        <span>{thumbnailFile.name}</span>
                      </div>
                    )}
                  </div>
                  <p className="text-sm text-text-muted">
                    Optional: Upload a custom thumbnail (JPG, PNG)
                    {isFileCDNEnabled && ' (also stored on FilCDN)'}
                  </p>
                  <input
                    ref={thumbnailInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleThumbnailChange}
                    className="hidden"
                  />
                </div>
              </div>
            </div>

            {/* Upload Progress */}
            {isUploading && (
              <div className="space-y-4">
                <div className="flex justify-between text-lg">
                  <span className="text-text-secondary font-medium">
                    {isFileCDNEnabled ? 'Uploading to FilCDN...' : 'Processing video...'}
                  </span>
                  <span className="text-primary font-bold">{uploadProgress}%</span>
                </div>
                <div className="w-full bg-light-border rounded-full h-3">
                  <div 
                    className="bg-primary h-3 rounded-full transition-all duration-300"
                    style={{ width: `${uploadProgress}%` }}
                  ></div>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex justify-end space-x-6 pt-6 border-t border-light-border">
              <button
                onClick={handleClose}
                disabled={isUploading}
                className="px-8 py-4 bg-white border border-light-border hover:bg-light-hover rounded-xl font-medium transition-all duration-300 disabled:opacity-50 text-lg"
              >
                Cancel
              </button>
              <button
                onClick={handleUpload}
                disabled={!selectedFile || !title.trim() || !channelName.trim() || isUploading || !isAuthenticated}
                className="px-10 py-4 bg-primary hover:scale-105 disabled:opacity-50 disabled:hover:scale-100 rounded-xl font-bold text-white transition-all duration-300 flex items-center space-x-3 shadow-lg text-lg"
              >
                {isUploading ? (
                  <>
                    <Loader2 size={20} className="animate-spin" />
                    <span>{isFileCDNEnabled ? 'Uploading to FilCDN...' : 'Processing...'}</span>
                  </>
                ) : (
                  <>
                    <Database size={20} />
                    <span>{isFileCDNEnabled ? 'Upload to FilCDN' : 'Upload Video'}</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Authentication Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={handleAuthSuccess}
      />
    </>
  );
};

export default VideoUploadModal;