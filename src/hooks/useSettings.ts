import { useState, useEffect } from 'react';
import { loadConfig, saveConfig } from '../config/configLoader';
import { configureClient } from '../api/client';
import defaultConfig from '../config/defaultConfig';

export function useSettings() {
  const [settings, setSettings] = useState(() => {
    const config = loadConfig() || defaultConfig;
    return config.settings || { apiBaseUrl: '', headers: {} };
  });

  useEffect(() => {
    configureClient(settings.apiBaseUrl, settings.headers || {});
    // Save settings to config
    const config = loadConfig() || defaultConfig;
    saveConfig({ ...config, settings });
  }, [settings]);

  return [settings, setSettings] as const;
}
