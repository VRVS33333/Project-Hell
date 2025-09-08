import { renderers } from './renderers.mjs';
import { c as createExports, s as serverEntrypointModule } from './chunks/_@astrojs-ssr-adapter_0QoLU35N.mjs';
import { manifest } from './manifest_UB70l8Cq.mjs';

const serverIslandMap = new Map();;

const _page0 = () => import('./pages/_image.astro.mjs');
const _page1 = () => import('./pages/api/login.astro.mjs');
const _page2 = () => import('./pages/api/logout.astro.mjs');
const _page3 = () => import('./pages/api/profileupdate.astro.mjs');
const _page4 = () => import('./pages/api/register.astro.mjs');
const _page5 = () => import('./pages/api/uploadprofilepic.astro.mjs');
const _page6 = () => import('./pages/l.astro.mjs');
const _page7 = () => import('./pages/profile.astro.mjs');
const _page8 = () => import('./pages/r.astro.mjs');
const _page9 = () => import('./pages/index.astro.mjs');
const pageMap = new Map([
    ["node_modules/astro/dist/assets/endpoint/generic.js", _page0],
    ["src/pages/api/Login.ts", _page1],
    ["src/pages/api/Logout.ts", _page2],
    ["src/pages/api/ProfileUpdate.ts", _page3],
    ["src/pages/api/Register.ts", _page4],
    ["src/pages/api/UploadProfilePic.ts", _page5],
    ["src/pages/L.astro", _page6],
    ["src/pages/Profile.astro", _page7],
    ["src/pages/R.astro", _page8],
    ["src/pages/index.astro", _page9]
]);

const _manifest = Object.assign(manifest, {
    pageMap,
    serverIslandMap,
    renderers,
    actions: () => import('./_noop-actions.mjs'),
    middleware: () => import('./_noop-middleware.mjs')
});
const _args = {
    "middlewareSecret": "87bd3fef-ae5e-4e79-81c6-aca0fde2f530",
    "skewProtection": false
};
const _exports = createExports(_manifest, _args);
const __astrojsSsrVirtualEntry = _exports.default;
const _start = 'start';
if (Object.prototype.hasOwnProperty.call(serverEntrypointModule, _start)) ;

export { __astrojsSsrVirtualEntry as default, pageMap };
