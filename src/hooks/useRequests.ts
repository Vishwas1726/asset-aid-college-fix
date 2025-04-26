
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { Request } from '@/types/requests';

export function useRequests() {
  const queryClient = useQueryClient();

  const { data: requests = [], isLoading, error } = useQuery({
    queryKey: ['requests'],
    queryFn: async () => {
      const { data, error } = await supabase
        .from('requests')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      return data as Request[];
    },
  });

  const updateRequest = useMutation({
    mutationFn: async (request: Partial<Request> & { id: string }) => {
      const { data, error } = await supabase
        .from('requests')
        .update(request)
        .eq('id', request.id)
        .select()
        .single();

      if (error) throw error;
      return data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['requests'] });
    },
  });

  return {
    requests,
    isLoading,
    error,
    updateRequest,
  };
}
