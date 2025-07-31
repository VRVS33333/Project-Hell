// src/pages/api/ProfileUpdate.ts
export const prerender = false;

import type { APIRoute } from 'astro';
import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const POST: APIRoute = async ({ request }) => {
  try {
    const form = await request.formData();

    const email = form.get('email') as string;
    if (!email) {
      return new Response(null, { status: 400, statusText: 'Email is required' });
    }

    const firstName = form.get('firstName') as string | null;
    const lastName = form.get('lastName') as string | null;
    const phone = form.get('phone') as string | null;
    const company = form.get('company') as string | null;

    // Update user fields except email
    await prisma.user.update({
      where: { email },
      data: {
        firstName: firstName ?? undefined,
        lastName: lastName ?? undefined,
        phone: phone ?? undefined,
        company: company ?? undefined,
      },
    });

    // Redirect back to profile page after update
    return new Response(null, {
      status: 302,
      headers: { Location: '/Profile' },
    });
  } catch (error) {
    console.error('Profile update error:', error);
    return new Response(null, {
      status: 500,
      statusText: 'Internal Server Error',
    });
  }
};
