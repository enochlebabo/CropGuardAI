
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Save, Plus, Trash2, Edit3 } from 'lucide-react';

interface Course {
  id: number;
  title: string;
  description: string;
  duration: string;
  lessons: number;
  rating: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced';
  category: string;
  image: string;
}

interface CourseEditorProps {
  courses: Course[];
  onSaveCourse: (course: Course) => void;
  onDeleteCourse: (id: number) => void;
}

export const CourseEditor: React.FC<CourseEditorProps> = ({ courses, onSaveCourse, onDeleteCourse }) => {
  const [editingCourse, setEditingCourse] = useState<Course | null>(null);
  const [isCreating, setIsCreating] = useState(false);
  const [formData, setFormData] = useState<Partial<Course>>({
    title: '',
    description: '',
    duration: '',
    lessons: 0,
    rating: 4.5,
    level: 'Beginner',
    category: 'basics',
    image: '📚'
  });

  const handleInputChange = (field: keyof Course, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (formData.title && formData.description) {
      const courseToSave: Course = {
        id: editingCourse?.id || Date.now(),
        title: formData.title || '',
        description: formData.description || '',
        duration: formData.duration || '',
        lessons: formData.lessons || 0,
        rating: formData.rating || 4.5,
        level: formData.level || 'Beginner',
        category: formData.category || 'basics',
        image: formData.image || '📚'
      };
      
      onSaveCourse(courseToSave);
      setEditingCourse(null);
      setIsCreating(false);
      setFormData({
        title: '',
        description: '',
        duration: '',
        lessons: 0,
        rating: 4.5,
        level: 'Beginner',
        category: 'basics',
        image: '📚'
      });
    }
  };

  const handleEdit = (course: Course) => {
    setEditingCourse(course);
    setFormData(course);
    setIsCreating(false);
  };

  const handleCreate = () => {
    setIsCreating(true);
    setEditingCourse(null);
    setFormData({
      title: '',
      description: '',
      duration: '',
      lessons: 0,
      rating: 4.5,
      level: 'Beginner',
      category: 'basics',
      image: '📚'
    });
  };

  const handleCancel = () => {
    setEditingCourse(null);
    setIsCreating(false);
    setFormData({
      title: '',
      description: '',
      duration: '',
      lessons: 0,
      rating: 4.5,
      level: 'Beginner',
      category: 'basics',
      image: '📚'
    });
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-green-800">Course Management</h2>
        <Button onClick={handleCreate} className="bg-green-600 hover:bg-green-700">
          <Plus className="h-4 w-4 mr-2" />
          Create New Course
        </Button>
      </div>

      {(isCreating || editingCourse) && (
        <Card className="border-2 border-green-200">
          <CardHeader>
            <CardTitle>{isCreating ? 'Create New Course' : 'Edit Course'}</CardTitle>
            <CardDescription>
              {isCreating ? 'Fill in the details to create a new course' : 'Update the course information'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">Course Title</Label>
                <Input
                  id="title"
                  value={formData.title || ''}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="Enter course title"
                />
              </div>
              <div>
                <Label htmlFor="image">Course Emoji</Label>
                <Input
                  id="image"
                  value={formData.image || ''}
                  onChange={(e) => handleInputChange('image', e.target.value)}
                  placeholder="📚"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={formData.description || ''}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="Enter course description"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="youtubeUrl">YouTube Playlist URL</Label>
              <Input
                id="youtubeUrl"
                value={formData.youtubePlaylistUrl || ''}
                onChange={(e) => handleInputChange('youtubePlaylistUrl', e.target.value)}
                placeholder="https://www.youtube.com/playlist?list=..."
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              <div>
                <Label htmlFor="duration">Duration</Label>
                <Input
                  id="duration"
                  value={formData.duration || ''}
                  onChange={(e) => handleInputChange('duration', e.target.value)}
                  placeholder="2 hours"
                />
              </div>
              <div>
                <Label htmlFor="lessons">Number of Lessons</Label>
                <Input
                  id="lessons"
                  type="number"
                  value={formData.lessons || ''}
                  onChange={(e) => handleInputChange('lessons', parseInt(e.target.value))}
                  placeholder="8"
                />
              </div>
              <div>
                <Label htmlFor="rating">Rating</Label>
                <Input
                  id="rating"
                  type="number"
                  step="0.1"
                  min="0"
                  max="5"
                  value={formData.rating || ''}
                  onChange={(e) => handleInputChange('rating', parseFloat(e.target.value))}
                  placeholder="4.5"
                />
              </div>
              <div>
                <Label htmlFor="level">Level</Label>
                <select
                  id="level"
                  value={formData.level || 'Beginner'}
                  onChange={(e) => handleInputChange('level', e.target.value)}
                  className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                </select>
              </div>
            </div>

            <div>
              <Label htmlFor="category">Category</Label>
              <select
                id="category"
                value={formData.category || 'basics'}
                onChange={(e) => handleInputChange('category', e.target.value)}
                className="w-full h-10 px-3 py-2 border border-input bg-background rounded-md text-sm"
              >
                <option value="basics">Farming Basics</option>
                <option value="diseases">Disease Management</option>
                <option value="organic">Organic Farming</option>
                <option value="technology">AgTech</option>
              </select>
            </div>

            <div className="flex gap-2">
              <Button onClick={handleSave} className="bg-green-600 hover:bg-green-700">
                <Save className="h-4 w-4 mr-2" />
                Save Course
              </Button>
              <Button variant="outline" onClick={handleCancel}>
                Cancel
              </Button>
            </div>
          </CardContent>
        </Card>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {courses.map((course) => (
          <Card key={course.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="text-4xl mb-2">{course.image}</div>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => handleEdit(course)}
                  >
                    <Edit3 className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => onDeleteCourse(course.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <CardTitle className="text-lg">{course.title}</CardTitle>
              <CardDescription>{course.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>Duration: {course.duration}</span>
                  <span>{course.lessons} lessons</span>
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-center">
                    <span className="text-sm font-medium">Rating: {course.rating}</span>
                  </div>
                  <Badge
                    variant={
                      course.level === 'Beginner' ? 'default' :
                      course.level === 'Intermediate' ? 'secondary' : 'destructive'
                    }
                  >
                    {course.level}
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
