export { renderers } from '../../renderers.mjs';

const prerender = false;
const POST = async () => {
  return new Response(null, {
    status: 302,
    headers: {
      "Set-Cookie": `user=; Path=/; HttpOnly; SameSite=Lax; Max-Age=0`,
      "Location": "/"
    }
  });
};
const GET = async () => {
  return new Response(null, {
    status: 302,
    headers: { "Location": "/" }
  });
};

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  GET,
  POST,
  prerender
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
