import { NextRequest, NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, phone, email, message } = body;

  if (!name || !phone) {
    return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
  }

  const smtpConfigured =
    process.env.SMTP_USER && process.env.SMTP_PASS && process.env.EMAIL_TO;

  if (!smtpConfigured) {
    // Dev mode — log to console
    console.log("📩 New contact form submission:", { name, phone, email, message });
    return NextResponse.json({ ok: true });
  }

  const smtpPort = Number(process.env.SMTP_PORT ?? 465);
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST ?? "smtp.inbox.ru",
    port: smtpPort,
    secure: smtpPort === 465,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
    tls: { rejectUnauthorized: false },
  });

  try {
    await transporter.sendMail({
      from: process.env.EMAIL_FROM ?? `"Сайт Презент-Строй" <${process.env.SMTP_USER}>`,
      to: process.env.EMAIL_TO,
      subject: `Новая заявка с сайта — ${name}`,
      html: `
        <h2>Новая заявка с сайта present-stroy.ru</h2>
        <table style="border-collapse:collapse;width:100%;max-width:500px">
          <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Имя</td><td style="padding:8px;border:1px solid #eee">${name}</td></tr>
          <tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Телефон</td><td style="padding:8px;border:1px solid #eee"><a href="tel:${phone}">${phone}</a></td></tr>
          ${email ? `<tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Email</td><td style="padding:8px;border:1px solid #eee"><a href="mailto:${email}">${email}</a></td></tr>` : ""}
          ${message ? `<tr><td style="padding:8px;border:1px solid #eee;font-weight:bold">Сообщение</td><td style="padding:8px;border:1px solid #eee">${message}</td></tr>` : ""}
        </table>
      `,
    });
  } catch (err) {
    console.error("SMTP error:", err);
    return NextResponse.json({ error: "Email send failed" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
