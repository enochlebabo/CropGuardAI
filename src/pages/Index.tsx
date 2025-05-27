
import React from 'react';
import { CameraCapture } from '@/components/CameraCapture';
import { AppHeader } from '@/components/AppHeader';
import { FeatureCards } from '@/components/FeatureCards';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-green-800 mb-4">
            🌾 CropGuard AI
          </h1>
          <p className="text-xl text-green-700 mb-8 max-w-2xl mx-auto">
            Detect plant diseases instantly with AI-powered image recognition. 
            Get expert treatment recommendations to protect your crops.
          </p>
        </div>

        <CameraCapture />
        <FeatureCards />
      </main>
    </div>
  );
};

export default Index;
