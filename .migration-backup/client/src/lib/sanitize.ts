import DOMPurify from "dompurify";

export function sanitize(dirty: string): string {
  return DOMPurify.sanitize(dirty, { ALLOWED_TAGS: [], ALLOWED_ATTR: [] });
}

export function sanitizeHTML(dirty: string): string {
  return DOMPurify.sanitize(dirty);
