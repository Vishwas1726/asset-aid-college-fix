
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';
import { 
  LayoutDashboard, 
  PlusCircle, 
  ClipboardList, 
  Clock, 
  Settings, 
  X, 
  Laptop 
} from 'lucide-react';

interface SidebarProps {
  open: boolean;
}

interface NavItem {
  name: string;
  href: string;
  icon: React.FC<{ className?: string }>;
}

export const Sidebar: React.FC<SidebarProps> = ({ open }) => {
  const location = useLocation();
  
  const navigation: NavItem[] = [
    { name: 'Dashboard', href: '/', icon: LayoutDashboard },
    { name: 'New Request', href: '/new-request', icon: PlusCircle },
    { name: 'All Requests', href: '/requests', icon: ClipboardList },
    { name: 'Asset Inventory', href: '/assets', icon: Laptop },
    { name: 'History', href: '/history', icon: Clock },
    { name: 'Settings', href: '/settings', icon: Settings },
  ];

  return (
    <div className={cn(
      "fixed left-0 top-0 z-40 h-full w-64 bg-sidebar text-sidebar-foreground transition-transform duration-300 ease-in-out",
      open ? "translate-x-0" : "-translate-x-full md:translate-x-0 md:w-16"
    )}>
      <div className="flex flex-col h-full">
        <div className="flex items-center justify-between h-16 px-4 bg-sidebar border-b border-sidebar-border">
          <Link to="/" className="flex items-center space-x-2">
            <Laptop className="h-6 w-6 text-accent" />
            <span className={cn("font-bold text-xl", !open && "md:hidden")}>AssetAid</span>
          </Link>
        </div>
        
        <nav className="flex-1 px-2 py-4 space-y-1">
          {navigation.map((item) => {
            const isActive = location.pathname === item.href;
            return (
              <Link
                key={item.name}
                to={item.href}
                className={cn(
                  "flex items-center px-2 py-2 rounded-md transition-colors",
                  isActive 
                    ? "bg-primary/10 text-accent" 
                    : "text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-foreground"
                )}
              >
                <item.icon className={cn("h-5 w-5", isActive ? "text-accent" : "text-sidebar-foreground")} />
                <span className={cn("ml-3 truncate", !open && "md:hidden")}>
                  {item.name}
                </span>
              </Link>
            );
          })}
        </nav>
        
        <div className="p-4 border-t border-sidebar-border">
          <div className={cn("flex items-center", !open && "md:justify-center")}>
            <div className="flex-shrink-0">
              <span className="inline-block h-8 w-8 rounded-full bg-primary/20 text-primary-foreground">
                <span className="flex h-full w-full items-center justify-center font-medium">
                  IT
                </span>
              </span>
            </div>
            <div className={cn("ml-3", !open && "md:hidden")}>
              <p className="text-sm font-medium">Tech Support</p>
              <p className="text-xs text-sidebar-foreground/70">College IT</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
