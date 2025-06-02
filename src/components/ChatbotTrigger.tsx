
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { MessageCircle } from 'lucide-react';
import { Chatbot } from './Chatbot';

export const ChatbotTrigger: React.FC = () => {
  const [isChatbotOpen, setIsChatbotOpen] = useState(false);

  const toggleChatbot = () => {
    setIsChatbotOpen(!isChatbotOpen);
  };

  return (
    <>
      {!isChatbotOpen && (
        <Button
          onClick={toggleChatbot}
          className="fixed bottom-4 right-4 z-50 h-14 w-14 rounded-full bg-green-600 hover:bg-green-700 shadow-2xl"
          size="icon"
        >
          <MessageCircle className="h-6 w-6" />
        </Button>
      )}
      
      <Chatbot isOpen={isChatbotOpen} onToggle={toggleChatbot} />
    </>
  );
};
