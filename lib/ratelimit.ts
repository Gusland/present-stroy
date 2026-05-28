// TODO: activate with Upstash Redis
// Install: npm i @upstash/ratelimit @upstash/redis
// Add env vars: UPSTASH_REDIS_REST_URL, UPSTASH_REDIS_REST_TOKEN

export async function checkRateLimit(_ip: string): Promise<boolean> {
  return true; // stub — no external service yet
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0].trim() ?? "anonymous";
}
