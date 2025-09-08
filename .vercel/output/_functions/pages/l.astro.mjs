import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead } from '../chunks/astro/server_B7mPuuk8.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_BVyvZ-AZ.mjs';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$L = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$L;
  const cookies = Object.fromEntries(
    (Astro2.request.headers.get("cookie") ?? "").split("; ").map((c) => c.split("=").map(decodeURIComponent))
  );
  const user = cookies.user || null;
  if (user) {
    return Astro2.redirect("/Profile");
  }
  const url = new URL(Astro2.request.url);
  const error = url.searchParams.get("error");
  const success = url.searchParams.get("success");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<a href="/" style="color: #4f46e5;">⬅ Home</a> <h1>Login</h1> ${success === "1" && renderTemplate`<p style="color: green;">✅ Login successful!</p>`}${error && renderTemplate`<p style="color: red;">⚠️ ${decodeURIComponent(error)}</p>`}<form action="/api/Login" method="POST" style="max-width:400px; margin:auto;"> <label>
Email:
<input type="email" name="email" autocomplete="email" required style="width:100%; margin-top:4px;"> </label> <br><br> <label>
Password:
<input type="password" name="password" autocomplete="current-password" required style="width:100%; margin-top:4px;"> </label> <br><br> <button type="submit">Login</button> </form> ` })}`;
}, "C:/Users/vinayak Revisanker/projects/HELL/src/pages/L.astro", void 0);

const $$file = "C:/Users/vinayak Revisanker/projects/HELL/src/pages/L.astro";
const $$url = "/L";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$L,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
