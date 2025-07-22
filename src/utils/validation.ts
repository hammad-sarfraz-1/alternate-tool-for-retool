import { FieldConfig } from '../config/types';

export function validateField(value: any, field: FieldConfig): string | null {
  if (field.required && (value === undefined || value === null || value === '')) {
    return `${field.label || field.name} is required.`;
  }
  if (field.validation) {
    const v = field.validation;
    if (v.minLength !== undefined && typeof value === 'string' && value.length < v.minLength) {
      return `${field.label || field.name} must be at least ${v.minLength} characters.`;
    }
    if (v.maxLength !== undefined && typeof value === 'string' && value.length > v.maxLength) {
      return `${field.label || field.name} must be at most ${v.maxLength} characters.`;
    }
    if (v.min !== undefined && typeof value === 'number' && value < v.min) {
      return `${field.label || field.name} must be at least ${v.min}.`;
    }
    if (v.max !== undefined && typeof value === 'number' && value > v.max) {
      return `${field.label || field.name} must be at most ${v.max}.`;
    }
    if (v.pattern && typeof value === 'string' && !new RegExp(v.pattern).test(value)) {
      return `${field.label || field.name} is invalid.`;
    }
    if (typeof v.customValidator === 'function') {
      return v.customValidator(value);
    }
  }
  return null;
}
