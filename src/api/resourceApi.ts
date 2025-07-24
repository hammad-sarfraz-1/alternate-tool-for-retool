import { ResourceConfig } from "../config/types";
import { getClient } from "./client";
import { substitutePathParams } from "./paths";

export async function listResources<T>(
  resource: ResourceConfig,
  params?: any,
): Promise<T[]> {
  const client = getClient();
  const res = await client.get(resource.endpoints.list, { params });
  return res.data;
}

export async function createResource<T>(
  resource: ResourceConfig,
  data: any,
): Promise<T> {
  const client = getClient();
  const res = await client.post(resource.endpoints.create, data);
  return res.data;
}

export async function updateResource<T>(
  resource: ResourceConfig,
  id: string | number,
  data: any,
): Promise<T> {
  const client = getClient();
  const url = substitutePathParams(resource.endpoints.update, {
    [resource.idField]: id,
  });
  const res = await client.put(url, data);
  return res.data;
}

export async function deleteResource(
  resource: ResourceConfig,
  id: string | number,
): Promise<void> {
  const client = getClient();
  const url = substitutePathParams(resource.endpoints.delete, {
    [resource.idField]: id,
  });
  await client.delete(url);
}
