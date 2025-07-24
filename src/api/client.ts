import axios, { AxiosInstance } from "axios";

let apiBaseUrl = "";
let customHeaders: Record<string, string> = {};

let client: AxiosInstance = axios.create();

export function configureClient(
  baseUrl: string,
  headers: Record<string, string> = {},
) {
  apiBaseUrl = baseUrl;
  customHeaders = headers;
  client = axios.create({
    baseURL: apiBaseUrl,
    headers: customHeaders,
  });
}

export function getClient() {
  return client;
}
