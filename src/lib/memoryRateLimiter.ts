const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

const LIMIT = 10;
const WINDOW_MS = 60 * 1000;

export function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (entry && now - entry.timestamp < WINDOW_MS) {
    if (entry.count >= LIMIT) return true;
    entry.count += 1;
  } else {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
  }
  return false;
}
