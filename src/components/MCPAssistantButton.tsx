import React, { useState } from 'react';
import { MessageCircle } from 'lucide-react';
import MCPAssistant from './MCPAssistant';

interface MCPAssistantButtonProps {
  onInsightGenerated?: (insight: any) => void;
}

const MCPAssistantButton: React.FC<MCPAssistantButtonProps> = ({ onInsightGenerated }) => {
  const [showAssistant, setShowAssistant] = useState(false);

  return (
    <>
      {/* Floating chat button */}
      <button
        onClick={() => setShowAssistant(true)}
        className="fixed bottom-6 right-6 z-40 w-16 h-16 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 pulse-glow group"
        aria-label="Open MCP Assistant"
      >
        <MessageCircle size={28} className="text-white group-hover:scale-110 transition-transform duration-300" />
        
        {/* Notification dot */}
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-accent rounded-full border-2 border-white flex items-center justify-center">
          <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
        </div>
      </button>

      {/* MCP Assistant Modal */}
      {showAssistant && (
        <MCPAssistant
          isOpen={showAssistant}
          onClose={() => setShowAssistant(false)}
          onInsightGenerated={onInsightGenerated}
        />
      )}
    </>
  );
};

export default MCPAssistantButton;