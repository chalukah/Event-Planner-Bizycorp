export function safeParseJSON<T>(json: string): { success: true; data: T } | { success: false; error: string } {
  try {
    const data = JSON.parse(json);
    return { success: true, data };
  } catch (err) {
    return {
      success: false,
      error: err instanceof Error ? err.message : 'Invalid JSON'
    };
  }
}

export function validateTemplateJSON(data: unknown): data is {
  id: string;
  name: string;
  type: 'html' | 'md';
  content: string;
  sort?: number;
  updatedAt?: string;
} {
  if (typeof data !== 'object' || data === null) return false;
  const obj = data as Record<string, unknown>;
  return (
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    (obj.type === 'html' || obj.type === 'md') &&
    typeof obj.content === 'string'
  );
}

export function validateDateGroupJSON(data: unknown): data is {
  id: string;
  name: string;
  sort?: number;
  templates: unknown[];
} {
  if (typeof data !== 'object' || data === null) return false;
  const obj = data as Record<string, unknown>;
  return (
    typeof obj.id === 'string' &&
    typeof obj.name === 'string' &&
    Array.isArray(obj.templates)
  );
}
