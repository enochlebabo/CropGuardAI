
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle, Sparkles } from 'lucide-react';
import { Chatbot } from './Chatbot';

export const ChatbotTrigger: React.FC = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <>
      {!isChatbotOpen && (
        <div className="fixed bottom-6 right-6 z-50">
          {/* Pulsing background effect */}
          <div className="absolute inset-0 bg-green-500 rounded-full animate-ping opacity-30"></div>
          <div className="absolute inset-0 bg-green-400 rounded-full animate-pulse opacity-40 scale-110"></div>
          
          <Button
            onClick={toggleChatbot}
            className="relative h-20 w-20 rounded-full bg-gradient-to-br from-green-500 via-green-600 to-emerald-700 hover:from-green-600 hover:via-green-700 hover:to-emerald-800 shadow-2xl border-4 border-white/20 transform transition-all duration-300 hover:scale-110 group"
            size="icon"
          >
            {/* Floating sparkles */}
            <Sparkles className="absolute -top-2 -right-2 h-4 w-4 text-yellow-300 animate-bounce" />
            <Sparkles className="absolute -bottom-1 -left-1 h-3 w-3 text-yellow-200 animate-pulse" />
            
            {/* Main icon */}
            <MessageCircle className="h-10 w-10 text-white group-hover:rotate-12 transition-transform duration-300" />
            
            {/* Floating label */}
            <div className="absolute -top-14 left-1/2 transform -translate-x-1/2 bg-gray-900 text-white text-xs font-semibold px-3 py-2 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 whitespace-nowrap shadow-lg">
              🤖 Ask AgriBot
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-t-gray-900"></div>
            </div>
          </Button>
          
          {/* Notification badge */}
          <div className="absolute -top-2 -right-2 bg-red-500 text-white text-xs font-bold rounded-full h-6 w-6 flex items-center justify-center animate-bounce">
            AI
          </div>
        </div>
      )}
      
      <Chatbot isOpen={isChatbotOpen} onToggle={toggleChatbot} />
    </>
  );
};
