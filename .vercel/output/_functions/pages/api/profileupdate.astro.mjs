import { PrismaClient } from '@prisma/client';
export { renderers } from '../../renderers.mjs';

const prerender = false;
const prisma = new PrismaClient();
const POST = async ({ request }) => {
  try {
    const form = await request.formData();
    const email = form.get("email");
    if (!email) {
      return new Response(null, { status: 400, statusText: "Email is required" });
    }
    const firstName = form.get("firstName");
    const lastName = form.get("lastName");
    const phone = form.get("phone");
    const company = form.get("company");
    await prisma.user.update({
      where: { email },
      data: {
        firstName: firstName ?? void 0,
        lastName: lastName ?? void 0,
        phone: phone ?? void 0,
        company: company ?? void 0
      }
    });
    return new Response(null, {
      status: 302,
      headers: { Location: "/Profile" }
    });
  } catch (error) {
    console.error("Profile update error:", error);
    return new Response(null, {
      status: 500,
      statusText: "Internal Server Error"
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
