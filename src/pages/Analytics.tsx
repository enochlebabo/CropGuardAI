
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { TrendingUp, Activity, AlertTriangle, CheckCircle } from 'lucide-react';
import { AppHeader } from '@/components/AppHeader';
import { Footer } from '@/components/Footer';

const Analytics = () => {
  const monthlyData = [
    { month: 'Jan', scans: 45, diseases: 8, healthy: 37 },
    { month: 'Feb', scans: 52, diseases: 12, healthy: 40 },
    { month: 'Mar', scans: 38, diseases: 6, healthy: 32 },
    { month: 'Apr', scans: 67, diseases: 15, healthy: 52 },
    { month: 'May', scans: 73, diseases: 18, healthy: 55 },
    { month: 'Jun', scans: 89, diseases: 22, healthy: 67 }
  ];

  const diseaseData = [
    { name: 'Fungal Infections', value: 35, color: '#ef4444' },
    { name: 'Bacterial Diseases', value: 25, color: '#f97316' },
    { name: 'Viral Infections', value: 20, color: '#eab308' },
    { name: 'Nutritional Deficiency', value: 15, color: '#22c55e' },
    { name: 'Other', value: 5, color: '#6b7280' }
  ];

  const cropData = [
    { crop: 'Tomatoes', scans: 89, health: 85 },
    { crop: 'Corn', scans: 76, health: 92 },
    { crop: 'Wheat', scans: 65, health: 78 },
    { crop: 'Soybeans', scans: 54, health: 88 },
    { crop: 'Potatoes', scans: 43, health: 82 }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-green-800 mb-4">
            📊 Farm Analytics
          </h1>
          <p className="text-xl text-green-700 mb-8 max-w-2xl mx-auto">
            Track your farm's health metrics, disease patterns, and improvement trends over time.
          </p>
        </div>

        {/* Key Metrics */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Scans This Month</CardTitle>
              <Activity className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">89</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+22%</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Disease Detection Rate</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24.7%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-red-600">+2.1%</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Healthy Plants</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">75.3%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+5.2%</span> from last month
              </p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Average Confidence</CardTitle>
              <TrendingUp className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">92.4%</div>
              <p className="text-xs text-muted-foreground">
                <span className="text-green-600">+1.3%</span> from last month
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Monthly Scan Trends</CardTitle>
              <CardDescription>Track your scanning activity and disease detection over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="scans" stroke="#22c55e" strokeWidth={2} />
                  <Line type="monotone" dataKey="diseases" stroke="#ef4444" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Disease Distribution</CardTitle>
              <CardDescription>Types of diseases detected in your crops</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={diseaseData}
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                  >
                    {diseaseData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle>Crop Health by Type</CardTitle>
              <CardDescription>Health scores for different crop varieties</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={cropData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="crop" />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="health" fill="#22c55e" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Insights & Recommendations</CardTitle>
              <CardDescription>AI-powered suggestions for your farm</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="p-4 bg-green-50 rounded-lg border-l-4 border-green-400">
                <h4 className="font-semibold text-green-800">🎯 Excellent Progress!</h4>
                <p className="text-green-700 text-sm">Your tomato health scores have improved by 15% this month.</p>
              </div>
              <div className="p-4 bg-yellow-50 rounded-lg border-l-4 border-yellow-400">
                <h4 className="font-semibold text-yellow-800">⚠️ Watch Out</h4>
                <p className="text-yellow-700 text-sm">Fungal infections are trending up. Consider preventive measures.</p>
              </div>
              <div className="p-4 bg-blue-50 rounded-lg border-l-4 border-blue-400">
                <h4 className="font-semibold text-blue-800">💡 Tip</h4>
                <p className="text-blue-700 text-sm">Increase scanning frequency during humid weather for better detection.</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Analytics;
