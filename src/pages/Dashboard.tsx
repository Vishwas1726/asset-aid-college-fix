
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { RecentRequests } from '@/components/dashboard/RecentRequests';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  AlertCircle, 
  CheckCircle, 
  Clock,
  PlusCircle,
  AlertOctagon,
  Laptop
} from 'lucide-react';

const mockRequests = [
  {
    id: "1",
    title: "Broken monitor",
    location: "Computer Lab 3",
    status: "pending" as const,
    priority: "high" as const,
    date: "Today, 10:30 AM"
  },
  {
    id: "2",
    title: "Software installation",
    location: "Faculty Room",
    status: "in_progress" as const,
    priority: "medium" as const,
    date: "Yesterday"
  },
  {
    id: "3", 
    title: "Printer not working",
    location: "Library",
    status: "resolved" as const,
    priority: "medium" as const,
    date: "Apr 5, 2025"
  },
  {
    id: "4",
    title: "Network connectivity",
    location: "Admin Office",
    status: "in_progress" as const,
    priority: "high" as const,
    date: "Apr 4, 2025"
  },
  {
    id: "5",
    title: "Projector bulb replacement",
    location: "Lecture Hall 1",
    status: "pending" as const,
    priority: "low" as const,
    date: "Apr 3, 2025"
  }
];

const Dashboard: React.FC = () => {
  return (
    <MainLayout>
      <div className="grid gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-2xl font-bold">Dashboard</h1>
          <Link to="/new-request">
            <Button>
              <PlusCircle className="mr-2 h-4 w-4" />
              New Request
            </Button>
          </Link>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <StatCard 
            title="Total Assets" 
            value="352" 
            icon={<Laptop className="h-5 w-5 text-primary" />} 
            description="All registered IT assets"
          />
          <StatCard 
            title="Pending Requests" 
            value="24" 
            icon={<AlertCircle className="h-5 w-5 text-yellow-500" />} 
            trend={{ value: 12, isPositive: false }}
          />
          <StatCard 
            title="In Progress" 
            value="18" 
            icon={<Clock className="h-5 w-5 text-blue-500" />} 
          />
          <StatCard 
            title="Resolved" 
            value="156" 
            icon={<CheckCircle className="h-5 w-5 text-green-500" />} 
            trend={{ value: 8, isPositive: true }}
          />
        </div>
        
        <div className="grid gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <RecentRequests requests={mockRequests} />
          </div>
          
          <div>
            <div className="bg-red-50 border border-red-100 rounded-lg p-4 mb-6">
              <div className="flex items-start mb-2">
                <AlertOctagon className="h-5 w-5 text-red-500 mt-0.5 mr-2" />
                <h3 className="font-medium text-red-800">Critical Issues</h3>
              </div>
              <ul className="space-y-3">
                <li className="bg-white rounded border border-red-100 p-3 text-sm">
                  <div className="font-medium">Server Room AC Failure</div>
                  <div className="text-muted-foreground mt-1">Temperature rising in server room</div>
                </li>
                <li className="bg-white rounded border border-red-100 p-3 text-sm">
                  <div className="font-medium">Main Router Down</div>
                  <div className="text-muted-foreground mt-1">Affecting wing B connectivity</div>
                </li>
              </ul>
              <Button variant="outline" className="w-full mt-3" size="sm">View All Alerts</Button>
            </div>
            
            <div className="bg-blue-50 border border-blue-100 rounded-lg p-4">
              <h3 className="font-medium text-blue-800 mb-3">Quick Stats</h3>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Operational Assets</span>
                  <span className="font-medium">312 (89%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Maintenance</span>
                  <span className="font-medium">28 (8%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Out of Service</span>
                  <span className="font-medium">12 (3%)</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Avg Resolution Time</span>
                  <span className="font-medium">1.2 days</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Dashboard;
