
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
import { Button } from '@/components/ui/button';
import { CheckSquare } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { cn } from '@/lib/utils';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

interface Request {
  id: string;
  title: string;
  location: string;
  requester: string;
  status: 'pending' | 'in_progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high';
  date: string;
  assignedTo?: string;
  description?: string;
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

const AssignedRequests = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const { toast } = useToast();
  const technicianName = "Tech Support"; // This would come from auth in a real app

  useEffect(() => {
    const storedRequests = localStorage.getItem('repairRequests');
    if (storedRequests) {
      const allRequests = JSON.parse(storedRequests);
      const assignedRequests = allRequests.filter(
        (req: Request) => req.assignedTo === technicianName && req.status === 'in_progress'
      );
      setRequests(assignedRequests);
    }
  }, []);

  const handleMarkComplete = (request: Request) => {
    const storedRequests = localStorage.getItem('repairRequests');
    if (storedRequests) {
      const allRequests = JSON.parse(storedRequests);
      const updatedRequests = allRequests.map((req: Request) => {
        if (req.id === request.id) {
          return {
            ...req,
            status: 'resolved' as const
          };
        }
        return req;
      });

      localStorage.setItem('repairRequests', JSON.stringify(updatedRequests));
      const assignedRequests = updatedRequests.filter(
        (req: Request) => req.assignedTo === technicianName && req.status === 'in_progress'
      );
      setRequests(assignedRequests);
      setSelectedRequest(null);

      toast({
        title: "Request Completed",
        description: `Request ${request.id} has been marked as resolved`,
      });
    }
  };

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">My Assigned Requests</h1>
        </div>

        <div className="border rounded-md">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Request</TableHead>
                <TableHead className="hidden md:table-cell">Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.length > 0 ? (
                requests.map((request) => (
                  <TableRow key={request.id}>
                    <TableCell className="font-medium">{request.id}</TableCell>
                    <TableCell>
                      <div className="font-medium">{request.title}</div>
                      <div className="text-sm text-muted-foreground md:hidden">
                        {request.location}
                      </div>
                    </TableCell>
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
                    <TableCell className="text-right">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => setSelectedRequest(request)}
                      >
                        <CheckSquare className="mr-2 h-4 w-4" />
                        Mark Complete
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8 text-muted-foreground">
                    No assigned requests found.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <AlertDialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
          <AlertDialogContent>
            <AlertDialogHeader>
              <AlertDialogTitle>Mark Request as Complete</AlertDialogTitle>
              <AlertDialogDescription>
                Are you sure you want to mark this request as complete? This action cannot be undone.
              </AlertDialogDescription>
            </AlertDialogHeader>
            <AlertDialogFooter>
              <AlertDialogCancel>Cancel</AlertDialogCancel>
              <AlertDialogAction onClick={() => selectedRequest && handleMarkComplete(selectedRequest)}>
                Confirm
              </AlertDialogAction>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialog>
      </div>
    </MainLayout>
  );
};

export default AssignedRequests;
