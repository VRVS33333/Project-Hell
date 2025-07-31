export const prerender = false;

import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';

const prisma = new PrismaClient();

export const POST = async ({ request }) => {
  // Parse cookies
  const cookies = Object.fromEntries(
    (request.headers.get('cookie') ?? '').split('; ').map(c => c.split('='))
  );
  const userEmail = cookies.user ? decodeURIComponent(cookies.user) : null;
  if (!userEmail) {
    return new Response('Unauthorized', { status: 401 });
  }

  // Parse the form data
  const form = await request.formData();
  const file = form.get("profilePic");

  // Validate file presence and type
  if (!(file && typeof file.arrayBuffer === "function")) {
    return new Response("Missing file", { status: 400 });
  }

  // Convert file to buffer
  const buf = Buffer.from(await file.arrayBuffer());

  // Clean file name: remove unsafe characters and prepend timestamp
  const originalName = typeof file.name === 'string' ? file.name : 'unknown';
  const safeFileName = originalName.replace(/\W/g, '');
  const fileName = `${Date.now()}_${safeFileName}`;

  // Destination path: ./public/uploads/filename
  const savePath = path.join(process.cwd(), 'public', 'uploads', fileName);

  // Make sure directory public/uploads exists before writing
  try {
    await fs.mkdir(path.dirname(savePath), { recursive: true });
  } catch (e) {
    // If there's an error creating directory, handle it gracefully
    console.error("Error creating uploads directory:", e);
    return new Response("Server error", { status: 500 });
  }

  // Write file buffer to disk
  try {
    await fs.writeFile(savePath, buf);
  } catch (e) {
    console.error("Error saving file:", e);
    return new Response("Server error", { status: 500 });
  }

  // Update user's profilePic URL in DB
  try {
    await prisma.user.update({
      where: { email: userEmail },
      data: { profilePic: `/uploads/${fileName}` },
    });
  } catch (e) {
    console.error("Error updating user data in DB:", e);
    return new Response("Server error", { status: 500 });
  }

  // Redirect back to profile page
  return new Response(null, {
    status: 302,
    headers: { Location: '/Profile' },
  });
};
