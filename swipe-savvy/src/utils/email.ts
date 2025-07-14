import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(toEmail: string, name: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: process.env.RESEND_FROM_EMAIL!,
      to: toEmail,
      subject: `🎉 Welcome to Swipe Savvy, ${name}!`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 20px;">
          <h2>Hi ${name},</h2>
          <p>Thank you for creating your Swipe Savvy account!</p>
          <p>Your business listing is now live, and we’ve sent your free window sticker and POS signage.</p>
          <hr style="margin: 20px 0;">
          <p><strong>Next Steps:</strong></p>
          <ul>
            <li>🚀 Upgrade to Shop Savvy for analytics, syncing, and more</li>
            <li>📊 Access your dashboard (coming soon)</li>
          </ul>
          <p style="margin-top: 30px;">— The Swipe Savvy Team</p>
        </div>
      `,
    });

    if (error) {
      console.error('❌ Resend email error:', error);
      return { success: false, error };
    }

    return { success: true };
  } catch (err: any) {
    console.error('❌ Email send failure:', err.message);
    return { success: false, error: err.message };
  }
}