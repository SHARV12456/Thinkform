import nodemailer from 'nodemailer';

const RESET_TOKEN_EXPIRY_MINUTES = 15;
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587', 10),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASSWORD,
  },
});

export interface ResetEmailOptions {
  to: string;
  resetUrl: string;
}

export async function sendResetPasswordEmail({ to, resetUrl }: ResetEmailOptions) {
  await transporter.verify();
  return transporter.sendMail({
    from: process.env.SMTP_FROM || 'noreply@thinkform.com',
    to,
    subject: 'ThinkForm Admin Password Reset',
    html: `
      <div style="font-family: Arial, sans-serif; color: #111; line-height: 1.5;">
        <h2 style="margin-bottom: 0.5rem;">Password Reset Request</h2>
        <p>You requested a password reset for your ThinkForm admin account.</p>
        <p>Click the button below to reset your password. This link expires in ${RESET_TOKEN_EXPIRY_MINUTES} minutes.</p>
        <p style="margin: 1rem 0;">
          <a href="${resetUrl}" style="display:inline-block; padding: 12px 22px; background: #000; color: #fff; text-decoration: none; border-radius: 6px;">
            Reset Password
          </a>
        </p>
        <p>If the button does not work, paste this link into your browser:</p>
        <p><a href="${resetUrl}" style="color: #1a0dab; word-break: break-all;">${resetUrl}</a></p>
        <p>If you did not request this password reset, you can safely ignore this email.</p>
      </div>
    `,
  });
}
