
import React from 'react';
import { CameraCapture } from '@/components/CameraCapture';
import { AppHeader } from '@/components/AppHeader';
import { FeatureCards } from '@/components/FeatureCards';
import { Footer } from '@/components/Footer';

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

        <section id="scan">
          <CameraCapture />
        </section>
        
        <section id="features">
          <FeatureCards />
        </section>

        <section id="about" className="mt-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-green-800 mb-6">About CropGuard AI</h2>
            <p className="text-lg text-green-700 mb-6">
              CropGuard AI is an innovative solution designed to help farmers detect plant diseases early 
              and accurately using advanced machine learning technology. Our mission is to reduce crop 
              losses and improve agricultural productivity worldwide.
            </p>
            <p className="text-green-600">
              Simply take a photo of your plant, and our AI will analyze it instantly to provide 
              detailed diagnosis and treatment recommendations.
            </p>
          </div>
        </section>

        <section id="contact" className="mt-16 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-green-800 mb-6">Get in Touch</h2>
            <p className="text-lg text-green-700 mb-6">
              Have questions or need support? We're here to help farmers succeed.
            </p>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg border-2 border-green-200">
              <p className="text-green-800 font-semibold">Contact Information</p>
              <p className="text-green-600 mt-2">Email: support@cropguard.ai</p>
              <p className="text-green-600">Phone: +1 (555) 123-4567</p>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
