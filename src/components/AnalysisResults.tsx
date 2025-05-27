
import React from 'react';
import { AlertTriangle, CheckCircle, Droplets, Sun, Thermometer, ArrowLeft } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';

interface AnalysisResultsProps {
  image: string;
  onReset: () => void;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ image, onReset }) => {
  // Simulated analysis results
  const diseaseDetected = {
    name: "Early Blight",
    confidence: 92,
    severity: "Moderate",
    description: "A common fungal disease that affects tomato and potato plants, causing dark spots on leaves."
  };

  const treatments = [
    {
      type: "Immediate Action",
      action: "Remove affected leaves",
      description: "Carefully remove and dispose of infected leaves to prevent spread",
      urgency: "high"
    },
    {
      type: "Fungicide Treatment",
      action: "Apply copper-based fungicide",
      description: "Spray every 7-10 days during dry weather conditions",
      urgency: "medium"
    },
    {
      type: "Prevention",
      action: "Improve air circulation",
      description: "Space plants properly and prune lower branches for better airflow",
      urgency: "low"
    }
  ];

  const environmentalTips = [
    { icon: Droplets, label: "Watering", advice: "Water at soil level, avoid wetting leaves" },
    { icon: Sun, label: "Sunlight", advice: "Ensure 6-8 hours of direct sunlight daily" },
    { icon: Thermometer, label: "Temperature", advice: "Maintain 65-75°F for optimal growth" }
  ];

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Header with image and basic results */}
      <Card className="border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl text-orange-800 flex items-center">
              <AlertTriangle className="mr-3 h-6 w-6" />
              Disease Detected
            </CardTitle>
            <Button onClick={onReset} variant="outline" className="flex items-center">
              <ArrowLeft className="mr-2 h-4 w-4" />
              New Scan
            </Button>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <img 
                src={image} 
                alt="Analyzed plant" 
                className="w-full h-64 object-cover rounded-lg border-2 border-orange-200"
              />
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-orange-800 mb-2">{diseaseDetected.name}</h3>
                <div className="flex items-center space-x-2 mb-3">
                  <Badge variant="destructive" className="bg-orange-500">
                    {diseaseDetected.confidence}% Confidence
                  </Badge>
                  <Badge variant="outline" className="border-orange-300 text-orange-700">
                    {diseaseDetected.severity} Severity
                  </Badge>
                </div>
                <p className="text-orange-700">{diseaseDetected.description}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Treatment Recommendations */}
      <Card className="border-2 border-green-200">
        <CardHeader>
          <CardTitle className="text-xl text-green-800 flex items-center">
            <CheckCircle className="mr-3 h-5 w-5" />
            Treatment Recommendations
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {treatments.map((treatment, index) => (
              <div 
                key={index}
                className={`p-4 rounded-lg border-l-4 ${
                  treatment.urgency === 'high' ? 'border-red-500 bg-red-50' :
                  treatment.urgency === 'medium' ? 'border-yellow-500 bg-yellow-50' :
                  'border-blue-500 bg-blue-50'
                }`}
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center space-x-2 mb-2">
                      <Badge 
                        variant="outline" 
                        className={
                          treatment.urgency === 'high' ? 'border-red-300 text-red-700' :
                          treatment.urgency === 'medium' ? 'border-yellow-300 text-yellow-700' :
                          'border-blue-300 text-blue-700'
                        }
                      >
                        {treatment.type}
                      </Badge>
                    </div>
                    <h4 className="font-semibold text-gray-800 mb-1">{treatment.action}</h4>
                    <p className="text-gray-600 text-sm">{treatment.description}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Environmental Care Tips */}
      <Card className="border-2 border-blue-200">
        <CardHeader>
          <CardTitle className="text-xl text-blue-800">Environmental Care Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            {environmentalTips.map((tip, index) => (
              <div key={index} className="bg-blue-50 p-4 rounded-lg text-center">
                <tip.icon className="h-8 w-8 text-blue-600 mx-auto mb-2" />
                <h4 className="font-semibold text-blue-800 mb-1">{tip.label}</h4>
                <p className="text-blue-600 text-sm">{tip.advice}</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="border-2 border-green-200 bg-green-50">
        <CardContent className="p-6 text-center">
          <h3 className="text-lg font-semibold text-green-800 mb-2">
            Need Expert Help?
          </h3>
          <p className="text-green-600 mb-4">
            Connect with agricultural experts or save this analysis for future reference
          </p>
          <div className="flex justify-center space-x-4">
            <Button className="bg-green-600 hover:bg-green-700">
              Save Analysis
            </Button>
            <Button variant="outline" className="border-green-300 text-green-700">
              Contact Expert
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
