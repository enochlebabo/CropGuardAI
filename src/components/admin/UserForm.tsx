
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { User, NewUser } from '@/types/admin';

interface UserFormProps {
  user: User | NewUser | null;
  isNew?: boolean;
  onUserChange: (user: User | NewUser) => void;
}

export const UserForm: React.FC<UserFormProps> = ({ user, isNew = false, onUserChange }) => {
  const handleChange = (field: keyof (User | NewUser), value: string) => {
    onUserChange({ ...user, [field]: value });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Name</Label>
        <Input
          value={user?.name || ''}
          onChange={(e) => handleChange('name', e.target.value)}
          placeholder="Full name"
        />
      </div>
      <div className="space-y-2">
        <Label>Email</Label>
        <Input
          value={user?.email || ''}
          onChange={(e) => handleChange('email', e.target.value)}
          placeholder="Email address"
        />
      </div>
      <div className="space-y-2">
        <Label>Farm Size</Label>
        <Input
          value={user?.farmSize || ''}
          onChange={(e) => handleChange('farmSize', e.target.value)}
          placeholder="Farm size"
        />
      </div>
      <div className="space-y-2">
        <Label>Location</Label>
        <Input
          value={user?.location || ''}
          onChange={(e) => handleChange('location', e.target.value)}
          placeholder="Location"
        />
      </div>
      {!isNew && (
        <div className="space-y-2">
          <Label>Status</Label>
          <Select
            value={user?.status || 'active'}
            onValueChange={(value) => handleChange('status', value)}
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
};
