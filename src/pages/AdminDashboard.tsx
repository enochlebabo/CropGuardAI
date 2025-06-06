import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Shield, Users, BarChart3, Settings, Edit, Trash2, Plus, LogOut, Leaf, BookOpen, MessageSquare, Database } from 'lucide-react';
import { toast } from 'sonner';

// Define types for better TypeScript support
type User = {
  id: number;
  name: string;
  email: string;
  farmSize: string;
  location: string;
  status: string;
};

type Course = {
  id: number;
  title: string;
  description: string;
  duration: string;
  difficulty: string;
};

type Analytic = {
  id: number;
  metric: string;
  value: number;
  period: string;
  trend: string;
};

const AdminDashboard = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('overview');
  const [users, setUsers] = useState<User[]>([
    { id: 1, name: 'John Farmer', email: 'john@farm.com', farmSize: '50 acres', location: 'California', status: 'active' },
    { id: 2, name: 'Sarah Green', email: 'sarah@green.com', farmSize: '25 acres', location: 'Texas', status: 'active' },
    { id: 3, name: 'Mike Plant', email: 'mike@plant.com', farmSize: '100 acres', location: 'Iowa', status: 'inactive' },
  ]);

  const [courses, setCourses] = useState<Course[]>([
    { id: 1, title: 'Plant Disease Identification', description: 'Learn to identify common plant diseases', duration: '2 hours', difficulty: 'Beginner' },
    { id: 2, title: 'Sustainable Farming Practices', description: 'Advanced techniques for sustainable agriculture', duration: '4 hours', difficulty: 'Advanced' },
    { id: 3, title: 'Crop Rotation Strategies', description: 'Maximize yield with proper crop rotation', duration: '3 hours', difficulty: 'Intermediate' },
  ]);

  const [analytics, setAnalytics] = useState<Analytic[]>([
    { id: 1, metric: 'Total Scans', value: 1234, period: 'This Month', trend: '+12%' },
    { id: 2, metric: 'Active Users', value: 456, period: 'This Month', trend: '+8%' },
    { id: 3, metric: 'Disease Detections', value: 89, period: 'This Month', trend: '+15%' },
  ]);

  const [editingItem, setEditingItem] = useState<User | Course | Analytic | null>(null);
  const [editingType, setEditingType] = useState<'user' | 'course' | 'analytic' | ''>('');
  const [newItem, setNewItem] = useState<Partial<User & Course & Analytic>>({});
  const [showAddForm, setShowAddForm] = useState(false);

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

  const handleDelete = (id: number, type: string) => {
    if (window.confirm(`Are you sure you want to delete this ${type}?`)) {
      switch (type) {
        case 'user':
          setUsers(users.filter(user => user.id !== id));
          break;
        case 'course':
          setCourses(courses.filter(course => course.id !== id));
          break;
        case 'analytic':
          setAnalytics(analytics.filter(analytic => analytic.id !== id));
          break;
      }
      toast.success(`${type.charAt(0).toUpperCase() + type.slice(1)} deleted successfully`);
    }
  };

  const handleEdit = (item: User | Course | Analytic, type: 'user' | 'course' | 'analytic') => {
    setEditingItem({ ...item });
    setEditingType(type);
  };

  const handleSave = () => {
    if (editingItem && editingType) {
      switch (editingType) {
        case 'user':
          setUsers(users.map(user => 
            user.id === editingItem.id ? editingItem as User : user
          ));
          break;
        case 'course':
          setCourses(courses.map(course => 
            course.id === editingItem.id ? editingItem as Course : course
          ));
          break;
        case 'analytic':
          setAnalytics(analytics.map(analytic => 
            analytic.id === editingItem.id ? editingItem as Analytic : analytic
          ));
          break;
      }
      setEditingItem(null);
      setEditingType('');
      toast.success(`${editingType.charAt(0).toUpperCase() + editingType.slice(1)} updated successfully`);
    }
  };

  const handleAdd = () => {
    const id = Date.now(); // Simple ID generation
    
    switch (editingType) {
      case 'user':
        if (newItem.name && newItem.email && newItem.farmSize && newItem.location) {
          const newUser: User = {
            id,
            name: newItem.name,
            email: newItem.email,
            farmSize: newItem.farmSize,
            location: newItem.location,
            status: 'active'
          };
          setUsers([...users, newUser]);
        }
        break;
      case 'course':
        if (newItem.title && newItem.description && newItem.duration && newItem.difficulty) {
          const newCourse: Course = {
            id,
            title: newItem.title,
            description: newItem.description,
            duration: newItem.duration,
            difficulty: newItem.difficulty
          };
          setCourses([...courses, newCourse]);
        }
        break;
      case 'analytic':
        if (newItem.metric && newItem.value !== undefined && newItem.period && newItem.trend) {
          const newAnalytic: Analytic = {
            id,
            metric: newItem.metric,
            value: newItem.value,
            period: newItem.period,
            trend: newItem.trend
          };
          setAnalytics([...analytics, newAnalytic]);
        }
        break;
    }
    
    setNewItem({});
    setShowAddForm(false);
    setEditingType('');
    toast.success(`${editingType.charAt(0).toUpperCase() + editingType.slice(1)} added successfully`);
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: Database },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  const renderUserForm = (item: Partial<User> | null, isNew = false) => (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Name</Label>
        <Input
          value={item?.name || ''}
          onChange={(e) => isNew ? setNewItem({...newItem, name: e.target.value}) : setEditingItem({...editingItem as User, name: e.target.value})}
          placeholder="Full name"
        />
      </div>
      <div className="space-y-2">
        <Label>Email</Label>
        <Input
          value={item?.email || ''}
          onChange={(e) => isNew ? setNewItem({...newItem, email: e.target.value}) : setEditingItem({...editingItem as User, email: e.target.value})}
          placeholder="Email address"
        />
      </div>
      <div className="space-y-2">
        <Label>Farm Size</Label>
        <Input
          value={item?.farmSize || ''}
          onChange={(e) => isNew ? setNewItem({...newItem, farmSize: e.target.value}) : setEditingItem({...editingItem as User, farmSize: e.target.value})}
          placeholder="Farm size"
        />
      </div>
      <div className="space-y-2">
        <Label>Location</Label>
        <Input
          value={item?.location || ''}
          onChange={(e) => isNew ? setNewItem({...newItem, location: e.target.value}) : setEditingItem({...editingItem as User, location: e.target.value})}
          placeholder="Location"
        />
      </div>
      {!isNew && (
        <div className="space-y-2">
          <Label>Status</Label>
          <Select
            value={item?.status || 'active'}
            onValueChange={(value) => setEditingItem({...editingItem as User, status: value})}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="active">Active</SelectItem>
              <SelectItem value="inactive">Inactive</SelectItem>
              <SelectItem value="suspended">Suspended</SelectItem>
            </SelectContent>
          </Select>
        </div>
      )}
    </div>
  );

  const renderCourseForm = (item: Partial<Course> | null, isNew = false) => (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Title</Label>
        <Input
          value={item?.title || ''}
          onChange={(e) => isNew ? setNewItem({...newItem, title: e.target.value}) : setEditingItem({...editingItem as Course, title: e.target.value})}
          placeholder="Course title"
        />
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          value={item?.description || ''}
          onChange={(e) => isNew ? setNewItem({...newItem, description: e.target.value}) : setEditingItem({...editingItem as Course, description: e.target.value})}
          placeholder="Course description"
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Duration</Label>
          <Input
            value={item?.duration || ''}
            onChange={(e) => isNew ? setNewItem({...newItem, duration: e.target.value}) : setEditingItem({...editingItem as Course, duration: e.target.value})}
            placeholder="e.g., 2 hours"
          />
        </div>
        <div className="space-y-2">
          <Label>Difficulty</Label>
          <Select
            value={item?.difficulty || 'Beginner'}
            onValueChange={(value) => isNew ? setNewItem({...newItem, difficulty: value}) : setEditingItem({...editingItem as Course, difficulty: value})}
          >
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Beginner">Beginner</SelectItem>
              <SelectItem value="Intermediate">Intermediate</SelectItem>
              <SelectItem value="Advanced">Advanced</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );

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
                <p className="text-sm text-gray-600">Full CRUD Management Dashboard</p>
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
                <CardTitle className="text-sm font-medium">Total Courses</CardTitle>
                <BookOpen className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{courses.length}</div>
                <p className="text-xs text-muted-foreground">Learning modules</p>
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
                  <CardDescription>Create, read, update, and delete user accounts</CardDescription>
                </div>
                <Button 
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => {
                    setShowAddForm(true);
                    setEditingType('user');
                    setNewItem({});
                  }}
                >
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
                    <TableHead>Status</TableHead>
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
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          user.status === 'active' ? 'bg-green-100 text-green-800' : 
                          user.status === 'inactive' ? 'bg-gray-100 text-gray-800' : 
                          'bg-red-100 text-red-800'
                        }`}>
                          {user.status}
                        </span>
                      </TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(user, 'user')}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(user.id, 'user')}
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

        {/* Courses Tab */}
        {activeTab === 'courses' && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Course Management</CardTitle>
                  <CardDescription>Manage educational content and learning modules</CardDescription>
                </div>
                <Button 
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => {
                    setShowAddForm(true);
                    setEditingType('course');
                    setNewItem({});
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Course
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Title</TableHead>
                    <TableHead>Description</TableHead>
                    <TableHead>Duration</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses.map((course) => (
                    <TableRow key={course.id}>
                      <TableCell className="font-medium">{course.title}</TableCell>
                      <TableCell className="max-w-xs truncate">{course.description}</TableCell>
                      <TableCell>{course.duration}</TableCell>
                      <TableCell>{course.difficulty}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(course, 'course')}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(course.id, 'course')}
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

        {/* Analytics Tab */}
        {activeTab === 'analytics' && (
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Analytics Management</CardTitle>
                  <CardDescription>Manage system metrics and analytics data</CardDescription>
                </div>
                <Button 
                  className="bg-red-600 hover:bg-red-700"
                  onClick={() => {
                    setShowAddForm(true);
                    setEditingType('analytic');
                    setNewItem({});
                  }}
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add Metric
                </Button>
              </div>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Metric</TableHead>
                    <TableHead>Value</TableHead>
                    <TableHead>Period</TableHead>
                    <TableHead>Trend</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {analytics.map((analytic) => (
                    <TableRow key={analytic.id}>
                      <TableCell className="font-medium">{analytic.metric}</TableCell>
                      <TableCell>{analytic.value.toLocaleString()}</TableCell>
                      <TableCell>{analytic.period}</TableCell>
                      <TableCell className="text-green-600">{analytic.trend}</TableCell>
                      <TableCell>
                        <div className="flex space-x-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleEdit(analytic, 'analytic')}
                          >
                            <Edit className="h-3 w-3" />
                          </Button>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => handleDelete(analytic.id, 'analytic')}
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

      {/* Edit Modal */}
      {editingItem && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Edit {editingType.charAt(0).toUpperCase() + editingType.slice(1)}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {editingType === 'user' && renderUserForm(editingItem as User)}
              {editingType === 'course' && renderCourseForm(editingItem as Course)}
              {editingType === 'analytic' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Metric Name</Label>
                    <Input
                      value={(editingItem as Analytic).metric || ''}
                      onChange={(e) => setEditingItem({...editingItem as Analytic, metric: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Value</Label>
                    <Input
                      type="number"
                      value={(editingItem as Analytic).value || ''}
                      onChange={(e) => setEditingItem({...editingItem as Analytic, value: parseInt(e.target.value)})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Period</Label>
                    <Input
                      value={(editingItem as Analytic).period || ''}
                      onChange={(e) => setEditingItem({...editingItem as Analytic, period: e.target.value})}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Trend</Label>
                    <Input
                      value={(editingItem as Analytic).trend || ''}
                      onChange={(e) => setEditingItem({...editingItem as Analytic, trend: e.target.value})}
                    />
                  </div>
                </div>
              )}
              <div className="flex space-x-2 pt-4">
                <Button onClick={handleSave} className="bg-red-600 hover:bg-red-700">
                  Save Changes
                </Button>
                <Button variant="outline" onClick={() => setEditingItem(null)}>
                  Cancel
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Add Modal */}
      {showAddForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <CardHeader>
              <CardTitle>Add New {editingType.charAt(0).toUpperCase() + editingType.slice(1)}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {editingType === 'user' && renderUserForm(newItem, true)}
              {editingType === 'course' && renderCourseForm(newItem, true)}
              {editingType === 'analytic' && (
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label>Metric Name</Label>
                    <Input
                      value={newItem.metric || ''}
                      onChange={(e) => setNewItem({...newItem, metric: e.target.value})}
                      placeholder="Metric name"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Value</Label>
                    <Input
                      type="number"
                      value={newItem.value || ''}
                      onChange={(e) => setNewItem({...newItem, value: parseInt(e.target.value)})}
                      placeholder="Value"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Period</Label>
                    <Input
                      value={newItem.period || ''}
                      onChange={(e) => setNewItem({...newItem, period: e.target.value})}
                      placeholder="e.g., This Month"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Trend</Label>
                    <Input
                      value={newItem.trend || ''}
                      onChange={(e) => setNewItem({...newItem, trend: e.target.value})}
                      placeholder="e.g., +12%"
                    />
                  </div>
                </div>
              )}
              <div className="flex space-x-2 pt-4">
                <Button onClick={handleAdd} className="bg-red-600 hover:bg-red-700">
                  Add {editingType.charAt(0).toUpperCase() + editingType.slice(1)}
                </Button>
                <Button variant="outline" onClick={() => {
                  setShowAddForm(false);
                  setNewItem({});
                  setEditingType('');
                }}>
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
