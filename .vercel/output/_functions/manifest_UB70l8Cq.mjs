import 'kleur/colors';
import { p as decodeKey } from './chunks/astro/server_B7mPuuk8.mjs';
import 'clsx';
import 'cookie';
import { N as NOOP_MIDDLEWARE_FN } from './chunks/astro-designed-error-pages_CXkRHtZe.mjs';
import 'es-module-lexer';

function sanitizeParams(params) {
  return Object.fromEntries(
    Object.entries(params).map(([key, value]) => {
      if (typeof value === "string") {
        return [key, value.normalize().replace(/#/g, "%23").replace(/\?/g, "%3F")];
      }
      return [key, value];
    })
  );
}
function getParameter(part, params) {
  if (part.spread) {
    return params[part.content.slice(3)] || "";
  }
  if (part.dynamic) {
    if (!params[part.content]) {
      throw new TypeError(`Missing parameter: ${part.content}`);
    }
    return params[part.content];
  }
  return part.content.normalize().replace(/\?/g, "%3F").replace(/#/g, "%23").replace(/%5B/g, "[").replace(/%5D/g, "]");
}
function getSegment(segment, params) {
  const segmentPath = segment.map((part) => getParameter(part, params)).join("");
  return segmentPath ? "/" + segmentPath : "";
}
function getRouteGenerator(segments, addTrailingSlash) {
  return (params) => {
    const sanitizedParams = sanitizeParams(params);
    let trailing = "";
    if (addTrailingSlash === "always" && segments.length) {
      trailing = "/";
    }
    const path = segments.map((segment) => getSegment(segment, sanitizedParams)).join("") + trailing;
    return path || "/";
  };
}

function deserializeRouteData(rawRouteData) {
  return {
    route: rawRouteData.route,
    type: rawRouteData.type,
    pattern: new RegExp(rawRouteData.pattern),
    params: rawRouteData.params,
    component: rawRouteData.component,
    generate: getRouteGenerator(rawRouteData.segments, rawRouteData._meta.trailingSlash),
    pathname: rawRouteData.pathname || void 0,
    segments: rawRouteData.segments,
    prerender: rawRouteData.prerender,
    redirect: rawRouteData.redirect,
    redirectRoute: rawRouteData.redirectRoute ? deserializeRouteData(rawRouteData.redirectRoute) : void 0,
    fallbackRoutes: rawRouteData.fallbackRoutes.map((fallback) => {
      return deserializeRouteData(fallback);
    }),
    isIndex: rawRouteData.isIndex,
    origin: rawRouteData.origin
  };
}

function deserializeManifest(serializedManifest) {
  const routes = [];
  for (const serializedRoute of serializedManifest.routes) {
    routes.push({
      ...serializedRoute,
      routeData: deserializeRouteData(serializedRoute.routeData)
    });
    const route = serializedRoute;
    route.routeData = deserializeRouteData(serializedRoute.routeData);
  }
  const assets = new Set(serializedManifest.assets);
  const componentMetadata = new Map(serializedManifest.componentMetadata);
  const inlinedScripts = new Map(serializedManifest.inlinedScripts);
  const clientDirectives = new Map(serializedManifest.clientDirectives);
  const serverIslandNameMap = new Map(serializedManifest.serverIslandNameMap);
  const key = decodeKey(serializedManifest.key);
  return {
    // in case user middleware exists, this no-op middleware will be reassigned (see plugin-ssr.ts)
    middleware() {
      return { onRequest: NOOP_MIDDLEWARE_FN };
    },
    ...serializedManifest,
    assets,
    componentMetadata,
    inlinedScripts,
    clientDirectives,
    routes,
    serverIslandNameMap,
    key
  };
}

const manifest = deserializeManifest({"hrefRoot":"file:///C:/Users/vinayak%20Revisanker/projects/HELL/","cacheDir":"file:///C:/Users/vinayak%20Revisanker/projects/HELL/node_modules/.astro/","outDir":"file:///C:/Users/vinayak%20Revisanker/projects/HELL/dist/","srcDir":"file:///C:/Users/vinayak%20Revisanker/projects/HELL/src/","publicDir":"file:///C:/Users/vinayak%20Revisanker/projects/HELL/public/","buildClientDir":"file:///C:/Users/vinayak%20Revisanker/projects/HELL/dist/client/","buildServerDir":"file:///C:/Users/vinayak%20Revisanker/projects/HELL/dist/server/","adapterName":"@astrojs/vercel","routes":[{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"page","component":"_server-islands.astro","params":["name"],"segments":[[{"content":"_server-islands","dynamic":false,"spread":false}],[{"content":"name","dynamic":true,"spread":false}]],"pattern":"^\\/_server-islands\\/([^/]+?)\\/?$","prerender":false,"isIndex":false,"fallbackRoutes":[],"route":"/_server-islands/[name]","origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"type":"endpoint","isIndex":false,"route":"/_image","pattern":"^\\/_image\\/?$","segments":[[{"content":"_image","dynamic":false,"spread":false}]],"params":[],"component":"node_modules/astro/dist/assets/endpoint/generic.js","pathname":"/_image","prerender":false,"fallbackRoutes":[],"origin":"internal","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/login","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/Login\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"Login","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/Login.ts","pathname":"/api/Login","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/logout","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/Logout\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"Logout","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/Logout.ts","pathname":"/api/Logout","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/profileupdate","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/ProfileUpdate\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"ProfileUpdate","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/ProfileUpdate.ts","pathname":"/api/ProfileUpdate","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/register","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/Register\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"Register","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/Register.ts","pathname":"/api/Register","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[],"routeData":{"route":"/api/uploadprofilepic","isIndex":false,"type":"endpoint","pattern":"^\\/api\\/UploadProfilePic\\/?$","segments":[[{"content":"api","dynamic":false,"spread":false}],[{"content":"UploadProfilePic","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/api/UploadProfilePic.ts","pathname":"/api/UploadProfilePic","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"html,body{margin:0;width:100vw;height:100vh;min-height:100vh;background-color:#36454f;background-image:linear-gradient(#d3423d80,#0000004d);color:#fff;font-family:Inter,Roboto,Helvetica Neue,Arial,sans-serif;box-sizing:border-box}\n"}],"routeData":{"route":"/l","isIndex":false,"type":"page","pattern":"^\\/L\\/?$","segments":[[{"content":"L","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/L.astro","pathname":"/L","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"html,body{margin:0;width:100vw;height:100vh;min-height:100vh;background-color:#36454f;background-image:linear-gradient(#d3423d80,#0000004d);color:#fff;font-family:Inter,Roboto,Helvetica Neue,Arial,sans-serif;box-sizing:border-box}\n"}],"routeData":{"route":"/profile","isIndex":false,"type":"page","pattern":"^\\/Profile\\/?$","segments":[[{"content":"Profile","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/Profile.astro","pathname":"/Profile","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"html,body{margin:0;width:100vw;height:100vh;min-height:100vh;background-color:#36454f;background-image:linear-gradient(#d3423d80,#0000004d);color:#fff;font-family:Inter,Roboto,Helvetica Neue,Arial,sans-serif;box-sizing:border-box}\n"}],"routeData":{"route":"/r","isIndex":false,"type":"page","pattern":"^\\/R\\/?$","segments":[[{"content":"R","dynamic":false,"spread":false}]],"params":[],"component":"src/pages/R.astro","pathname":"/R","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}},{"file":"","links":[],"scripts":[],"styles":[{"type":"inline","content":"html,body{margin:0;width:100vw;height:100vh;min-height:100vh;background-color:#36454f;background-image:linear-gradient(#d3423d80,#0000004d);color:#fff;font-family:Inter,Roboto,Helvetica Neue,Arial,sans-serif;box-sizing:border-box}\n#container[data-astro-cid-mmc7otgs]{min-height:90vh;position:relative}main[data-astro-cid-mmc7otgs]{display:flex;justify-content:center;text-align:center;padding-top:10vh}#hero[data-astro-cid-mmc7otgs]{display:flex;flex-direction:column;align-items:center;padding:16px;color:#131212}h1[data-astro-cid-mmc7otgs]{font-size:2rem;margin-top:.8em;color:#fff}\n"}],"routeData":{"route":"/","isIndex":true,"type":"page","pattern":"^\\/$","segments":[],"params":[],"component":"src/pages/index.astro","pathname":"/","prerender":false,"fallbackRoutes":[],"distURL":[],"origin":"project","_meta":{"trailingSlash":"ignore"}}}],"base":"/","trailingSlash":"ignore","compressHTML":true,"componentMetadata":[["C:/Users/vinayak Revisanker/projects/HELL/src/pages/L.astro",{"propagation":"none","containsHead":true}],["C:/Users/vinayak Revisanker/projects/HELL/src/pages/Profile.astro",{"propagation":"none","containsHead":true}],["C:/Users/vinayak Revisanker/projects/HELL/src/pages/R.astro",{"propagation":"none","containsHead":true}],["C:/Users/vinayak Revisanker/projects/HELL/src/pages/index.astro",{"propagation":"none","containsHead":true}]],"renderers":[],"clientDirectives":[["idle","(()=>{var l=(n,t)=>{let i=async()=>{await(await n())()},e=typeof t.value==\"object\"?t.value:void 0,s={timeout:e==null?void 0:e.timeout};\"requestIdleCallback\"in window?window.requestIdleCallback(i,s):setTimeout(i,s.timeout||200)};(self.Astro||(self.Astro={})).idle=l;window.dispatchEvent(new Event(\"astro:idle\"));})();"],["load","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).load=e;window.dispatchEvent(new Event(\"astro:load\"));})();"],["media","(()=>{var n=(a,t)=>{let i=async()=>{await(await a())()};if(t.value){let e=matchMedia(t.value);e.matches?i():e.addEventListener(\"change\",i,{once:!0})}};(self.Astro||(self.Astro={})).media=n;window.dispatchEvent(new Event(\"astro:media\"));})();"],["only","(()=>{var e=async t=>{await(await t())()};(self.Astro||(self.Astro={})).only=e;window.dispatchEvent(new Event(\"astro:only\"));})();"],["visible","(()=>{var a=(s,i,o)=>{let r=async()=>{await(await s())()},t=typeof i.value==\"object\"?i.value:void 0,c={rootMargin:t==null?void 0:t.rootMargin},n=new IntersectionObserver(e=>{for(let l of e)if(l.isIntersecting){n.disconnect(),r();break}},c);for(let e of o.children)n.observe(e)};(self.Astro||(self.Astro={})).visible=a;window.dispatchEvent(new Event(\"astro:visible\"));})();"]],"entryModules":{"\u0000noop-middleware":"_noop-middleware.mjs","\u0000noop-actions":"_noop-actions.mjs","\u0000@astro-page:src/pages/api/Login@_@ts":"pages/api/login.astro.mjs","\u0000@astro-page:src/pages/api/Logout@_@ts":"pages/api/logout.astro.mjs","\u0000@astro-page:src/pages/api/ProfileUpdate@_@ts":"pages/api/profileupdate.astro.mjs","\u0000@astro-page:src/pages/api/Register@_@ts":"pages/api/register.astro.mjs","\u0000@astro-page:src/pages/api/UploadProfilePic@_@ts":"pages/api/uploadprofilepic.astro.mjs","\u0000@astro-page:src/pages/L@_@astro":"pages/l.astro.mjs","\u0000@astro-page:src/pages/Profile@_@astro":"pages/profile.astro.mjs","\u0000@astro-page:src/pages/R@_@astro":"pages/r.astro.mjs","\u0000@astro-page:src/pages/index@_@astro":"pages/index.astro.mjs","\u0000@astrojs-ssr-virtual-entry":"entry.mjs","\u0000@astro-renderers":"renderers.mjs","\u0000@astro-page:node_modules/astro/dist/assets/endpoint/generic@_@js":"pages/_image.astro.mjs","\u0000@astrojs-ssr-adapter":"_@astrojs-ssr-adapter.mjs","\u0000@astrojs-manifest":"manifest_UB70l8Cq.mjs","C:/Users/vinayak Revisanker/projects/HELL/node_modules/astro/dist/assets/services/sharp.js":"chunks/sharp_lYxHWChL.mjs","@astrojs/solid-js/client.js":"_astro/client.yL8JVs1M.js","astro:scripts/before-hydration.js":""},"inlinedScripts":[],"assets":["/_astro/Hell.G2sXuGpJ.png","/favicon.svg","/uploads/1753806022037_CaptureJPG","/uploads/1753806225749_il_fullxfull6182508322_9ls6avif","/uploads/1753806745425_IMG_0265JPG","/uploads/1753823824998_IMG_E0399JPG","/uploads/1753823920804_IMG_1066PNG","/uploads/1753824701218_IMG_0164JPG","/uploads/1753977769052_IMG_1881PNG","/uploads/1753977845298_TheWitcher3WildHunt3jpg","/_astro/client.yL8JVs1M.js"],"buildFormat":"directory","checkOrigin":true,"serverIslandNameMap":[],"key":"IgfSOZzdPeLrr18EsVg2mbdstcCMOz1SW2fAI/W4rJ8="});
if (manifest.sessionConfig) manifest.sessionConfig.driverModule = null;

export { manifest };
