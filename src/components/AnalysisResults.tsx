
import React from 'react';
import { AlertTriangle, CheckCircle, Droplets, Sun, Thermometer, ArrowLeft, Leaf, Search, Shield } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { generateComprehensiveAnalysis } from '@/utils/botanicalAnalysis';

interface AnalysisResultsProps {
  image: string;
  onReset: () => void;
}

export const AnalysisResults: React.FC<AnalysisResultsProps> = ({ image, onReset }) => {
  const analysis = generateComprehensiveAnalysis();

  const environmentalTips = [
    { icon: Droplets, label: "Watering", advice: "Water at soil level, avoid wetting leaves" },
    { icon: Sun, label: "Sunlight", advice: "Ensure 6-8 hours of direct sunlight daily" },
    { icon: Thermometer, label: "Temperature", advice: "Maintain optimal temperature range for species" }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      {/* Plant Identification Header */}
      <Card className="border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardHeader>
          <div className="flex items-center justify-between">
            <CardTitle className="text-2xl text-blue-800 flex items-center">
              <Search className="mr-3 h-6 w-6" />
              Plant Identification
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
                className="w-full h-64 object-cover rounded-lg border-2 border-blue-200"
              />
            </div>
            <div className="space-y-4">
              <div>
                <h3 className="text-xl font-bold text-blue-800 mb-2">{analysis.plantIdentification.commonName}</h3>
                <p className="text-sm text-blue-600 italic mb-3">{analysis.plantIdentification.species}</p>
                <div className="flex items-center space-x-2 mb-3">
                  <Badge variant="default" className="bg-blue-500">
                    {analysis.plantIdentification.confidence}% Confidence
                  </Badge>
                  <Badge variant="outline" className="border-blue-300 text-blue-700 capitalize">
                    {analysis.plantIdentification.plantType}
                  </Badge>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Leaf Analysis */}
      <Card className="border-2 border-green-200">
        <CardHeader>
          <CardTitle className="text-xl text-green-800 flex items-center">
            <Leaf className="mr-3 h-5 w-5" />
            Detailed Leaf Analysis
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="space-y-3">
              <div className="bg-green-50 p-3 rounded-lg">
                <h4 className="font-semibold text-green-800 mb-1">Leaf Characteristics</h4>
                <div className="space-y-1 text-sm">
                  <p><span className="font-medium">Shape:</span> {analysis.leafAnalysis.leafShape}</p>
                  <p><span className="font-medium">Color:</span> {analysis.leafAnalysis.leafColor}</p>
                  <p><span className="font-medium">Size:</span> {analysis.leafAnalysis.leafSize}</p>
                  <p><span className="font-medium">Texture:</span> {analysis.leafAnalysis.leafTexture}</p>
                </div>
              </div>
            </div>
            <div className="space-y-3">
              <div className="bg-yellow-50 p-3 rounded-lg">
                <h4 className="font-semibold text-yellow-800 mb-2">Observed Abnormalities</h4>
                <div className="space-y-1">
                  {analysis.leafAnalysis.abnormalities.map((abnormality, index) => (
                    <div key={index} className="flex items-center text-sm text-yellow-700">
                      <AlertTriangle className="h-3 w-3 mr-2" />
                      {abnormality}
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Disease Detection */}
      <Card className="border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-red-50">
        <CardHeader>
          <CardTitle className="text-xl text-orange-800 flex items-center">
            <AlertTriangle className="mr-3 h-5 w-5" />
            Disease Detection & Symptoms
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="bg-white/70 p-4 rounded-lg border border-orange-200">
              <h3 className="text-lg font-bold text-orange-800 mb-2">{analysis.diseaseDetected.name}</h3>
              <div className="flex items-center space-x-2 mb-3">
                <Badge variant="destructive" className="bg-orange-500">
                  {analysis.diseaseDetected.confidence}% Confidence
                </Badge>
                <Badge variant="outline" className="border-orange-300 text-orange-700">
                  {analysis.diseaseDetected.severity} Severity
                </Badge>
              </div>
              <p className="text-orange-700 mb-2">{analysis.diseaseDetected.description}</p>
              <p className="text-sm text-orange-600">
                <span className="font-medium">Causative Agent:</span> {analysis.diseaseDetected.causativeAgent}
              </p>
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              {analysis.symptoms.map((symptom, index) => (
                <div 
                  key={index}
                  className={`p-3 rounded-lg border-l-4 ${
                    symptom.severity === 'severe' ? 'border-red-500 bg-red-50' :
                    symptom.severity === 'moderate' ? 'border-yellow-500 bg-yellow-50' :
                    'border-blue-500 bg-blue-50'
                  }`}
                >
                  <h4 className="font-semibold text-gray-800 mb-1">{symptom.symptomType}</h4>
                  <p className="text-sm text-gray-600 mb-1">{symptom.description}</p>
                  <p className="text-xs text-gray-500">
                    <span className="font-medium">Affected:</span> {symptom.affectedArea}
                  </p>
                </div>
              ))}
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
            {analysis.treatments.map((treatment, index) => (
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
                      <Badge variant="secondary" className="text-xs">
                        {treatment.timing}
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

      {/* Prevention Measures */}
      <Card className="border-2 border-purple-200">
        <CardHeader>
          <CardTitle className="text-xl text-purple-800 flex items-center">
            <Shield className="mr-3 h-5 w-5" />
            Prevention Measures
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-2 gap-3">
            {analysis.preventiveMeasures.map((measure, index) => (
              <div key={index} className="bg-purple-50 p-3 rounded-lg border border-purple-200">
                <div className="flex items-start">
                  <CheckCircle className="h-4 w-4 text-purple-600 mr-2 mt-0.5 flex-shrink-0" />
                  <p className="text-sm text-purple-700">{measure}</p>
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
            Connect with agricultural experts or save this comprehensive analysis for future reference
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
