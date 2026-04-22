/**
 * Provides deterministic or stable helper patterns for canonical object IDs.
 */
export function generateCanonicalId(prefix: string): string {
  // Simple stable ID generator for canonical usage without external heavy libs.
  // We use crypto.randomUUID() if available, fallback to a pseudo-random string.
  const uuid = typeof crypto !== "undefined" && crypto.randomUUID
    ? crypto.randomUUID()
    : Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  
  return `${prefix}_${uuid.replace(/-/g, "")}`;
}
