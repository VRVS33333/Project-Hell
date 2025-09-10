// src/pages/api/Login.ts
export const runtime = 'nodejs';
export const prerender = false;

import type { APIRoute } from 'astro';
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

export const POST: APIRoute = async ({ request }) => {
  try {
    const form = await request.formData();
    const email = form.get('email') as string;
    const password = form.get('password') as string;

    if (!email || !password) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: `/L?error=${encodeURIComponent('Please fill in all fields')}`
        }
      });
    }

    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: `/L?error=${encodeURIComponent('User not found')}`
        }
      });
    }

    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: `/L?error=${encodeURIComponent('Incorrect password')}`
        }
      });
    }

    // Set cookie for 30 days
    return new Response(null, {
      status: 302,
      headers: {
        'Set-Cookie': `user=${encodeURIComponent(email)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`,
        'Location': '/Profile'
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    return new Response(null, {
      status: 302,
      headers: {
        Location: `/L?error=${encodeURIComponent('Internal error')}`
      }
    });
  }
};
