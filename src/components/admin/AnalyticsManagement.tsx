
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Edit, Trash2, Plus } from 'lucide-react';
import { Analytic } from '@/types/admin';

interface AnalyticsManagementProps {
  analytics: Analytic[];
  onEdit: (analytic: Analytic) => void;
  onDelete: (id: number) => void;
  onAdd: () => void;
}

export const AnalyticsManagement: React.FC<AnalyticsManagementProps> = ({ analytics, onEdit, onDelete, onAdd }) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Analytics Management</CardTitle>
            <CardDescription>Manage system metrics and analytics data</CardDescription>
          </div>
          <Button className="bg-red-600 hover:bg-red-700" onClick={onAdd}>
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
                    <Button size="sm" variant="outline" onClick={() => onEdit(analytic)}>
                      <Edit className="h-3 w-3" />
                    </Button>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => onDelete(analytic.id)}
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
  );
};
