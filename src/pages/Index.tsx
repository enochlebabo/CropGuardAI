import React from 'react';
import { Link } from 'react-router-dom';
import { CameraCapture } from '@/components/CameraCapture';
import { AppHeader } from '@/components/AppHeader';
import { FeatureCards } from '@/components/FeatureCards';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, Star, Users, Shield, Zap } from 'lucide-react';

const Index = () => {
  const isLoggedIn = localStorage.getItem('isLoggedIn') === 'true';

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
            Get expert treatment recommendations to protect your crops and maximize yields.
          </p>
          
          {!isLoggedIn && (
            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-8">
              <Link to="/signup">
                <Button size="lg" className="bg-green-600 hover:bg-green-700">
                  Get Started Free
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </Link>
              <Link to="/learn">
                <Button variant="outline" size="lg" className="border-green-600 text-green-600 hover:bg-green-600 hover:text-white">
                  Explore Learning Center
                </Button>
              </Link>
            </div>
          )}
        </div>

        {/* Trust Indicators */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-12">
          <div className="text-center">
            <div className="text-3xl font-bold text-green-800">50,000+</div>
            <div className="text-green-700">Farmers Trust Us</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-800">95%</div>
            <div className="text-green-700">Accuracy Rate</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-800">500+</div>
            <div className="text-green-700">Plant Diseases Detected</div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold text-green-800">24/7</div>
            <div className="text-green-700">AI Support</div>
          </div>
        </div>

        <section id="scan">
          <CameraCapture />
        </section>
        
        <section id="features" className="mt-16">
          <FeatureCards />
        </section>

        {/* Enhanced Features Section */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-green-800 mb-8 text-center">Why Choose CropGuard AI?</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="text-center">
              <CardHeader>
                <Zap className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Instant Results</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Get disease diagnosis in seconds, not days. Our AI processes images instantly for immediate action.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Shield className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>99.9% Uptime</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Reliable service when you need it most. Our cloud infrastructure ensures constant availability.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Users className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Expert Community</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Connect with agricultural experts and fellow farmers worldwide for shared knowledge and support.</p>
              </CardContent>
            </Card>
            
            <Card className="text-center">
              <CardHeader>
                <Star className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Proven Results</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600">Join thousands of farmers who have increased their yields by up to 30% using our platform.</p>
              </CardContent>
            </Card>
          </div>
        </section>

        <section id="about" className="mt-16 text-center">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-3xl font-bold text-green-800 mb-6">About CropGuard AI</h2>
            <p className="text-lg text-green-700 mb-6">
              CropGuard AI is an innovative agricultural technology solution designed to revolutionize crop management 
              through artificial intelligence. Our platform combines cutting-edge machine learning algorithms with 
              extensive agricultural expertise to provide farmers with instant, accurate plant disease detection and 
              treatment recommendations.
            </p>
            <p className="text-lg text-green-700 mb-6">
              Founded by agricultural scientists and AI engineers, we understand the challenges farmers face in 
              maintaining healthy crops. Our mission is to democratize access to agricultural expertise, reduce 
              crop losses, and improve food security worldwide through technology.
            </p>
            <p className="text-green-600 mb-8">
              Simply take a photo of your plant, and our AI will analyze it instantly to provide detailed diagnosis, 
              treatment recommendations, and preventive measures tailored to your specific situation.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg border-2 border-green-200">
                <h3 className="text-xl font-bold text-green-800 mb-4">🎯 Our Mission</h3>
                <p className="text-green-700">
                  To empower farmers worldwide with AI-driven insights that protect crops, increase yields, 
                  and promote sustainable farming practices.
                </p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg border-2 border-green-200">
                <h3 className="text-xl font-bold text-green-800 mb-4">🔬 Our Technology</h3>
                <p className="text-green-700">
                  Advanced computer vision and machine learning models trained on millions of plant images 
                  to deliver industry-leading accuracy.
                </p>
              </div>
              <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg border-2 border-green-200">
                <h3 className="text-xl font-bold text-green-800 mb-4">🌍 Our Impact</h3>
                <p className="text-green-700">
                  Helping farmers across 156 countries reduce crop losses by an average of 25% and 
                  increase productivity sustainably.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section id="contact" className="mt-16 text-center">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-green-800 mb-6">Get in Touch</h2>
            <p className="text-lg text-green-700 mb-6">
              Have questions or need support? We're here to help farmers succeed. Our team of agricultural 
              experts and technical specialists are available 24/7 to assist you.
            </p>
            <div className="bg-white/80 backdrop-blur-sm p-6 rounded-lg border-2 border-green-200">
              <p className="text-green-800 font-semibold mb-4">Contact Information</p>
              <div className="space-y-2">
                <p className="text-green-600">📧 Email: seabatalebabo@gmail.com</p>
                <p className="text-green-600">📱 Phone: +916359289443</p>
                <p className="text-green-600">💬 WhatsApp: +916359289443</p>
                <p className="text-green-600">🌐 Website: www.cropguard-ai.com</p>
                <p className="text-green-600">📍 Location: Lesotho</p>
              </div>
              <div className="mt-6">
                <h4 className="font-semibold text-green-800 mb-2">Business Hours</h4>
                <p className="text-green-700 text-sm">
                  Monday - Friday: 8:00 AM - 6:00 PM (LST)<br />
                  Saturday - Sunday: 9:00 AM - 5:00 PM (LST)<br />
                  Emergency support available 24/7
                </p>
              </div>
              <div className="mt-6">
                <h4 className="font-semibold text-green-800 mb-2">Developer</h4>
                <p className="text-green-700 text-sm">
                  Seabata Enoch Lebabo<br />
                  Agricultural Technology Specialist<br />
                  AI & Machine Learning Engineer
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </div>
  );
};

export default Index;
