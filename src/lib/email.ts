import nodemailer from "nodemailer";
import { Resend } from "resend";

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || "587"),
  secure: false,
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
});

const resend = new Resend(process.env.RESEND_API_KEY);

function escapeHtml(str: string): string {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

interface SendEmailOptions {
  to: string;
  subject: string;
  html: string;
}

export async function sendEmail({ to, subject, html }: SendEmailOptions) {
  // Try Gmail SMTP first (sends from your real email)
  try {
    const info = await transporter.sendMail({
      from: process.env.SMTP_FROM,
      to,
      subject,
      html,
    });
    console.log("Email sent via Gmail:", info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (smtpError) {
    console.warn("Gmail SMTP failed, falling back to Resend:", smtpError);

    // Fallback to Resend
    try {
      const result = await resend.emails.send({
        from: process.env.RESEND_FROM || "TIXSYNC <onboarding@resend.dev>",
        to,
        subject,
        html,
      });
      console.log("Email sent via Resend:", result.data?.id);
      return { success: true, messageId: result.data?.id };
    } catch (resendError) {
      console.error("All email methods failed:", resendError);
      return { success: false, error: resendError };
    }
  }
}

export function buildAutoReplyHtml(name: string) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #0d1117; color: #e6e6e6; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .header { text-align: center; margin-bottom: 32px; }
        .logo { display: inline-flex; align-items: center; gap: 10px; margin-bottom: 16px; }
        .logo-box { background: rgba(26, 92, 245, 0.1); border: 1px solid rgba(26, 92, 245, 0.2); border-radius: 10px; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; }
        .logo-text { font-family: monospace; font-weight: bold; font-size: 18px; color: #59a0ff; }
        .brand { font-size: 16px; font-weight: 600; color: #fff; }
        .tagline { font-size: 10px; text-transform: uppercase; letter-spacing: 3px; color: #868e96; }
        .title { font-size: 24px; font-weight: 700; color: #fff; margin-bottom: 8px; }
        .divider { height: 1px; background: rgba(255,255,255,0.05); margin: 24px 0; }
        .message { font-size: 15px; line-height: 1.7; color: #adb5bd; }
        .highlight { color: #59a0ff; font-weight: 500; }
        .footer { text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.05); }
        .footer-text { font-size: 12px; color: #495057; }
        .cta { display: inline-block; background: #1a5cf5; color: #fff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 500; font-size: 14px; margin: 16px 0; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">
            <div class="logo-box"><span class="logo-text">T</span></div>
            <div>
              <div class="brand">TIXSYNC SOLUTIONS</div>
              <div class="tagline">Digital Solutions & Visual Narratives</div>
            </div>
          </div>
        </div>

        <div class="title">Thank You, ${escapeHtml(name)}!</div>

        <div class="divider"></div>

        <div class="message">
          <p>Hi <span class="highlight">${escapeHtml(name)}</span>,</p>
          <p>
            I've received your message and wanted to let you know that it has
            been successfully delivered. I review every inquiry personally and
            will get back to you within <span class="highlight">24 hours</span>.
          </p>
          <p>
            If your matter is urgent, feel free to reach me directly via
            WhatsApp at +254 704 440 164.
          </p>
          <p>
            In the meantime, feel free to explore my latest work at
            <a href="https://tixsync.com" class="highlight">tixsync.com</a>.
          </p>
        </div>

        <div style="text-align: center;">
          <a href="https://tixsync.com/#contact" class="cta">View My Portfolio</a>
        </div>

        <div class="footer">
          <p class="footer-text">
            Cornelius Maina Nyaga — TIXSYNC SOLUTIONS<br>
            Web Development · Cybersecurity · Photography · Videography
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function buildReplyHtml(
  clientName: string,
  clientSubject: string | null,
  clientMessage: string,
  replyMessage: string
) {
  const quotedLines = clientMessage
    .split("\n")
    .map((l) => `&gt; ${escapeHtml(l)}`)
    .join("<br>");

  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #0d1117; color: #e6e6e6; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .header { text-align: center; margin-bottom: 32px; }
        .logo { display: inline-flex; align-items: center; gap: 10px; margin-bottom: 16px; }
        .logo-box { background: rgba(26, 92, 245, 0.1); border: 1px solid rgba(26, 92, 245, 0.2); border-radius: 10px; width: 40px; height: 40px; display: flex; align-items: center; justify-content: center; }
        .logo-text { font-family: monospace; font-weight: bold; font-size: 18px; color: #59a0ff; }
        .brand { font-size: 16px; font-weight: 600; color: #fff; }
        .tagline { font-size: 10px; text-transform: uppercase; letter-spacing: 3px; color: #868e96; }
        .title { font-size: 20px; font-weight: 700; color: #fff; margin-bottom: 8px; }
        .divider { height: 1px; background: rgba(255,255,255,0.05); margin: 24px 0; }
        .reply-body { font-size: 15px; line-height: 1.7; color: #adb5bd; margin-bottom: 24px; }
        .highlight { color: #59a0ff; font-weight: 500; }
        .quoted-section { margin-top: 24px; padding: 16px; background: rgba(255,255,255,0.02); border-left: 3px solid rgba(255,255,255,0.1); border-radius: 0 8px 8px 0; }
        .quoted-label { font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #868e96; margin-bottom: 8px; }
        .quoted-text { font-size: 13px; line-height: 1.6; color: #6c757d; }
        .cta { display: inline-block; background: #1a5cf5; color: #fff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 500; font-size: 14px; margin: 16px 0; }
        .footer { text-align: center; margin-top: 32px; padding-top: 24px; border-top: 1px solid rgba(255,255,255,0.05); }
        .footer-text { font-size: 12px; color: #495057; }
        .whatsapp { display: inline-block; background: #25D366; color: #fff; text-decoration: none; padding: 12px 28px; border-radius: 8px; font-weight: 500; font-size: 14px; margin: 8px 4px; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <div class="logo">
            <div class="logo-box"><span class="logo-text">T</span></div>
            <div>
              <div class="brand">TIXSYNC SOLUTIONS</div>
              <div class="tagline">Digital Solutions & Visual Narratives</div>
            </div>
          </div>
        </div>

        <div class="title">Reply to Your Inquiry</div>

        <div class="divider"></div>

        <div class="reply-body">
          <p>Hi <span class="highlight">${escapeHtml(clientName)}</span>,</p>
          ${replyMessage
            .split("\n")
            .map((line) => `<p>${escapeHtml(line)}</p>`)
            .join("")}
          <p style="margin-top: 16px;">
            If you have any further questions, feel free to reply to this email
            or reach me directly.
          </p>
        </div>

        <div style="text-align: center;">
          <a href="https://wa.me/254704440164" class="whatsapp">WhatsApp Me</a>
          <a href="https://tixsync.com/#contact" class="cta">Visit Portfolio</a>
        </div>

        <div class="quoted-section">
          <div class="quoted-label">Your original message${clientSubject ? ` — ${escapeHtml(clientSubject)}` : ""}</div>
          <div class="quoted-text">${quotedLines}</div>
        </div>

        <div class="footer">
          <p class="footer-text">
            Cornelius Maina Nyaga — TIXSYNC SOLUTIONS<br>
            Web Development · Cybersecurity · Photography · Videography<br>
            +254 704 440 164 · tixsyncsolutions@gmail.com
          </p>
        </div>
      </div>
    </body>
    </html>
  `;
}

export function buildAdminNotificationHtml(
  name: string,
  email: string,
  subject: string | null,
  message: string
) {
  return `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <style>
        body { font-family: 'Segoe UI', Arial, sans-serif; background: #0d1117; color: #e6e6e6; margin: 0; padding: 0; }
        .container { max-width: 600px; margin: 0 auto; padding: 40px 20px; }
        .badge { display: inline-block; background: rgba(26, 92, 245, 0.1); border: 1px solid rgba(26, 92, 245, 0.2); border-radius: 6px; padding: 4px 12px; font-size: 12px; color: #59a0ff; font-weight: 600; margin-bottom: 16px; }
        .title { font-size: 22px; font-weight: 700; color: #fff; margin-bottom: 8px; }
        .divider { height: 1px; background: rgba(255,255,255,0.05); margin: 20px 0; }
        .field-label { font-size: 11px; text-transform: uppercase; letter-spacing: 2px; color: #868e96; margin-bottom: 4px; }
        .field-value { font-size: 14px; color: #e6e6e6; margin-bottom: 12px; }
        .message-box { background: rgba(255,255,255,0.03); border: 1px solid rgba(255,255,255,0.05); border-radius: 8px; padding: 16px; font-size: 14px; line-height: 1.6; color: #ced4da; white-space: pre-wrap; }
        .footer { margin-top: 24px; font-size: 12px; color: #495057; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="badge">New Contact Message</div>
        <div class="title">You have a new inquiry</div>
        <div class="divider"></div>
        <div class="field-label">From</div>
        <div class="field-value">${escapeHtml(name)} &lt;${escapeHtml(email)}&gt;</div>
        <div class="field-label">Subject</div>
        <div class="field-value">${escapeHtml(subject || "(No subject)")}</div>
        <div class="field-label">Message</div>
        <div class="message-box">${escapeHtml(message)}</div>
        <div class="footer">
          Reply to this email or visit the <a href="/admin/messages" style="color: #59a0ff;">admin dashboard</a>.
        </div>
      </div>
    </body>
    </html>
  `;
}
