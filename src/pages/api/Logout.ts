export const prerender = false;

import type { APIRoute } from 'astro';

export const POST: APIRoute = async () => {
  return new Response(null, {
    status: 302,
    headers: {
      'Set-Cookie': `user=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`,
      'Location': '/',
    },
  });
};

export const GET: APIRoute = async () => {
  return new Response(null, {
    status: 302,
    headers: { 'Location': '/' },
  });
};
