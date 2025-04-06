
import React from 'react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Laptop, Printer, WifiIcon, Projector, HelpCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { cn } from '@/lib/utils';

export interface Asset {
  id: string;
  name: string;
  type: 'computer' | 'printer' | 'network' | 'projector' | 'other';
  status: 'operational' | 'maintenance' | 'broken';
  location: string;
  lastUpdated: string;
}

interface AssetCardProps {
  asset: Asset;
  className?: string;
}

export const AssetCard: React.FC<AssetCardProps> = ({ asset, className }) => {
  const getIcon = () => {
    switch (asset.type) {
      case 'computer':
        return <Laptop className="h-6 w-6" />;
      case 'printer':
        return <Printer className="h-6 w-6" />;
      case 'network':
        return <WifiIcon className="h-6 w-6" />;
      case 'projector':
        return <Projector className="h-6 w-6" />;
      default:
        return <HelpCircle className="h-6 w-6" />;
    }
  };

  const getStatusColor = () => {
    switch (asset.status) {
      case 'operational':
        return 'bg-green-100 text-green-800 hover:bg-green-200';
      case 'maintenance':
        return 'bg-yellow-100 text-yellow-800 hover:bg-yellow-200';
      case 'broken':
        return 'bg-red-100 text-red-800 hover:bg-red-200';
      default:
        return 'bg-gray-100 text-gray-800 hover:bg-gray-200';
    }
  };

  return (
    <Card className={cn("overflow-hidden", className)}>
      <CardContent className="p-6">
        <div className="flex justify-between">
          <div className="flex items-start gap-3">
            <div className="bg-primary/10 p-2 rounded-lg">
              {getIcon()}
            </div>
            <div>
              <h3 className="font-medium">{asset.name}</h3>
              <p className="text-sm text-muted-foreground">{asset.location}</p>
              <p className="text-xs text-muted-foreground mt-1">Last updated: {asset.lastUpdated}</p>
            </div>
          </div>
          <Badge variant="outline" className={cn("font-normal", getStatusColor())}>
            {asset.status.charAt(0).toUpperCase() + asset.status.slice(1)}
          </Badge>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between border-t p-4 bg-muted/30">
        <Button variant="outline" size="sm" asChild>
          <Link to={`/assets/${asset.id}`}>View Details</Link>
        </Button>
        <Button variant="outline" size="sm" asChild>
          <Link to={`/new-request?assetId=${asset.id}`}>Report Issue</Link>
        </Button>
      </CardFooter>
    </Card>
  );
};
