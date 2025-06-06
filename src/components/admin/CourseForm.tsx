
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Course, NewCourse } from '@/types/admin';

interface CourseFormProps {
  course: Course | NewCourse | null;
  isNew?: boolean;
  onCourseChange: (course: Course | NewCourse) => void;
}

export const CourseForm: React.FC<CourseFormProps> = ({ course, isNew = false, onCourseChange }) => {
  const handleChange = (field: keyof (Course | NewCourse), value: string) => {
    onCourseChange({ ...course, [field]: value });
  };

  return (
    <div className="space-y-4">
      <div className="space-y-2">
        <Label>Title</Label>
        <Input
          value={course?.title || ''}
          onChange={(e) => handleChange('title', e.target.value)}
          placeholder="Course title"
        />
      </div>
      <div className="space-y-2">
        <Label>Description</Label>
        <Textarea
          value={course?.description || ''}
          onChange={(e) => handleChange('description', e.target.value)}
          placeholder="Course description"
        />
      </div>
      <div className="space-y-2">
        <Label>YouTube Playlist URL</Label>
        <Input
          value={course?.youtubePlaylistUrl || ''}
          onChange={(e) => handleChange('youtubePlaylistUrl', e.target.value)}
          placeholder="https://www.youtube.com/playlist?list=..."
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label>Duration</Label>
          <Input
            value={course?.duration || ''}
            onChange={(e) => handleChange('duration', e.target.value)}
            placeholder="e.g., 2 hours"
          />
        </div>
        <div className="space-y-2">
          <Label>Difficulty</Label>
          <Select
            value={course?.difficulty || 'Beginner'}
            onValueChange={(value) => handleChange('difficulty', value)}
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
};
