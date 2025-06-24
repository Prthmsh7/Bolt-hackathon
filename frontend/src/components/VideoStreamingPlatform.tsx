import React, { useState, useEffect } from 'react';
import { Box } from '@mui/material';

// Import the video streaming platform components
import VideoPlayer from '../../../components/video-streaming-platform/src/components/VideoPlayer';
import AuthModal from '../../../components/video-streaming-platform/src/components/AuthModal';
import { Video } from '../../../components/video-streaming-platform/src/types/Video';
import { supabase } from '../lib/supabase';

// Import the video streaming platform styles
import '../../../components/video-streaming-platform/src/index.css';

interface VideoStreamingPlatformProps {
  onClose?: () => void;
}

const VideoStreamingPlatform: React.FC<VideoStreamingPlatformProps> = ({ onClose }) => {
  // Initial video queue with sample videos
  const [videoQueue, setVideoQueue] = useState<Video[]>([
    {
      id: '1',
      title: 'Building a Modern React Application with TypeScript',
      channel: 'Tech Tutorials',
      views: '1.2M views',
      timestamp: '2 days ago',
      duration: '15:42',
      thumbnail: 'https://images.pexels.com/photos/11035380/pexels-photo-11035380.jpeg?auto=compress&cs=tinysrgb&w=1280&h=720&dpr=2',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
      channelAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2',
      description: 'Learn how to build a modern React application using TypeScript, including best practices and advanced patterns. In this comprehensive tutorial, we\'ll cover component architecture, state management, type safety, and performance optimization techniques that will help you build scalable and maintainable applications.',
      likes: '45K',
      subscribers: '892K'
    },
    {
      id: '2',
      title: 'Advanced React Patterns You Should Know',
      channel: 'Code Academy',
      views: '856K views',
      timestamp: '1 day ago',
      duration: '12:34',
      thumbnail: 'https://images.pexels.com/photos/11035471/pexels-photo-11035471.jpeg?auto=compress&cs=tinysrgb&w=1280&h=720&dpr=2',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4',
      channelAvatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2',
      description: 'Dive deep into advanced React patterns including render props, higher-order components, compound components, and custom hooks. These patterns will help you write more reusable and maintainable React code.',
      likes: '32K',
      subscribers: '654K'
    },
    {
      id: '3',
      title: 'Beautiful Sunset Timelapse',
      channel: 'Nature Shots',
      views: '2.3M views',
      timestamp: '3 days ago',
      duration: '8:15',
      thumbnail: 'https://images.pexels.com/photos/1431822/pexels-photo-1431822.jpeg?auto=compress&cs=tinysrgb&w=1280&h=720&dpr=2',
      videoUrl: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4',
      channelAvatar: 'https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=40&h=40&dpr=2',
      description: 'Experience the breathtaking beauty of nature with this stunning sunset timelapse. Shot over 3 hours and compressed into 8 minutes of pure visual poetry.',
      likes: '89K',
      subscribers: '1.2M'
    }
  ]);

  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [user, setUser] = useState<any>(null);

  // Page load animation
  useEffect(() => {
    setIsLoaded(true);
    checkAuthStatus();
  }, []);

  // Listen for auth changes
  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user || null);
    });

    return () => subscription.unsubscribe();
  }, []);

  const checkAuthStatus = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    setUser(user);
  };

  const handleVideoUpload = (uploadedVideo: Video) => {
    setVideoQueue(prevQueue => [...prevQueue, uploadedVideo]);
  };

  const handleNextVideo = () => {
    if (currentVideoIndex < videoQueue.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  const handleVideoSelect = (videoIndex: number) => {
    setCurrentVideoIndex(videoIndex);
  };

  const currentVideo = videoQueue[currentVideoIndex];
  const upNextVideos = videoQueue.slice(currentVideoIndex + 1);

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        bgcolor: '#0a0a0f',
        color: '#f8fafc',
        zIndex: 1300,
        overflow: 'hidden',
        fontFamily: 'Inter, system-ui, sans-serif',
      }}
      className={`transition-all duration-1000 ${isLoaded ? 'fade-in' : 'opacity-0'}`}
    >
      {/* Header */}
      <header className="glass border-b border-dark-border sticky top-0 z-50 slide-in-left">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center pulse-glow morph-shape">
                <span className="text-white font-bold text-lg">S</span>
              </div>
              <h1 className="text-2xl font-bold text-primary">
                Sillycon
              </h1>
            </div>
            
            {/* Close Button */}
            {onClose && (
              <button
                onClick={onClose}
                className="flex items-center space-x-2 px-4 py-2 glass hover:bg-primary/20 rounded-lg transition-all duration-300 text-sm"
              >
                <span>← Back to Z Combinator</span>
              </button>
            )}
          </div>
        </div>
      </header>

      {/* Video Content */}
      <div style={{ height: 'calc(100vh - 80px)', overflow: 'auto' }}>
        {currentVideo && (
          <VideoPlayer 
            video={currentVideo}
            upNextVideos={upNextVideos}
            onVideoUpload={handleVideoUpload}
            onNextVideo={handleNextVideo}
            onVideoSelect={handleVideoSelect}
            currentVideoIndex={currentVideoIndex}
          />
        )}
      </div>

      {/* Authentication Modal */}
      <AuthModal 
        isOpen={showAuthModal}
        onClose={() => setShowAuthModal(false)}
        onAuthSuccess={() => setShowAuthModal(false)}
      />
    </Box>
  );
};

export default VideoStreamingPlatform;