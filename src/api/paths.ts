// Utility to substitute path parameters in endpoint patterns

export function substitutePathParams(path: string, params: Record<string, string | number>): string {
  return path.replace(/:([a-zA-Z0-9_]+)/g, (_, key) => {
    if (params[key] === undefined) {
      throw new Error(`Missing path param: ${key}`);
    }
    return encodeURIComponent(String(params[key]));
  });
}
