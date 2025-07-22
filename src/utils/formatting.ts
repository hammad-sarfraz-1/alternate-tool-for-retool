export function formatValue(value: any, type: string): string {
  if (value === null || value === undefined) return '';
  switch (type) {
    case 'date':
      return new Date(value).toLocaleDateString();
    case 'boolean':
      return value ? 'Yes' : 'No';
    case 'enum':
      return String(value);
    default:
      return String(value);
  }
}
