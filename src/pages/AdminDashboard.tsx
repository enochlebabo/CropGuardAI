
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Shield, Users, BarChart3, Settings, Edit, Trash2, Plus, LogOut, Leaf } from 'lucide-react';
import { toast } from 'sonner';

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState([
    { id: 1, name: 'John Farmer', email: 'john@farm.com', farmSize: '50 acres', location: 'California' },
    { id: 2, name: 'Sarah Green', email: 'sarah@green.com', farmSize: '25 acres', location: 'Texas' },
    { id: 3, name: 'Mike Plant', email: 'mike@plant.com', farmSize: '100 acres', location: 'Iowa' },
  ]);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const isAdminLoggedIn = localStorage.getItem('isAdminLoggedIn');
    if (!isAdminLoggedIn) {
      navigate('/admin/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('isAdminLoggedIn');
    localStorage.removeItem('adminEmail');
    toast.success('Admin logged out successfully');
    navigate('/');
  };

  const handleDeleteUser = (userId: number) => {
    setUsers(users.filter(user => user.id !== userId));
    toast.success('User deleted successfully');
  };

  const handleEditUser = (user: any) => {
    setEditingUser(user);
  };

  const saveUserEdit = () => {
    if (editingUser) {
      setUsers(users.map(user => 
        user.id === editingUser.id ? editingUser : user
      ));
      setEditingUser(null);
      toast.success('User updated successfully');
    }
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Admin Header */}
      <header className="bg-white shadow-sm border-b border-red-200">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="bg-red-600 p-2 rounded-lg">
                <Shield className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-2xl font-bold text-red-800">CropGuard AI Admin</h1>
                <p className="text-sm text-gray-600">Administrative Dashboard</p>
              </div>
            </div>
            <Button 
              onClick={handleLogout}
              variant="outline" 
              className="border-red-600 text-red-600 hover:bg-red-600 hover:text-white"
            >
              <LogOut className="h-4 w-4 mr-2" />
              Logout
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-8 bg-white p-1 rounded-lg shadow-sm">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center space-x-2 px-4 py-2 rounded-md transition-colors ${
                activeTab === tab.id
                  ? 'bg-red-600 text-white'
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <tab.icon className="h-4 w-4" />
              <span>{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Overview Tab */}
        {activeTab === 'overview' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Users</CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{users.length}</div>
                <p className="text-xs text-muted-foreground">Active farmers</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Farm Area</CardTitle>
                <Leaf className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">175</div>
                <p className="text-xs text-muted-foreground">Acres under protection</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Plant Scans</CardTitle>
                <BarChart3 className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">1,234</div>
                <p className="text-xs text-muted-foreground">This month</p>
              </CardContent>
            </Card>
          </div>
        )}

        {/* Users Tab */}
        {activeTab === 'users' && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>User Management</CardTitle>
                  <CardDescription>Manage registered farmers and their information</CardDescription>
                </div>
                <Button className="bg-red-600 hover:bg-red-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Add User
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Farm Size</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {users.map((user) => (
                    <TableRow key={user.id}>
                      <TableCell className="font-medium">{user.name}</TableCell>
                      <TableCell>{user.email}</TableCell>
                      <TableCell>{user.farmSize}</TableCell>
                      <TableCell>{user.location}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEditUser(user)}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDeleteUser(user.id)}
                            className="text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-3 w-3" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}

        {/* Settings Tab */}
        {activeTab === 'settings' && (
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
        )}
      </div>

      {/* Edit User Modal */}
      {editingUser && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-md">
            <CardHeader>
              <CardTitle>Edit User</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="editName">Name</Label>
                <Input
                  id="editName"
                  value={editingUser.name}
                  onChange={(e) => setEditingUser({...editingUser, name: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editEmail">Email</Label>
                <Input
                  id="editEmail"
                  value={editingUser.email}
                  onChange={(e) => setEditingUser({...editingUser, email: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editFarmSize">Farm Size</Label>
                <Input
                  id="editFarmSize"
                  value={editingUser.farmSize}
                  onChange={(e) => setEditingUser({...editingUser, farmSize: e.target.value})}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="editLocation">Location</Label>
                <Input
                  id="editLocation"
                  value={editingUser.location}
                  onChange={(e) => setEditingUser({...editingUser, location: e.target.value})}
                />
              </div>
              <div className="flex space-x-2">
                <Button onClick={saveUserEdit} className="bg-red-600 hover:bg-red-700">
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setEditingUser(null)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;
