
import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { AssetCard, Asset } from '@/components/assets/AssetCard';
import { Input } from '@/components/ui/input';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { Search, Filter } from 'lucide-react';

const mockAssets: Asset[] = [
  {
    id: "PC-LAB1-01",
    name: "Lab Desktop PC",
    type: "computer",
    status: "operational",
    location: "Computer Lab 1",
    lastUpdated: "Apr 5, 2025"
  },
  {
    id: "PC-LAB1-02",
    name: "Lab Desktop PC",
    type: "computer",
    status: "maintenance",
    location: "Computer Lab 1",
    lastUpdated: "Apr 4, 2025"
  },
  {
    id: "PRINTER-LIB-01",
    name: "HP LaserJet",
    type: "printer",
    status: "operational",
    location: "Library",
    lastUpdated: "Apr 3, 2025"
  },
  {
    id: "PROJ-LH1-01",
    name: "Epson Projector",
    type: "projector",
    status: "broken",
    location: "Lecture Hall 1",
    lastUpdated: "Apr 2, 2025"
  },
  {
    id: "PC-ADMIN-01",
    name: "Admin Desktop PC",
    type: "computer",
    status: "operational",
    location: "Admin Office",
    lastUpdated: "Apr 2, 2025"
  },
  {
    id: "ROUTER-B1-01",
    name: "Cisco Router",
    type: "network",
    status: "operational",
    location: "Building 1, Floor 1",
    lastUpdated: "Apr 1, 2025"
  },
  {
    id: "PC-LAB2-01",
    name: "Lab Desktop PC",
    type: "computer",
    status: "operational",
    location: "Computer Lab 2",
    lastUpdated: "Apr 1, 2025"
  },
  {
    id: "PRINTER-ADMIN-01",
    name: "Canon Multifunction",
    type: "printer",
    status: "maintenance",
    location: "Admin Office",
    lastUpdated: "Mar 30, 2025"
  },
  {
    id: "PC-FACULTY-01",
    name: "Faculty Laptop",
    type: "computer",
    status: "operational",
    location: "Faculty Room",
    lastUpdated: "Mar 29, 2025"
  },
  {
    id: "PROJ-LH2-01",
    name: "Epson Projector",
    type: "projector",
    status: "operational",
    location: "Lecture Hall 2",
    lastUpdated: "Mar 28, 2025"
  },
  {
    id: "SWITCH-B2-01",
    name: "Cisco Switch",
    type: "network",
    status: "operational",
    location: "Building 2, Floor 1",
    lastUpdated: "Mar 27, 2025"
  },
  {
    id: "PC-LAB3-01",
    name: "Lab Desktop PC",
    type: "computer",
    status: "broken",
    location: "Computer Lab 3",
    lastUpdated: "Mar 26, 2025"
  }
];

const AssetList: React.FC = () => {
  const [search, setSearch] = useState<string>('');
  const [typeFilter, setTypeFilter] = useState<string>('all');
  const [statusFilter, setStatusFilter] = useState<string>('all');

  const filteredAssets = mockAssets.filter((asset) => {
    const matchesSearch = 
      asset.name.toLowerCase().includes(search.toLowerCase()) || 
      asset.location.toLowerCase().includes(search.toLowerCase()) || 
      asset.id.toLowerCase().includes(search.toLowerCase());
      
    const matchesType = typeFilter === 'all' || asset.type === typeFilter;
    const matchesStatus = statusFilter === 'all' || asset.status === statusFilter;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  return (
    <MainLayout>
      <div className="space-y-6">
        <h1 className="text-2xl font-bold">Asset Inventory</h1>
        
        <div className="flex flex-col md:flex-row gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Search assets..."
              className="pl-8"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          <div className="flex flex-col sm:flex-row items-end gap-4">
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Asset Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="computer">Computers</SelectItem>
                  <SelectItem value="printer">Printers</SelectItem>
                  <SelectItem value="projector">Projectors</SelectItem>
                  <SelectItem value="network">Network</SelectItem>
                  <SelectItem value="other">Other</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex items-center gap-2 w-full sm:w-auto">
              <Filter className="h-4 w-4 text-muted-foreground" />
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger className="w-full sm:w-[180px]">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="operational">Operational</SelectItem>
                  <SelectItem value="maintenance">Maintenance</SelectItem>
                  <SelectItem value="broken">Broken</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredAssets.map((asset) => (
            <AssetCard key={asset.id} asset={asset} />
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default AssetList;
