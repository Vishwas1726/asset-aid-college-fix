
import React, { useState, useEffect } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';
import { Search } from 'lucide-react';

interface HistoryRequest {
  id: string;
  title: string;
  location: string;
  requester: string;
  status: 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  date: string;
  assignedTo?: string;
}

const statusConfig = {
  resolved: { label: 'Resolved', color: 'bg-green-100 text-green-800 hover:bg-green-200' },
  closed: { label: 'Closed', color: 'bg-gray-100 text-gray-800 hover:bg-gray-200' },
};

const priorityConfig = {
  low: { label: 'Low', color: 'bg-green-100 text-green-800' },
  medium: { label: 'Medium', color: 'bg-yellow-100 text-yellow-800' },
  high: { label: 'High', color: 'bg-red-100 text-red-800' },
};

const History: React.FC = () => {
  const [completedRequests, setCompletedRequests] = useState<HistoryRequest[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    const storedRequests = localStorage.getItem('repairRequests');
    if (storedRequests) {
      const allRequests = JSON.parse(storedRequests);
      const completed = allRequests.filter(
        (req: HistoryRequest) => req.status === 'resolved' || req.status === 'closed'
      );
      setCompletedRequests(completed);
    }
  }, []);

  const filteredRequests = completedRequests.filter((request) =>
    request.title.toLowerCase().includes(search.toLowerCase()) ||
    request.location.toLowerCase().includes(search.toLowerCase()) ||
    request.requester.toLowerCase().includes(search.toLowerCase()) ||
    request.id.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Request History</h1>
        </div>

        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
          <Input
            placeholder="Search history..."
            className="pl-8"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Request</TableHead>
                <TableHead className="hidden md:table-cell">Requester</TableHead>
                <TableHead className="hidden md:table-cell">Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead className="hidden md:table-cell">Completed By</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredRequests.length > 0 ? (
                filteredRequests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell>
                      <div className="font-medium">{request.title}</div>
                      <div className="text-sm text-muted-foreground md:hidden">
                        {request.location} • {request.requester}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{request.requester}</TableCell>
                    <TableCell className="hidden md:table-cell">{request.location}</TableCell>
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
                    <TableCell className="hidden sm:table-cell text-muted-foreground">{request.date}</TableCell>
                    <TableCell className="hidden md:table-cell">{request.assignedTo || '-'}</TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No completed requests found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      </div>
    </MainLayout>
  );
};

export default History;
