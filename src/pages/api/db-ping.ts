export const runtime = 'nodejs';
export const prerender = false;

import type { APIRoute } from 'astro';
import { Client } from 'pg';

export const GET: APIRoute = async () => {
  try {
    const url = process.env.DATABASE_URL || '';
    const redacted = url.replace(/:\/\/[^:]+:[^@]+@/, '://user:***@'); // redact pw in logs

    // Force SSL in pg client (Neon requires it)
    const client = new Client({
      connectionString: url,
      ssl: { rejectUnauthorized: false },
    });

    const started = Date.now();
    await client.connect();
    const r = await client.query('select 1 as ok');
    await client.end();

    return new Response(
      JSON.stringify({
        ok: true,
        vercelRuntime: process.env.VERCEL ? 'vercel' : 'local',
        dbUrlHost: redacted.split('@')[1]?.split('/')[0],
        durationMs: Date.now() - started,
        result: r.rows,
      }),
      { headers: { 'content-type': 'application/json' } }
    );
  } catch (e: any) {
    return new Response(
      JSON.stringify({
        ok: false,
        name: e?.name,
        code: e?.code,
        message: e?.message,
        stack: e?.stack?.split('\n').slice(0, 6),
      }),
      { status: 500, headers: { 'content-type': 'application/json' } }
    );
  }
};