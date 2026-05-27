import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import nodemailer from "nodemailer";

const schema = z.object({
  name: z.string().min(1).max(100),
  phone: z.string().min(6).max(30),
  email: z.union([z.string().email(), z.literal("")]).optional(),
  message: z.string().max(1000).optional(),
  lotId: z.string().optional(),
  type: z
    .enum(["viewing", "booking", "callback", "mortgage", "info"])
    .default("callback"),
  source: z.string().max(100).optional(),
  preferredDate: z.string().optional(),
  preferredTime: z.string().optional(),
  utm: z.record(z.string(), z.string()).optional(),
  honeypot: z.string().optional(),
});

// In-memory rate limit: IP → last request timestamp
const rateLimitMap = new Map<string, number>();
const RATE_LIMIT_MS = 60_000;

const TYPE_LABEL: Record<string, string> = {
  viewing: "Запись на просмотр",
  booking: "Бронирование",
  callback: "Обратный звонок",
  mortgage: "Ипотека",
  info: "Информация",
};

export async function POST(req: NextRequest) {
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0] ??
    req.headers.get("x-real-ip") ??
    "unknown";
  const now = Date.now();
  const last = rateLimitMap.get(ip);
  if (last && now - last < RATE_LIMIT_MS) {
    return NextResponse.json({ error: "Too many requests" }, { status: 429 });
  }
  rateLimitMap.set(ip, now);

  let data: z.infer<typeof schema>;
  try {
    data = schema.parse(await req.json());
  } catch {
    return NextResponse.json({ error: "Invalid request" }, { status: 400 });
  }

  if (data.honeypot) {
    return NextResponse.json({ ok: true });
  }

  const { name, phone, email, message, lotId, type, source, utm } = data;

  const telegramToken = process.env.TELEGRAM_BOT_TOKEN;
  const telegramChatId = process.env.TELEGRAM_CHAT_ID;

  if (telegramToken && telegramChatId) {
    const parts = [
      `🔥 НОВАЯ ЗАЯВКА · ${TYPE_LABEL[type] ?? type}`,
      `👤 ${name}`,
      `📞 ${phone}`,
      email ? `📧 ${email}` : null,
      lotId ? `🏠 Лот: ${lotId} · 14 300 000 ₽` : null,
      source ? `📍 ${source}` : null,
      message ? `📝 ${message}` : null,
      utm && Object.keys(utm).length > 0
        ? `UTM: ${Object.entries(utm)
            .map(([k, v]) => `${k}=${v}`)
            .join(", ")}`
        : null,
    ]
      .filter(Boolean)
      .join("\n");

    try {
      await fetch(
        `https://api.telegram.org/bot${telegramToken}/sendMessage`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ chat_id: telegramChatId, text: parts }),
        }
      );
    } catch (e) {
      console.error("Telegram send failed:", e);
    }
  }

  const smtpConfigured =
    process.env.SMTP_USER && process.env.SMTP_PASS && process.env.EMAIL_TO;

  if (smtpConfigured) {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST ?? "smtp.gmail.com",
        port: Number(process.env.SMTP_PORT ?? 587),
        secure: false,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      });
      await transporter.sendMail({
        from:
          process.env.EMAIL_FROM ??
          `"Волжский Берег" <${process.env.SMTP_USER}>`,
        to: process.env.EMAIL_TO,
        subject: `Заявка — ${name}${lotId ? ` · Лот ${lotId}` : ""}`,
        html: `
          <h2>Заявка с сайта Волжского Берега</h2>
          <table style="border-collapse:collapse;width:100%;max-width:500px">
            <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Тип</td><td style="padding:8px;border:1px solid #eee">${TYPE_LABEL[type] ?? type}</td></tr>
            <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Имя</td><td style="padding:8px;border:1px solid #eee">${name}</td></tr>
            <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Телефон</td><td style="padding:8px;border:1px solid #eee"><a href="tel:${phone}">${phone}</a></td></tr>
            ${email ? `<tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #eee">${email}</td></tr>` : ""}
            ${lotId ? `<tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Лот</td><td style="padding:8px;border:1px solid #eee">${lotId}</td></tr>` : ""}
            ${source ? `<tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Источник</td><td style="padding:8px;border:1px solid #eee">${source}</td></tr>` : ""}
            ${message ? `<tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Сообщение</td><td style="padding:8px;border:1px solid #eee">${message}</td></tr>` : ""}
          </table>
        `,
      });
    } catch (e) {
      console.error("Email send failed:", e);
    }
  }

  if (!telegramToken && !smtpConfigured) {
    console.log("📩 Lead (no integrations configured):", {
      name,
      phone,
      type,
      lotId,
      source,
    });
  }

  return NextResponse.json({ ok: true });
}
