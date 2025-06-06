
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface AdminModalProps {
  isOpen: boolean;
  title: string;
  children: React.ReactNode;
  onSave: () => void;
  onCancel: () => void;
}

export const AdminModal: React.FC<AdminModalProps> = ({ isOpen, title, children, onSave, onCancel }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {children}
          <div className="flex space-x-2 pt-4">
            <Button onClick={onSave} className="bg-red-600 hover:bg-red-700">
              Save Changes
            </Button>
            <Button variant="outline" onClick={onCancel}>
              Cancel
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
