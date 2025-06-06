
import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Analytic, NewAnalytic } from '@/types/admin';

interface AnalyticsFormProps {
  analytic: Analytic | NewAnalytic | null;
  isNew?: boolean;
  onAnalyticChange: (analytic: Analytic | NewAnalytic) => void;
}

export const AnalyticsForm: React.FC<AnalyticsFormProps> = ({ analytic, isNew = false, onAnalyticChange }) => {
  const handleChange = (field: keyof (Analytic | NewAnalytic), value: string | number) => {
    onAnalyticChange({ ...analytic, [field]: value });
  };

  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="space-y-2">
        <Label>Metric Name</Label>
        <Input
          value={analytic?.metric || ''}
          onChange={(e) => handleChange('metric', e.target.value)}
          placeholder="Metric name"
        />
      </div>
      <div className="space-y-2">
        <Label>Value</Label>
        <Input
          type="number"
          value={analytic?.value || ''}
          onChange={(e) => handleChange('value', parseInt(e.target.value) || 0)}
          placeholder="Value"
        />
      </div>
      <div className="space-y-2">
        <Label>Period</Label>
        <Input
          value={analytic?.period || ''}
          onChange={(e) => handleChange('period', e.target.value)}
          placeholder="e.g., This Month"
        />
      </div>
      <div className="space-y-2">
        <Label>Trend</Label>
        <Input
          value={analytic?.trend || ''}
          onChange={(e) => handleChange('trend', e.target.value)}
          placeholder="e.g., +12%"
        />
      </div>
    </div>
  );
};
