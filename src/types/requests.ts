
export type RequestStatus = 'pending' | 'in_progress' | 'resolved' | 'closed';
export type RequestPriority = 'low' | 'medium' | 'high';
export type UserRole = 'admin' | 'technician' | 'faculty';

export interface Request {
  id: string;
  title: string;
  location: string;
  description?: string;
  status: RequestStatus;
  priority: RequestPriority;
  user_id: string;
  assigned_to?: string;
  created_at: string;
  updated_at: string;
}
