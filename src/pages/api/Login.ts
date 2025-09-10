// src/pages/api/login.ts
export const runtime = 'nodejs';   // force Node on Vercel (not Edge)
export const prerender = false;    // don’t prerender an API route

import type { APIRoute } from 'astro';
import { prisma } from '../../server/prisma'; // <- see singleton below
import bcrypt from 'bcrypt';

export const POST: APIRoute = async ({ request }) => {
  try {
    const form = await request.formData();
    const email = form.get('email') as string;
    const password = form.get('password') as string;

    if (!email || !password) {
      return new Response(null, { status: 302, headers: { Location: `/L?error=${encodeURIComponent('Please fill in all fields')}` } });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return new Response(null, { status: 302, headers: { Location: `/L?error=${encodeURIComponent('User not found')}` } });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return new Response(null, { status: 302, headers: { Location: `/L?error=${encodeURIComponent('Incorrect password')}` } });
    }

    return new Response(null, {
      status: 302,
      headers: {
        'Set-Cookie': `user=${encodeURIComponent(email)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`,
        Location: '/Profile',
      },
    });
  } catch (error) {
    console.error('Login error:', error);
    return new Response(null, { status: 302, headers: { Location: `/L?error=${encodeURIComponent('Internal error')}` } });
  }
};