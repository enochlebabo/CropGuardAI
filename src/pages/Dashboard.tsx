
import React from 'react';
import { Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Camera, BookOpen, Users, TrendingUp, AlertTriangle, CheckCircle } from 'lucide-react';
import { AppHeader } from '@/components/AppHeader';
import { Footer } from '@/components/Footer';

const Dashboard = () => {
  const userEmail = localStorage.getItem('userEmail') || 'farmer@example.com';
  const recentScans = [
    { id: 1, plant: 'Tomato', status: 'Healthy', date: '2024-05-26', confidence: 95 },
    { id: 2, plant: 'Wheat', status: 'Disease Detected', date: '2024-05-25', confidence: 87 },
    { id: 3, plant: 'Corn', status: 'Healthy', date: '2024-05-24', confidence: 92 },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-100">
      <AppHeader />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-green-800 mb-2">
            Welcome back, {userEmail.split('@')[0]}! 🌾
          </h1>
          <p className="text-green-700">Monitor your crops and access educational resources.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total Scans</CardTitle>
              <Camera className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">247</div>
              <p className="text-xs text-muted-foreground">+12% from last month</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Healthy Plants</CardTitle>
              <CheckCircle className="h-4 w-4 text-green-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">189</div>
              <p className="text-xs text-muted-foreground">76% success rate</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Issues Detected</CardTitle>
              <AlertTriangle className="h-4 w-4 text-orange-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">58</div>
              <p className="text-xs text-muted-foreground">Early intervention saved crops</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Lessons Completed</CardTitle>
              <BookOpen className="h-4 w-4 text-blue-600" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">32</div>
              <p className="text-xs text-muted-foreground">Keep learning!</p>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <Card>
            <CardHeader>
              <CardTitle>Quick Actions</CardTitle>
              <CardDescription>Start analyzing your crops or explore features</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <Link to="/">
                <Button className="w-full justify-start bg-green-600 hover:bg-green-700">
                  <Camera className="mr-2 h-4 w-4" />
                  Scan New Plant
                </Button>
              </Link>
              <Link to="/learn">
                <Button variant="outline" className="w-full justify-start">
                  <BookOpen className="mr-2 h-4 w-4" />
                  Browse Learning Center
                </Button>
              </Link>
              <Link to="/community">
                <Button variant="outline" className="w-full justify-start">
                  <Users className="mr-2 h-4 w-4" />
                  Join Community
                </Button>
              </Link>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Recent Scans</CardTitle>
              <CardDescription>Your latest plant health analyses</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {recentScans.map((scan) => (
                  <div key={scan.id} className="flex items-center justify-between border-b pb-2">
                    <div>
                      <p className="font-medium">{scan.plant}</p>
                      <p className="text-sm text-gray-600">{scan.date}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                        scan.status === 'Healthy' 
                          ? 'bg-green-100 text-green-800' 
                          : 'bg-orange-100 text-orange-800'
                      }`}>
                        {scan.status}
                      </span>
                      <p className="text-xs text-gray-500 mt-1">{scan.confidence}% confidence</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Dashboard;
