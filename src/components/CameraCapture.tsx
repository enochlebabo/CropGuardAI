
import React, { useState, useRef, useCallback } from 'react';
import { Camera, CameraOff, Upload, Scan, CheckCircle, AlertTriangle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { AnalysisResults } from '@/components/AnalysisResults';

export const CameraCapture = () => {
  const [isCapturing, setIsCapturing] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisComplete, setAnalysisComplete] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { toast } = useToast();

  const startCamera = useCallback(async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setIsCapturing(true);
      }
    } catch (error) {
      console.error('Error accessing camera:', error);
      toast({
        title: "Camera Access Error",
        description: "Unable to access camera. Please check permissions or upload an image instead.",
        variant: "destructive",
      });
    }
  }, [toast]);

  const stopCamera = useCallback(() => {
    if (videoRef.current?.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setIsCapturing(false);
  }, []);

  const capturePhoto = useCallback(() => {
    if (videoRef.current && canvasRef.current) {
      const canvas = canvasRef.current;
      const video = videoRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      ctx?.drawImage(video, 0, 0);
      
      const imageDataUrl = canvas.toDataURL('image/jpeg');
      setCapturedImage(imageDataUrl);
      stopCamera();
    }
  }, [stopCamera]);

  const handleFileUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const analyzeImage = useCallback(async () => {
    setIsAnalyzing(true);
    setAnalysisComplete(false);
    
    // Simulate AI analysis
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setIsAnalyzing(false);
    setAnalysisComplete(true);
    
    toast({
      title: "Analysis Complete",
      description: "Your plant has been analyzed successfully!",
    });
  }, [toast]);

  const resetCapture = useCallback(() => {
    setCapturedImage(null);
    setAnalysisComplete(false);
    setIsAnalyzing(false);
  }, []);

  if (analysisComplete && capturedImage) {
    return <AnalysisResults image={capturedImage} onReset={resetCapture} />;
  }

  return (
    <div className="max-w-2xl mx-auto mb-12">
      <Card className="border-2 border-green-200 shadow-xl bg-white/95 backdrop-blur-sm">
        <CardContent className="p-8">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-bold text-green-800 mb-2">
              📸 Capture Plant Image
            </h2>
            <p className="text-green-600">
              Take a clear photo of the affected plant for AI analysis
            </p>
          </div>

          {!capturedImage && !isCapturing && (
            <div className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Button 
                  onClick={startCamera}
                  className="h-20 bg-green-600 hover:bg-green-700 text-white font-semibold text-lg"
                  size="lg"
                >
                  <Camera className="mr-3 h-6 w-6" />
                  Open Camera
                </Button>
                
                <Button 
                  onClick={() => fileInputRef.current?.click()}
                  variant="outline"
                  className="h-20 border-2 border-green-300 text-green-700 hover:bg-green-50 font-semibold text-lg"
                  size="lg"
                >
                  <Upload className="mr-3 h-6 w-6" />
                  Upload Image
                </Button>
              </div>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          )}

          {isCapturing && (
            <div className="space-y-4">
              <div className="relative bg-black rounded-lg overflow-hidden">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full h-64 object-cover"
                />
                <div className="absolute inset-0 border-4 border-green-400 opacity-50 rounded-lg"></div>
              </div>
              
              <div className="flex justify-center space-x-4">
                <Button 
                  onClick={capturePhoto}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3"
                >
                  <Camera className="mr-2 h-5 w-5" />
                  Capture Photo
                </Button>
                
                <Button 
                  onClick={stopCamera}
                  variant="outline"
                  className="border-red-300 text-red-600 hover:bg-red-50 px-8 py-3"
                >
                  <CameraOff className="mr-2 h-5 w-5" />
                  Cancel
                </Button>
              </div>
            </div>
          )}

          {capturedImage && !isAnalyzing && (
            <div className="space-y-6">
              <div className="relative">
                <img 
                  src={capturedImage} 
                  alt="Captured plant" 
                  className="w-full h-64 object-cover rounded-lg border-2 border-green-200"
                />
                <div className="absolute top-2 right-2 bg-green-500 text-white p-2 rounded-full">
                  <CheckCircle className="h-5 w-5" />
                </div>
              </div>
              
              <div className="flex justify-center space-x-4">
                <Button 
                  onClick={analyzeImage}
                  className="bg-green-600 hover:bg-green-700 text-white px-8 py-3 text-lg"
                  size="lg"
                >
                  <Scan className="mr-2 h-5 w-5" />
                  Analyze Plant
                </Button>
                
                <Button 
                  onClick={resetCapture}
                  variant="outline"
                  className="border-gray-300 text-gray-600 hover:bg-gray-50 px-8 py-3"
                >
                  Retake Photo
                </Button>
              </div>
            </div>
          )}

          {isAnalyzing && (
            <div className="text-center space-y-4">
              <div className="relative">
                <img 
                  src={capturedImage!} 
                  alt="Analyzing..." 
                  className="w-full h-64 object-cover rounded-lg border-2 border-green-200 opacity-75"
                />
                <div className="absolute inset-0 bg-green-600/20 rounded-lg flex items-center justify-center">
                  <div className="bg-white/95 p-6 rounded-lg shadow-lg">
                    <div className="animate-spin h-8 w-8 border-4 border-green-600 border-t-transparent rounded-full mx-auto mb-3"></div>
                    <p className="text-green-800 font-semibold">Analyzing plant health...</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          <canvas ref={canvasRef} className="hidden" />
        </CardContent>
      </Card>
    </div>
  );
};
