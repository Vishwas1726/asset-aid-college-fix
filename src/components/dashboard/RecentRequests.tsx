
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Link } from 'react-router-dom';

interface Request {
  id: string;
  title: string;
  location: string;
  status: 'pending' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  date: string;
}

const statusConfig = {
  pending: { label: 'Pending', color: 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200' },
  in_progress: { label: 'In Progress', color: 'bg-blue-100 text-blue-800 hover:bg-blue-200' },
  resolved: { label: 'Resolved', color: 'bg-green-100 text-green-800 hover:bg-green-200' },
  closed: { label: 'Closed', color: 'bg-gray-100 text-gray-800 hover:bg-gray-200' },
};

const priorityConfig = {
  low: { label: 'Low', color: 'bg-green-100 text-green-800' },
  medium: { label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  high: { label: 'High', color: 'bg-red-100 text-red-800' },
};

interface RecentRequestsProps {
  requests: Request[];
}

export const RecentRequests: React.FC<RecentRequestsProps> = ({ requests }) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Recent Requests</CardTitle>
        <Link to="/requests">
          <Button variant="ghost" size="sm">View All</Button>
        </Link>
      </CardHeader>
      <CardContent>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Request</TableHead>
                <TableHead>Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.title}</TableCell>
                  <TableCell>{request.location}</TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn('font-normal', statusConfig[request.status].color)}>
                      {statusConfig[request.status].label}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline" className={cn('font-normal', priorityConfig[request.priority].color)}>
                      {priorityConfig[request.priority].label}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-muted-foreground">{request.date}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};
