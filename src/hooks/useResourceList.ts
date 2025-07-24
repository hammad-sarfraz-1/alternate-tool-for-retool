import { useQuery } from "react-query";
import { ResourceConfig } from "../config/types";
import { listResources } from "../api/resourceApi";

export function useResourceList<T>(resource: ResourceConfig, params?: any) {
  return useQuery([resource.name, params], () =>
    listResources<T>(resource, params),
  );
}
