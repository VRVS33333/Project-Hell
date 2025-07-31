export const prerender = false;

import type { APIRoute } from 'astro';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const POST: APIRoute = async ({ request }) => {
  try {
    const form = await request.formData();

    const email = form.get('floating_email') as string;
    const password = form.get('floating_password') as string;
    const confirm = form.get('repeat_password') as string;
    const firstName = form.get('floating_first_name') as string;
    const lastName = form.get('floating_last_name') as string;
    const phone = form.get('floating_phone') as string;
    const company = form.get('floating_company') as string;

    if (!email || !password || !confirm || !firstName || !lastName || !phone || !company) {
      return new Response(null, { status: 302, headers: { Location: `/R?error=${encodeURIComponent('Missing required fields')}` } });
    }

    if (password !== confirm) {
      return new Response(null, { status: 302, headers: { Location: `/R?error=${encodeURIComponent('Passwords do not match')}` } });
    }

    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new Response(null, { status: 302, headers: { Location: `/R?error=${encodeURIComponent('User already exists')}` } });
    }

    const hashed = await bcrypt.hash(password, 10);

    await prisma.user.create({
      data: { email, password: hashed, firstName, lastName, phone, company }
    });

    return new Response(null, { status: 302, headers: { Location: `/R?success=1` } });
  } catch (err) {
    console.error('Registration error:', err);
    return new Response(null, { status: 302, headers: { Location: `/R?error=${encodeURIComponent('Internal server error')}` } });
  }
};
