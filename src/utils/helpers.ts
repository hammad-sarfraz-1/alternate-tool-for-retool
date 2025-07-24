export function deepClone<T>(obj: T): T {
  return JSON.parse(JSON.stringify(obj));
}

export function isObject(val: any): val is Record<string, any> {
  return val !== null && typeof val === "object" && !Array.isArray(val);
}
