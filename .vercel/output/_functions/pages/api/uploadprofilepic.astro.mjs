import { PrismaClient } from '@prisma/client';
import fs from 'fs/promises';
import path from 'path';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const prisma = new PrismaClient();
const POST = async ({ request }) => {
  const cookies = Object.fromEntries(
    (request.headers.get("cookie") ?? "").split("; ").map((c) => c.split("="))
  );
  const userEmail = cookies.user ? decodeURIComponent(cookies.user) : null;
  if (!userEmail) {
    return new Response("Unauthorized", { status: 401 });
  }
  const form = await request.formData();
  const file = form.get("profilePic");
  if (!(file && typeof file.arrayBuffer === "function")) {
    return new Response("Missing file", { status: 400 });
  }
  const buf = Buffer.from(await file.arrayBuffer());
  const originalName = typeof file.name === "string" ? file.name : "unknown";
  const safeFileName = originalName.replace(/\W/g, "");
  const fileName = `${Date.now()}_${safeFileName}`;
  const savePath = path.join(process.cwd(), "public", "uploads", fileName);
  try {
    await fs.mkdir(path.dirname(savePath), { recursive: true });
  } catch (e) {
    console.error("Error creating uploads directory:", e);
    return new Response("Server error", { status: 500 });
  }
  try {
    await fs.writeFile(savePath, buf);
  } catch (e) {
    console.error("Error saving file:", e);
    return new Response("Server error", { status: 500 });
  }
  try {
    await prisma.user.update({
      where: { email: userEmail },
      data: { profilePic: `/uploads/${fileName}` }
    });
  } catch (e) {
    console.error("Error updating user data in DB:", e);
    return new Response("Server error", { status: 500 });
  }
  return new Response(null, {
    status: 302,
    headers: { Location: "/Profile" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
