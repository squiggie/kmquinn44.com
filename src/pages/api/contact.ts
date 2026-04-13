import type { APIRoute } from 'astro';
import nodemailer from 'nodemailer';

export const prerender = false;

export const POST: APIRoute = async ({ request, redirect }) => {
  const formData = await request.formData();

  // Honeypot check
  if (formData.get('bot-field')) {
    return redirect('/thank-you/', 302);
  }

  const name    = formData.get('name')?.toString().trim() ?? '';
  const email   = formData.get('email')?.toString().trim() ?? '';
  const message = formData.get('message')?.toString().trim() ?? '';

  if (!name || !email || !message) {
    return new Response('Missing required fields.', { status: 400 });
  }

  const transporter = nodemailer.createTransport({
    host: import.meta.env.SMTP_HOST,
    port: Number(import.meta.env.SMTP_PORT ?? 587),
    secure: import.meta.env.SMTP_SECURE === 'true',
    auth: {
      user: import.meta.env.SMTP_USER,
      pass: import.meta.env.SMTP_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from: `"K.M. Quinn Website" <${import.meta.env.SMTP_USER}>`,
      to: import.meta.env.TO_EMAIL,
      replyTo: email,
      subject: `New message from ${name}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${name}</p>
        <p><strong>Email:</strong> <a href="mailto:${email}">${email}</a></p>
        <p><strong>Message:</strong><br>${message.replace(/\n/g, '<br>')}</p>
      `,
      text: `Name: ${name}\nEmail: ${email}\nMessage:\n${message}`,
    });

    return redirect('/thank-you/', 302);
  } catch (err) {
    console.error('Email error:', err);
    return new Response('Failed to send message. Please try again.', { status: 500 });
  }
};
