import { Ratelimit } from "@upstash/ratelimit";
import { Redis } from "@upstash/redis";

const configured =
  !!process.env.UPSTASH_REDIS_REST_URL &&
  !!process.env.UPSTASH_REDIS_REST_TOKEN;

const ratelimitInstance = configured
  ? new Ratelimit({
      redis: new Redis({
        url: process.env.UPSTASH_REDIS_REST_URL!,
        token: process.env.UPSTASH_REDIS_REST_TOKEN!,
      }),
      limiter: Ratelimit.slidingWindow(3, "60 s"),
      analytics: false,
    })
  : null;

export async function checkRateLimit(ip: string): Promise<boolean> {
  if (!ratelimitInstance) return true; // dev: always allow
  const { success } = await ratelimitInstance.limit(ip);
  return success;
}

export function getClientIp(req: Request): string {
  const forwarded = req.headers.get("x-forwarded-for");
  return forwarded?.split(",")[0].trim() ?? "anonymous";
}
