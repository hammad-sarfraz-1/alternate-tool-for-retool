export type Field = { name: string; type: string };
export type Entity = { id: string; name: string; [key: string]: any };
export type Module = {
  id: string;
  name: string;
  fields?: Field[];
  entities?: Entity[];
  modules?: Module[]; // for nesting
};
export type App = {
  id: string;
  name: string;
  modules: Module[];
  apiEndpoint?: string;
};

const STORAGE_KEY = "appsState";

function uuid() {
  return Math.random().toString(36).slice(2, 10) + Date.now().toString(36);
}

function saveToStorage(apps: App[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(apps));
}

function loadFromStorage(): App[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

class AppsState {
  private apps: App[] = loadFromStorage();

  getApps() {
    return this.apps;
  }
  getApp(appId: string) {
    return this.apps.find((a) => a.id === appId);
  }
  addApp(name: string, apiEndpoint?: string): App {
    const app: App = { id: uuid(), name, modules: [], apiEndpoint };
    this.apps.push(app);
    saveToStorage(this.apps);
    return app;
  }
  addModuleToApp(appId: string, moduleName: string): Module | undefined {
    const app = this.getApp(appId);
    if (!app) return;
    const mod: Module = {
      id: uuid(),
      name: moduleName,
      fields: [],
      entities: [],
      modules: [],
    };
    app.modules.push(mod);
    saveToStorage(this.apps);
    return mod;
  }
  updateModuleFields(appId: string, moduleId: string, fields: Field[]) {
    const app = this.getApp(appId);
    const mod = app?.modules.find((m) => m.id === moduleId);
    if (mod) mod.fields = fields;
    saveToStorage(this.apps);
  }
  updateModuleEntities(appId: string, moduleId: string, entities: Entity[]) {
    const app = this.getApp(appId);
    const mod = app?.modules.find((m) => m.id === moduleId);
    if (mod) mod.entities = entities;
    saveToStorage(this.apps);
  }
}

export const appsState = new AppsState();
export const addApp = (name: string, apiEndpoint?: string) =>
  appsState.addApp(name, apiEndpoint);
export const addModuleToApp = (appId: string, moduleName: string) =>
  appsState.addModuleToApp(appId, moduleName);
