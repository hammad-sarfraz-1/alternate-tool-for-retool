import { AppConfig } from "./types";

const LOCAL_STORAGE_KEY = "crud_ui_app_config";

export function loadConfig(): AppConfig | null {
  const raw = localStorage.getItem(LOCAL_STORAGE_KEY);
  if (!raw) return null;
  try {
    return JSON.parse(raw) as AppConfig;
  } catch {
    return null;
  }
}

export function saveConfig(config: AppConfig) {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(config));
}

export function importConfig(json: string): AppConfig | null {
  try {
    const config = JSON.parse(json) as AppConfig;
    saveConfig(config);
    return config;
  } catch {
    return null;
  }
}

export function exportConfig(config: AppConfig): string {
  return JSON.stringify(config, null, 2);
}
