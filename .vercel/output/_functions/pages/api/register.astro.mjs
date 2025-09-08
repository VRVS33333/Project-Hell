import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const prisma = new PrismaClient();
const POST = async ({ request }) => {
  try {
    const form = await request.formData();
    const email = form.get("floating_email");
    const password = form.get("floating_password");
    const confirm = form.get("repeat_password");
    const firstName = form.get("floating_first_name");
    const lastName = form.get("floating_last_name");
    const phone = form.get("floating_phone");
    const company = form.get("floating_company");
    if (!email || !password || !confirm || !firstName || !lastName || !phone || !company) {
      return new Response(null, { status: 302, headers: { Location: `/R?error=${encodeURIComponent("Missing required fields")}` } });
    }
    if (password !== confirm) {
      return new Response(null, { status: 302, headers: { Location: `/R?error=${encodeURIComponent("Passwords do not match")}` } });
    }
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return new Response(null, { status: 302, headers: { Location: `/R?error=${encodeURIComponent("User already exists")}` } });
    }
    const hashed = await bcrypt.hash(password, 10);
    await prisma.user.create({
      data: { email, password: hashed, firstName, lastName, phone, company }
    });
    return new Response(null, { status: 302, headers: { Location: `/R?success=1` } });
  } catch (err) {
    console.error("Registration error:", err);
    return new Response(null, { status: 302, headers: { Location: `/R?error=${encodeURIComponent("Internal server error")}` } });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
