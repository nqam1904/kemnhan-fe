import { CONFIG } from '@/config-global';

const baseImageUrl = CONFIG.imageUrl || CONFIG.serverUrl || '';

function resolveImageUrl(pathOrUrl?: string): string {
  if (!pathOrUrl) return '';

  // Already absolute URL
  if (/^https?:\/\//i.test(pathOrUrl)) return pathOrUrl;

  // Join with base, normalize slashes
  const base = baseImageUrl.replace(/\/$/, '');
  const rel = pathOrUrl.replace(/^\//, '');
  return base ? `${base}/${rel}` : `/${rel}`;
}

export default resolveImageUrl;
