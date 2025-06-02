import React, { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { MessageCircle, Send, Bot, User, Settings, X, Minimize2, Maximize2, Zap, Leaf } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface ChatbotProps {
  isOpen: boolean;
  onToggle: () => void;
}

export const Chatbot: React.FC<ChatbotProps> = ({ isOpen, onToggle }) => {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: '🌾 Hello! I\'m AgriBot, your intelligent agricultural assistant powered by advanced AI. I can help you with plant diseases, farming techniques, crop management, and much more. What agricultural challenge can I help you solve today?',
      timestamp: new Date()
    }
  ]);
  const [inputMessage, setInputMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [selectedAPI, setSelectedAPI] = useState<'chatgpt' | 'deepseek'>('chatgpt');
  const [apiKey, setApiKey] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    // Load API key from localStorage
    const savedApiKey = localStorage.getItem(`${selectedAPI}-api-key`);
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, [selectedAPI]);

  const saveApiKey = () => {
    if (apiKey.trim()) {
      localStorage.setItem(`${selectedAPI}-api-key`, apiKey);
      toast({
        title: "API Key Saved",
        description: `${selectedAPI === 'chatgpt' ? 'ChatGPT' : 'DeepSeek'} API key has been saved locally.`,
      });
      setShowSettings(false);
    }
  };

  const sendMessage = async () => {
    if (!inputMessage.trim()) return;

    const savedApiKey = localStorage.getItem(`${selectedAPI}-api-key`);
    if (!savedApiKey) {
      toast({
        title: "API Key Required",
        description: `Please set your ${selectedAPI === 'chatgpt' ? 'ChatGPT' : 'DeepSeek'} API key in settings.`,
        variant: "destructive"
      });
      setShowSettings(true);
      return;
    }

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: inputMessage,
      timestamp: new Date()
    };

    setMessages(prev => [...prev, userMessage]);
    setInputMessage('');
    setIsLoading(true);

    try {
      const response = await callAIAPI(inputMessage, savedApiKey);
      
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: response,
        timestamp: new Date()
      };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('AI API Error:', error);
      toast({
        title: "Error",
        description: "Failed to get response from AI. Please check your API key and try again.",
        variant: "destructive"
      });
    } finally {
      setIsLoading(false);
    }
  };

  const callAIAPI = async (message: string, apiKey: string): Promise<string> => {
    const systemPrompt = "You are an expert agricultural AI assistant specializing in plant diseases, crop management, farming techniques, and sustainable agriculture. Provide helpful, accurate, and practical advice to farmers and gardeners.";

    if (selectedAPI === 'chatgpt') {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-4o-mini',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message }
          ],
          max_tokens: 1000,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`ChatGPT API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    } else {
      // DeepSeek API
      const response = await fetch('https://api.deepseek.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'deepseek-chat',
          messages: [
            { role: 'system', content: systemPrompt },
            { role: 'user', content: message }
          ],
          max_tokens: 1000,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`DeepSeek API error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0].message.content;
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <Card className={`w-[28rem] shadow-2xl border-4 border-green-200/50 transition-all duration-500 backdrop-blur-sm bg-white/95 ${isMinimized ? 'h-20' : 'h-[40rem]'} animate-scale-in`}>
        <CardHeader className="pb-3 bg-gradient-to-r from-green-50 via-emerald-50 to-green-100 border-b-2 border-green-200">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="relative">
                <Bot className="h-8 w-8 text-green-600 animate-pulse" />
                <div className="absolute -top-1 -right-1 h-3 w-3 bg-green-400 rounded-full animate-ping"></div>
              </div>
              <div>
                <CardTitle className="text-xl text-green-800 font-bold flex items-center gap-2">
                  🤖 AgriBot
                  <Leaf className="h-5 w-5 text-green-600 animate-bounce" />
                </CardTitle>
                <p className="text-xs text-green-600 font-medium">AI Agricultural Expert</p>
              </div>
              <Badge variant="outline" className="text-xs border-green-400 text-green-700 bg-green-50 font-semibold">
                <Zap className="h-3 w-3 mr-1" />
                {selectedAPI === 'chatgpt' ? 'ChatGPT' : 'DeepSeek'}
              </Badge>
            </div>
            <div className="flex items-center space-x-1">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowSettings(!showSettings)}
                className="h-8 w-8 p-0 hover:bg-green-100 transition-colors"
              >
                <Settings className="h-4 w-4 text-green-600" />
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMinimized(!isMinimized)}
                className="h-8 w-8 p-0 hover:bg-green-100 transition-colors"
              >
                {isMinimized ? <Maximize2 className="h-4 w-4 text-green-600" /> : <Minimize2 className="h-4 w-4 text-green-600" />}
              </Button>
              <Button
                variant="ghost"
                size="sm"
                onClick={onToggle}
                className="h-8 w-8 p-0 hover:bg-red-100 transition-colors"
              >
                <X className="h-4 w-4 text-red-600" />
              </Button>
            </div>
          </div>
        </CardHeader>

        {!isMinimized && (
          <CardContent className="p-0 flex flex-col h-full">
            {showSettings && (
              <div className="p-6 border-b bg-gradient-to-r from-gray-50 to-green-50">
                <div className="space-y-4">
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block flex items-center gap-2">
                      <Zap className="h-4 w-4" />
                      AI Provider
                    </label>
                    <Select value={selectedAPI} onValueChange={(value: 'chatgpt' | 'deepseek') => setSelectedAPI(value)}>
                      <SelectTrigger className="border-2 border-green-200 focus:border-green-400">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="chatgpt">🧠 ChatGPT (OpenAI)</SelectItem>
                        <SelectItem value="deepseek">🔍 DeepSeek</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-gray-700 mb-2 block">🔑 API Key</label>
                    <Input
                      type="password"
                      placeholder={`Enter your ${selectedAPI === 'chatgpt' ? 'OpenAI' : 'DeepSeek'} API key`}
                      value={apiKey}
                      onChange={(e) => setApiKey(e.target.value)}
                      className="border-2 border-green-200 focus:border-green-400"
                    />
                  </div>
                  <Button onClick={saveApiKey} size="sm" className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-semibold">
                    💾 Save API Key
                  </Button>
                </div>
              </div>
            )}

            <div className="flex-1 overflow-y-auto p-6 space-y-4 max-h-96 bg-gradient-to-b from-white to-green-50/30">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
                >
                  <div
                    className={`max-w-[85%] p-4 rounded-2xl shadow-lg ${
                      message.role === 'user'
                        ? 'bg-gradient-to-br from-green-600 to-emerald-700 text-white'
                        : 'bg-white border-2 border-green-100 text-gray-800'
                    }`}
                  >
                    <div className="flex items-start space-x-3">
                      {message.role === 'assistant' && (
                        <div className="bg-green-100 p-2 rounded-full">
                          <Bot className="h-4 w-4 text-green-600" />
                        </div>
                      )}
                      {message.role === 'user' && (
                        <div className="bg-white/20 p-2 rounded-full">
                          <User className="h-4 w-4 text-white" />
                        </div>
                      )}
                      <div className="text-sm leading-relaxed flex-1">{message.content}</div>
                    </div>
                  </div>
                </div>
              ))}
              {isLoading && (
                <div className="flex justify-start animate-pulse">
                  <div className="bg-white border-2 border-green-100 p-4 rounded-2xl shadow-lg">
                    <div className="flex items-center space-x-3">
                      <div className="bg-green-100 p-2 rounded-full">
                        <Bot className="h-4 w-4 text-green-600 animate-spin" />
                      </div>
                      <div className="text-sm text-gray-600 flex items-center gap-2">
                        🧠 AgriBot is thinking...
                        <div className="flex space-x-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce"></div>
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.1s'}}></div>
                          <div className="w-2 h-2 bg-green-400 rounded-full animate-bounce" style={{animationDelay: '0.2s'}}></div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <div className="p-6 border-t-2 border-green-100 bg-gradient-to-r from-white to-green-50">
              <div className="flex space-x-3">
                <Input
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="🌱 Ask about plants, diseases, farming techniques..."
                  disabled={isLoading}
                  className="flex-1 border-2 border-green-200 focus:border-green-400 rounded-xl text-base"
                />
                <Button
                  onClick={sendMessage}
                  disabled={isLoading || !inputMessage.trim()}
                  size="sm"
                  className="bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 px-6 rounded-xl transform transition-all duration-200 hover:scale-105 shadow-lg"
                >
                  <Send className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </CardContent>
        )}
      </Card>
    </div>
  );
};
