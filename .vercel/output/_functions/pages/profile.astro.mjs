import { e as createComponent, f as createAstro, k as renderComponent, r as renderTemplate, m as maybeRenderHead, h as addAttribute } from '../chunks/astro/server_B7mPuuk8.mjs';
import 'kleur/colors';
import { $ as $$Layout } from '../chunks/Layout_BVyvZ-AZ.mjs';
import { PrismaClient } from '@prisma/client';
export { renderers } from '../renderers.mjs';

const $$Astro = createAstro();
const $$Profile = createComponent(async ($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$Astro, $$props, $$slots);
  Astro2.self = $$Profile;
  const cookies = Object.fromEntries(
    (Astro2.request.headers.get("cookie") ?? "").split("; ").map((c) => c.split("=").map(decodeURIComponent))
  );
  const userEmail = cookies.user || null;
  if (!userEmail) {
    return Astro2.redirect("/L?error=Not%20logged%20in");
  }
  const prisma = new PrismaClient();
  const user = await prisma.user.findUnique({
    where: { email: userEmail },
    select: {
      email: true,
      firstName: true,
      lastName: true,
      phone: true,
      company: true,
      profilePic: true
    }
  });
  const url = new URL(Astro2.request.url);
  const success = url.searchParams.get("success");
  const error = url.searchParams.get("error");
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate`  ${maybeRenderHead()}<a href="/" style="display: inline-block; margin-bottom: 1rem; color: #4f46e5; font-weight: bold;">⬅ Back to Home</a> <h1>Welcome, ${user?.firstName ?? "User"}!</h1> ${success && renderTemplate`<p style="color: green;">✅ ${decodeURIComponent(success)}</p>`}${error && renderTemplate`<p style="color: red;">⚠️ ${decodeURIComponent(error)}</p>`} <div style="margin: 1rem 0;"> <img${addAttribute(user.profilePic || "/default-avatar.png", "src")} alt="Profile Picture" style="width:120px; height:120px; border-radius:50%; object-fit:cover; border: 2px solid #555;"> </div>  <form action="/api/UploadProfilePic" method="POST" enctype="multipart/form-data" style="margin-bottom: 2rem;"> <label>Upload New Profile Picture:
<input type="file" name="profilePic" accept="image/*" required> </label> <br><br> <button type="submit">Upload</button> </form>  <form action="/api/ProfileUpdate" method="POST" style="max-width:400px;"> <input type="hidden" name="email"${addAttribute(user.email, "value")}> <label>First Name:
<input type="text" name="firstName"${addAttribute(user.firstName ?? "", "value")} required> </label><br><br> <label>Last Name:
<input type="text" name="lastName"${addAttribute(user.lastName ?? "", "value")} required> </label><br><br> <label>Phone:
<input type="tel" name="phone"${addAttribute(user.phone ?? "", "value")}> </label><br><br> <label>Company:
<input type="text" name="company"${addAttribute(user.company ?? "", "value")}> </label><br><br> <button type="submit">Save Changes</button> </form>  <form action="/api/Logout" method="POST" style="margin-top: 2rem;"> <button type="submit" style="background-color: red; color: white; padding: 10px 16px; border-radius: 8px;">
Logout
</button> </form> ` })}`;
}, "C:/Users/vinayak Revisanker/projects/HELL/src/pages/Profile.astro", void 0);

const $$file = "C:/Users/vinayak Revisanker/projects/HELL/src/pages/Profile.astro";
const $$url = "/Profile";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Profile,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
