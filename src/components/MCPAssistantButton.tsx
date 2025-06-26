import React, { useState } from 'react';
import { Brain } from 'lucide-react';
import MCPAssistant from './MCPAssistant';

interface MCPAssistantButtonProps {
  onInsightGenerated?: (insight: any) => void;
}

const MCPAssistantButton: React.FC<MCPAssistantButtonProps> = ({ onInsightGenerated }) => {
  const [showAssistant, setShowAssistant] = useState(false);

  return (
    <>
      {/* Floating button */}
      <button
        onClick={() => setShowAssistant(true)}
        className="fixed bottom-6 right-6 z-40 w-14 h-14 bg-gradient-to-r from-primary to-secondary rounded-full flex items-center justify-center shadow-lg hover:shadow-xl hover:scale-110 transition-all duration-300 pulse-glow"
        aria-label="Open MCP Assistant"
      >
        <Brain size={24} className="text-white" />
      </button>

      {/* MCP Assistant Modal */}
      <MCPAssistant
        isOpen={showAssistant}
        onClose={() => setShowAssistant(false)}
        onInsightGenerated={onInsightGenerated}
      />
    </>
  );
};

export default MCPAssistantButton;