import { e as createComponent, f as createAstro, m as maybeRenderHead, h as addAttribute, r as renderTemplate, k as renderComponent, l as Fragment } from '../chunks/astro/server_B7mPuuk8.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_BVyvZ-AZ.mjs';
/* empty css                                 */
import { PrismaClient } from '@prisma/client';
export { renderers } from '../renderers.mjs';

const hell = new Proxy({"src":"/_astro/Hell.G2sXuGpJ.png","width":750,"height":1334,"format":"png"}, {
						get(target, name, receiver) {
							if (name === 'clone') {
								return structuredClone(target);
							}
							if (name === 'fsPath') {
								return "C:/Users/vinayak Revisanker/projects/HELL/src/assets/Hell.png";
							}
							
							return target[name];
						}
					});

const $$Astro$1 = createAstro();
const $$Welcome = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro$1, $$props, $$slots);
  Astro2.self = $$Welcome;
  const { user } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div id="container" data-astro-cid-mmc7otgs> ${user ? renderTemplate`<a href="/Profile" style="
      position: absolute;
      top: 20px;
      right: 20px;
      display: flex;
      align-items: center;
      gap: 0.5rem;
      background: #1f2937;
      padding: 10px 16px;
      border-radius: 8px;
      text-decoration: none;
      color: white;
      font-weight: 600;
    " data-astro-cid-mmc7otgs> <img${addAttribute(user.profilePic || "/default-avatar.png", "src")} alt="Profile" style="width: 32px; height: 32px; border-radius: 50%; object-fit: cover;" data-astro-cid-mmc7otgs> <span data-astro-cid-mmc7otgs>${user.firstName ?? "Profile"}</span> </a>` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-mmc7otgs": true }, { "default": ($$result2) => renderTemplate` <a href="/R" style="
        position: absolute;
        top: 20px;
        right: 20px;
        background: #121213;
        color: rgb(240, 9, 9);
        padding: 10px 16px;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 600;
        z-index: 2;
      " data-astro-cid-mmc7otgs>Register</a> <a href="/L" style="
        position: absolute;
        top: 20px;
        right: 120px;
        background: #121213;
        color: rgb(29, 184, 93);
        padding: 10px 16px;
        border-radius: 8px;
        text-decoration: none;
        font-weight: 600;
        z-index: 2;
      " data-astro-cid-mmc7otgs>Login</a> ` })}`} <main data-astro-cid-mmc7otgs> <section id="hero" data-astro-cid-mmc7otgs> <a href="https://astro.build" data-astro-cid-mmc7otgs> <img${addAttribute(hell.src, "src")} width="600" height="600" alt="Astro Homepage" data-astro-cid-mmc7otgs> </a> <h1 data-astro-cid-mmc7otgs>
Welcome
${user ? renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-mmc7otgs": true }, { "default": ($$result2) => renderTemplate` back, <strong style="color: red;" data-astro-cid-mmc7otgs>${user.firstName}</strong>!` })}` : renderTemplate`${renderComponent($$result, "Fragment", Fragment, { "data-astro-cid-mmc7otgs": true }, { "default": ($$result2) => renderTemplate` Click <strong style="color: red;" data-astro-cid-mmc7otgs>Register</strong> to create an account.<br data-astro-cid-mmc7otgs>
Already have an account? Hit <strong style="color: green;" data-astro-cid-mmc7otgs>Login</strong>.` })}`} </h1> </section> </main> </div> `;
}, "C:/Users/vinayak Revisanker/projects/HELL/src/components/Welcome.astro", void 0);

const $$Astro = createAstro();
const prerender = false;
const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Index;
  const prisma = new PrismaClient();
  const req = Astro2.request;
  const cookies = Object.fromEntries(
    (req.headers.get("cookie") ?? "").split("; ").map((c) => c.split("=").map(decodeURIComponent))
  );
  const userEmail = cookies.user || null;
  let user = null;
  if (userEmail) {
    user = await prisma.user.findUnique({
      where: { email: userEmail },
      select: {
        email: true,
        firstName: true,
        profilePic: true
      }
    });
  }
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${renderComponent($$result2, "Welcome", $$Welcome, { "user": user })} ` })}`;
}, "C:/Users/vinayak Revisanker/projects/HELL/src/pages/index.astro", void 0);

const $$file = "C:/Users/vinayak Revisanker/projects/HELL/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
	__proto__: null,
	default: $$Index,
	file: $$file,
	prerender,
	url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
