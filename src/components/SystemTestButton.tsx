import React, { useState } from 'react';
import { Shield } from 'lucide-react';
import SystemTest from './SystemTest';

const SystemTestButton: React.FC = () => {
  const [showSystemTest, setShowSystemTest] = useState(false);

  return (
    <>
      {/* Floating system test button */}
      <button
        onClick={() => setShowSystemTest(true)}
        className="fixed bottom-6 left-6 z-40 w-16 h-16 neo-btn bg-primary rounded-full flex items-center justify-center group"
        aria-label="Run System Tests"
        title="Run comprehensive system integration tests"
      >
        <Shield size={28} className="text-white group-hover:scale-110 transition-transform duration-300" />
        
        {/* Notification dot */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-secondary rounded-full border-2 border-white flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        </div>
      </button>

      {/* System Test Modal */}
      {showSystemTest && (
        <SystemTest
          isOpen={showSystemTest}
          onClose={() => setShowSystemTest(false)}
        />
      )}
    </>
  );
};

export default SystemTestButton;