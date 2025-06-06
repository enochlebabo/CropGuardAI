
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export const AdminSettings: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      <Card>
        <CardHeader>
          <CardTitle>System Settings</CardTitle>
          <CardDescription>Configure application settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="maxUpload">Max Upload Size (MB)</Label>
            <Input id="maxUpload" defaultValue="10" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="analysisTimeout">Analysis Timeout (seconds)</Label>
            <Input id="analysisTimeout" defaultValue="30" />
          </div>
          <Button className="bg-red-600 hover:bg-red-700">Save Settings</Button>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>API Configuration</CardTitle>
          <CardDescription>Manage external API settings</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="chatgptKey">ChatGPT API Key</Label>
            <Input id="chatgptKey" type="password" placeholder="sk-..." />
          </div>
          <div className="space-y-2">
            <Label htmlFor="deepseekKey">DeepSeek API Key</Label>
            <Input id="deepseekKey" type="password" placeholder="dk-..." />
          </div>
          <Button className="bg-red-600 hover:bg-red-700">Update APIs</Button>
        </CardContent>
      </Card>
    </div>
  );
};
