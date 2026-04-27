import DOMPurify from "dompurify";

/** Strip ALL HTML — use for plain text inputs (names, emails, etc.) */
export function sanitize(dirty: string): string {
  return DOMPurify.sanitize(dirty, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
}

/** Allow safe HTML subset — use for rich text content */
export function sanitizeHTML(dirty: string): string {
  return DOMPurify.sanitize(dirty);
}
