import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const prisma = new PrismaClient();
const POST = async ({ request }) => {
  try {
    const form = await request.formData();
    const email = form.get("email");
    const password = form.get("password");
    if (!email || !password) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: `/L?error=${encodeURIComponent("Please fill in all fields")}`
        }
      });
    }
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: `/L?error=${encodeURIComponent("User not found")}`
        }
      });
    }
    const passwordMatches = await bcrypt.compare(password, user.password);
    if (!passwordMatches) {
      return new Response(null, {
        status: 302,
        headers: {
          Location: `/L?error=${encodeURIComponent("Incorrect password")}`
        }
      });
    }
    return new Response(null, {
      status: 302,
      headers: {
        "Set-Cookie": `user=${encodeURIComponent(email)}; Path=/; HttpOnly; SameSite=Lax; Max-Age=2592000`,
        "Location": "/Profile"
      }
    });
  } catch (error) {
    console.error("Login error:", error);
    return new Response(null, {
      status: 302,
      headers: {
        Location: `/L?error=${encodeURIComponent("Internal error")}`
      }
    });
  }
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
