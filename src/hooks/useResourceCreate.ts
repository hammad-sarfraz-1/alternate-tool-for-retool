import { useMutation, useQueryClient } from "react-query";
import { ResourceConfig } from "../config/types";
import { createResource } from "../api/resourceApi";

export function useResourceCreate<T>(resource: ResourceConfig) {
  const queryClient = useQueryClient();
  return useMutation((data: any) => createResource<T>(resource, data), {
    onSuccess: () => {
      queryClient.invalidateQueries(resource.name);
    },
  });
}
