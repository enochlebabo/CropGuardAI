
import React from 'react';
import { Scan, BookOpen, History, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const FeatureCards = () => {
  const features = [
    {
      icon: Scan,
      title: "AI Disease Detection",
      description: "Advanced machine learning algorithms identify plant diseases with 95%+ accuracy",
      color: "bg-green-500"
    },
    {
      icon: BookOpen,
      title: "Disease Library",
      description: "Comprehensive database of plant diseases with detailed treatment guides",
      color: "bg-blue-500"
    },
    {
      icon: History,
      title: "Scan History",
      description: "Track your plants' health over time and monitor treatment progress",
      color: "bg-purple-500"
    },
    {
      icon: Users,
      title: "Expert Network",
      description: "Connect with agricultural experts and local farming communities",
      color: "bg-orange-500"
    }
  ];

  return (
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mt-16">
      {features.map((feature, index) => (
        <Card key={index} className="border-2 border-green-100 hover:border-green-200 transition-all duration-300 hover:shadow-lg bg-white/80 backdrop-blur-sm">
          <CardHeader className="text-center pb-2">
            <div className={`w-12 h-12 ${feature.color} rounded-full flex items-center justify-center mx-auto mb-3`}>
              <feature.icon className="h-6 w-6 text-white" />
            </div>
            <CardTitle className="text-lg text-green-800">{feature.title}</CardTitle>
          </CardHeader>
          <CardContent className="text-center">
            <p className="text-green-600 text-sm">{feature.description}</p>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
