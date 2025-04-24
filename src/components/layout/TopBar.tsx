import React from 'react';
import { Bell, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { Badge } from '@/components/ui/badge';

interface TopBarProps {
  toggleSidebar: () => void;
  sidebarOpen: boolean;
}

export const TopBar: React.FC<TopBarProps> = ({ toggleSidebar, sidebarOpen }) => {
  return (
    <div className="sticky top-0 z-30 flex h-16 items-center bg-background border-b border-border px-4">
      <Button 
        variant="ghost" 
        size="icon"
        onClick={toggleSidebar}
        className="mr-2 md:hidden"
      >
        <Menu className="h-5 w-5" />
        <span className="sr-only">Toggle sidebar</span>
      </Button>
      
      <div className="flex-1">
        <h1 className="text-lg font-semibold md:text-xl">College Asset Management</h1>
      </div>
      
      <div className="flex items-center gap-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" className="relative">
              <Bell className="h-5 w-5" />
              <Badge className="absolute -top-1 -right-1 h-5 w-5 p-0 flex items-center justify-center">3</Badge>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <div className="p-2 font-medium">Notifications</div>
            <DropdownMenuItem className="p-3 cursor-pointer">
              <div className="flex flex-col gap-1">
                <p className="font-medium">New repair request</p>
                <p className="text-sm text-muted-foreground">Computer Lab 3, PC #12 has a broken monitor</p>
                <p className="text-xs text-muted-foreground">2 minutes ago</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-3 cursor-pointer">
              <div className="flex flex-col gap-1">
                <p className="font-medium">Request assigned</p>
                <p className="text-sm text-muted-foreground">You were assigned to fix printer in Library</p>
                <p className="text-xs text-muted-foreground">1 hour ago</p>
              </div>
            </DropdownMenuItem>
            <DropdownMenuItem className="p-3 cursor-pointer">
              <div className="flex flex-col gap-1">
                <p className="font-medium">Request completed</p>
                <p className="text-sm text-muted-foreground">Admin Office PC repair marked as completed</p>
                <p className="text-xs text-muted-foreground">Yesterday</p>
              </div>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
};
