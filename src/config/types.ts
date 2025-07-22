// Resource and field configuration types for CRUD UI generator

export type FieldType = 'string' | 'number' | 'boolean' | 'date' | 'enum' | 'custom';

export interface FieldConfig {
  name: string;
  label?: string;
  type: FieldType;
  inputType?: string; // e.g. 'text', 'select', 'checkbox', etc.
  required?: boolean;
  enumValues?: string[];
  validation?: {
    minLength?: number;
    maxLength?: number;
    min?: number;
    max?: number;
    pattern?: string;
    customValidator?: (value: any) => string | null;
  };
  override?: {
    label?: string;
    inputType?: string;
    validation?: any;
  };
}

export interface EndpointPattern {
  list: string;    // e.g. '/users'
  create: string;  // e.g. '/users'
  update: string;  // e.g. '/users/:id'
  delete: string;  // e.g. '/users/:id'
}

export interface ResourceConfig {
  name: string;
  label?: string;
  idField: string; // e.g. 'id'
  endpoints: EndpointPattern;
  fields: FieldConfig[];
}

export interface AppConfig {
  resources: ResourceConfig[];
  settings?: {
    apiBaseUrl: string;
    headers?: Record<string, string>;
  };
}
