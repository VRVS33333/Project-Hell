import { e as createComponent, m as maybeRenderHead, r as renderTemplate, f as createAstro, k as renderComponent } from '../chunks/astro/server_B7mPuuk8.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_BVyvZ-AZ.mjs';
import 'clsx';
export { renderers } from '../renderers.mjs';

const $$Register = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<form action="/api/Register" method="POST" style="max-width:500px;margin:auto;padding:1rem;border:1px solid #8a1111;background:rgba(40,20,22,0.65);border-radius:12px;"> <h2>Register</h2> <label>First Name: <input type="text" name="floating_first_name" required></label><br> <label>Last Name: <input type="text" name="floating_last_name" required></label><br> <label>Email: <input type="email" name="floating_email" required></label><br> <label>Phone: <input type="tel" name="floating_phone" required></label><br> <label>Company: <input type="text" name="floating_company" required></label><br> <label>Password: <input type="password" name="floating_password" required></label><br> <label>Confirm Password: <input type="password" name="repeat_password" required></label><br><br> <button type="submit">Register</button> </form>`;
}, "C:/Users/vinayak Revisanker/projects/HELL/src/components/Register.astro", void 0);

const $$Astro = createAstro();
const $$R = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$R;
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
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<a href="/" style="color: #4f46e5;">⬅ Home</a> <h1>Register</h1> ${success === "1" && renderTemplate`<p style="color: green;">✅ Registration successful! Please login.</p>`}${error && renderTemplate`<p style="color: red;">⚠️ ${decodeURIComponent(error)}</p>`}${renderComponent($$result2, "Register", $$Register, {})} ` })}`;
}, "C:/Users/vinayak Revisanker/projects/HELL/src/pages/R.astro", void 0);

const $$file = "C:/Users/vinayak Revisanker/projects/HELL/src/pages/R.astro";
const $$url = "/R";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$R,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
