import { useMutation, useQueryClient } from 'react-query';
import { ResourceConfig } from '../config/types';
import { deleteResource } from '../api/resourceApi';

export function useResourceDelete(resource: ResourceConfig) {
  const queryClient = useQueryClient();
  return useMutation((id: string | number) => deleteResource(resource, id), {
    onSuccess: () => {
      queryClient.invalidateQueries(resource.name);
    },
  });
}
