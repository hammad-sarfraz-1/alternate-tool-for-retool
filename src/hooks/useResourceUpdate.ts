import { useMutation, useQueryClient } from 'react-query';
import { ResourceConfig } from '../config/types';
import { updateResource } from '../api/resourceApi';

export function useResourceUpdate<T>(resource: ResourceConfig) {
  const queryClient = useQueryClient();
  return useMutation(({ id, data }: { id: string | number; data: any }) => updateResource<T>(resource, id, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(resource.name);
    },
  });
}
