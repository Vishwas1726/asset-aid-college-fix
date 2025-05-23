
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { sortRequestsByPriority } from '@/utils/requestUtils';
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
import { Input } from '@/components/ui/input';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Search, Filter, FileText, MapPin, Calendar, CheckCircle2 } from 'lucide-react';
import { useToast } from '@/components/ui/use-toast';
import { useRequests } from '@/hooks/useRequests';
import { Request, RequestStatus } from '@/types/requests';

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

const RequestsList: React.FC = () => {
  const [filter, setFilter] = useState<string>('all');
  const [search, setSearch] = useState<string>('');
  const [selectedRequest, setSelectedRequest] = useState<Request | null>(null);
  const { toast } = useToast();
  const { requests, isLoading, error, updateRequest } = useRequests();
  
  const handleAcceptRequest = async (request: Request) => {
    try {
      await updateRequest.mutateAsync({
        id: request.id,
        status: 'in_progress' as RequestStatus,
        assigned_to: 'Tech Support' // This should be the actual user ID in a real app
      });

      toast({
        title: "Request Accepted",
        description: `You have been assigned to request ${request.id}`,
      });
      
      setSelectedRequest(null);
    } catch (error) {
      console.error('Error accepting request:', error);
      toast({
        title: "Error",
        description: "Failed to accept request. Please try again.",
        variant: "destructive",
      });
    }
  };

  const filteredRequests = sortRequestsByPriority(
    requests.filter((request) => {
      const matchesSearch = 
        request.title.toLowerCase().includes(search.toLowerCase()) || 
        request.location.toLowerCase().includes(search.toLowerCase()) || 
        request.id.toLowerCase().includes(search.toLowerCase());
        
      const matchesFilter = filter === 'all' || request.status === filter;
      
      return matchesSearch && matchesFilter;
    })
  );

  if (isLoading) {
    return (
      <MainLayout>
        <div>Loading...</div>
      </MainLayout>
    );
  }

  if (error) {
    return (
      <MainLayout>
        <div>Error loading requests. Please try again later.</div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">All Repair Requests</h1>
          <Link to="/new-request">
            <Button>New Request</Button>
          </Link>
        </div>
        
        <div className="flex flex-col sm:flex-row gap-4 items-end">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search requests..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Filter className="h-4 w-4 text-muted-foreground" />
            <Select value={filter} onValueChange={setFilter}>
              <SelectTrigger className="w-full sm:w-[180px]">
                <SelectValue placeholder="Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Status</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="in_progress">In Progress</SelectItem>
                <SelectItem value="resolved">Resolved</SelectItem>
                <SelectItem value="closed">Closed</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
        
        <div className="border rounded-md overflow-hidden">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Request</TableHead>
                <TableHead className="hidden md:table-cell">User ID</TableHead>
                <TableHead className="hidden md:table-cell">Location</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead className="hidden sm:table-cell">Date</TableHead>
                <TableHead className="text-right">Actions</TableHead>
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
                        {request.location} • {request.user_id}
                      </div>
                    </TableCell>
                    <TableCell className="hidden md:table-cell">{request.user_id}</TableCell>
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
                    <TableCell className="hidden sm:table-cell text-muted-foreground">{request.created_at}</TableCell>
                    <TableCell className="text-right">
                      <Button 
                        variant="ghost" 
                        size="sm"
                        onClick={() => setSelectedRequest(request)}
                      >
                        View
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={8} className="text-center py-8 text-muted-foreground">
                    No requests found. Create a new request to get started.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>

        <Dialog open={!!selectedRequest} onOpenChange={() => setSelectedRequest(null)}>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Request Details</DialogTitle>
            </DialogHeader>
            {selectedRequest && (
              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Request ID:</span> {selectedRequest.id}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Location:</span> {selectedRequest.location}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="font-medium">Date:</span> {selectedRequest.created_at}
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <span className="font-medium">Status:</span>
                  <Badge variant="outline" className={cn('font-normal', statusConfig[selectedRequest.status].color)}>
                    {statusConfig[selectedRequest.status].label}
                  </Badge>
                </div>
                {selectedRequest.assigned_to && (
                  <div className="flex items-center gap-2 text-sm">
                    <span className="font-medium">Assigned To:</span> {selectedRequest.assigned_to}
                  </div>
                )}
                {selectedRequest.description && (
                  <div className="space-y-2">
                    <div className="font-medium text-sm">Description:</div>
                    <p className="text-sm text-muted-foreground">{selectedRequest.description}</p>
                  </div>
                )}
              </div>
            )}
            <DialogFooter className="mt-4">
              <Button
                onClick={() => handleAcceptRequest(selectedRequest!)}
                className="w-full sm:w-auto"
              >
                <CheckCircle2 className="mr-2 h-4 w-4" />
                Accept Request
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
    </MainLayout>
  );
};

export default RequestsList;
