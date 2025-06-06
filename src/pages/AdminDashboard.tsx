
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Shield, Users, BarChart3, Settings, LogOut, BookOpen, Database } from 'lucide-react';
import { toast } from 'sonner';
import { User, Course, Analytic, NewUser, NewCourse, NewAnalytic } from '@/types/admin';
import { UserManagement } from '@/components/admin/UserManagement';
import { CourseManagement } from '@/components/admin/CourseManagement';
import { AnalyticsManagement } from '@/components/admin/AnalyticsManagement';
import { AdminOverview } from '@/components/admin/AdminOverview';
import { AdminSettings } from '@/components/admin/AdminSettings';
import { AdminModal } from '@/components/admin/AdminModal';
import { UserForm } from '@/components/admin/UserForm';
import { CourseForm } from '@/components/admin/CourseForm';
import { AnalyticsForm } from '@/components/admin/AnalyticsForm';

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

  const [editingUser, setEditingUser] = useState<User | null>(null);
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [editingAnalytic, setEditingAnalytic] = useState<Analytic | null>(null);
  const [newUser, setNewUser] = useState<NewUser>({});
  const [newCourse, setNewCourse] = useState<NewCourse>({});
  const [newAnalytic, setNewAnalytic] = useState<NewAnalytic>({});
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingType, setEditingType] = useState<'user' | 'course' | 'analytic' | ''>('');

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

  const handleDeleteUser = (id: number) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      setUsers(users.filter(user => user.id !== id));
      toast.success('User deleted successfully');
    }
  };

  const handleDeleteCourse = (id: number) => {
    if (window.confirm('Are you sure you want to delete this course?')) {
      setCourses(courses.filter(course => course.id !== id));
      toast.success('Course deleted successfully');
    }
  };

  const handleDeleteAnalytic = (id: number) => {
    if (window.confirm('Are you sure you want to delete this analytic?')) {
      setAnalytics(analytics.filter(analytic => analytic.id !== id));
      toast.success('Analytic deleted successfully');
    }
  };

  const handleEditUser = (user: User) => {
    setEditingUser({ ...user });
    setEditingType('user');
  };

  const handleEditCourse = (course: Course) => {
    setEditingCourse({ ...course });
    setEditingType('course');
  };

  const handleEditAnalytic = (analytic: Analytic) => {
    setEditingAnalytic({ ...analytic });
    setEditingType('analytic');
  };

  const handleAddUser = () => {
    setShowAddForm(true);
    setEditingType('user');
    setNewUser({});
  };

  const handleAddCourse = () => {
    setShowAddForm(true);
    setEditingType('course');
    setNewCourse({});
  };

  const handleAddAnalytic = () => {
    setShowAddForm(true);
    setEditingType('analytic');
    setNewAnalytic({});
  };

  const handleSave = () => {
    if (editingType === 'user' && editingUser) {
      setUsers(users.map(user => user.id === editingUser.id ? editingUser : user));
      setEditingUser(null);
    } else if (editingType === 'course' && editingCourse) {
      setCourses(courses.map(course => course.id === editingCourse.id ? editingCourse : course));
      setEditingCourse(null);
    } else if (editingType === 'analytic' && editingAnalytic) {
      setAnalytics(analytics.map(analytic => analytic.id === editingAnalytic.id ? editingAnalytic : analytic));
      setEditingAnalytic(null);
    }
    setEditingType('');
    toast.success(`${editingType.charAt(0).toUpperCase() + editingType.slice(1)} updated successfully`);
  };

  const handleAdd = () => {
    const id = Date.now();
    
    if (editingType === 'user' && newUser.name && newUser.email && newUser.farmSize && newUser.location) {
      const newUserComplete: User = {
        id,
        name: newUser.name,
        email: newUser.email,
        farmSize: newUser.farmSize,
        location: newUser.location,
        status: 'active'
      };
      setUsers([...users, newUserComplete]);
      setNewUser({});
    } else if (editingType === 'course' && newCourse.title && newCourse.description && newCourse.duration && newCourse.difficulty) {
      const newCourseComplete: Course = {
        id,
        title: newCourse.title,
        description: newCourse.description,
        duration: newCourse.duration,
        difficulty: newCourse.difficulty
      };
      setCourses([...courses, newCourseComplete]);
      setNewCourse({});
    } else if (editingType === 'analytic' && newAnalytic.metric && newAnalytic.value !== undefined && newAnalytic.period && newAnalytic.trend) {
      const newAnalyticComplete: Analytic = {
        id,
        metric: newAnalytic.metric,
        value: newAnalytic.value,
        period: newAnalytic.period,
        trend: newAnalytic.trend
      };
      setAnalytics([...analytics, newAnalyticComplete]);
      setNewAnalytic({});
    }
    
    setShowAddForm(false);
    setEditingType('');
    toast.success(`${editingType.charAt(0).toUpperCase() + editingType.slice(1)} added successfully`);
  };

  const handleCancel = () => {
    setEditingUser(null);
    setEditingCourse(null);
    setEditingAnalytic(null);
    setNewUser({});
    setNewCourse({});
    setNewAnalytic({});
    setShowAddForm(false);
    setEditingType('');
  };

  const tabs = [
    { id: 'overview', label: 'Overview', icon: BarChart3 },
    { id: 'users', label: 'Users', icon: Users },
    { id: 'courses', label: 'Courses', icon: BookOpen },
    { id: 'analytics', label: 'Analytics', icon: Database },
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

        {/* Tab Content */}
        {activeTab === 'overview' && <AdminOverview users={users} courses={courses} />}
        {activeTab === 'users' && (
          <UserManagement 
            users={users} 
            onEdit={handleEditUser} 
            onDelete={handleDeleteUser} 
            onAdd={handleAddUser} 
          />
        )}
        {activeTab === 'courses' && (
          <CourseManagement 
            courses={courses} 
            onEdit={handleEditCourse} 
            onDelete={handleDeleteCourse} 
            onAdd={handleAddCourse} 
          />
        )}
        {activeTab === 'analytics' && (
          <AnalyticsManagement 
            analytics={analytics} 
            onEdit={handleEditAnalytic} 
            onDelete={handleDeleteAnalytic} 
            onAdd={handleAddAnalytic} 
          />
        )}
        {activeTab === 'settings' && <AdminSettings />}
      </div>

      {/* Edit Modal */}
      <AdminModal
        isOpen={!!(editingUser || editingCourse || editingAnalytic)}
        title={`Edit ${editingType.charAt(0).toUpperCase() + editingType.slice(1)}`}
        onSave={handleSave}
        onCancel={handleCancel}
      >
        {editingType === 'user' && (
          <UserForm user={editingUser} onUserChange={setEditingUser} />
        )}
        {editingType === 'course' && (
          <CourseForm course={editingCourse} onCourseChange={setEditingCourse} />
        )}
        {editingType === 'analytic' && (
          <AnalyticsForm analytic={editingAnalytic} onAnalyticChange={setEditingAnalytic} />
        )}
      </AdminModal>

      {/* Add Modal */}
      <AdminModal
        isOpen={showAddForm}
        title={`Add New ${editingType.charAt(0).toUpperCase() + editingType.slice(1)}`}
        onSave={handleAdd}
        onCancel={handleCancel}
      >
        {editingType === 'user' && (
          <UserForm user={newUser} isNew onUserChange={setNewUser} />
        )}
        {editingType === 'course' && (
          <CourseForm course={newCourse} isNew onCourseChange={setNewCourse} />
        )}
        {editingType === 'analytic' && (
          <AnalyticsForm analytic={newAnalytic} isNew onAnalyticChange={setNewAnalytic} />
        )}
      </AdminModal>
    </div>
  );
};

export default AdminDashboard;
