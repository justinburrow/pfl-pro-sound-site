import './page-ssr_DmB2BbQ8.mjs';
import { c as createComponent } from './astro-component_ExcyaIsF.mjs';
import { p as renderComponent, k as renderTemplate, m as maybeRenderHead } from './entrypoint_TJJ8Tr1W.mjs';
import { r as renderScript, $ as $$Layout } from './global_U5ZjMs6t.mjs';

const $$Services = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="w-full max-w-7xl mx-auto p-6 pb-16 my-8 bg-gray-900/50 backdrop-blur-2xl fade"></section> ` })}  ${renderScript($$result, "/Users/justinburrow/Sites/pfl-pro-sound-site/src/pages/services.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/justinburrow/Sites/pfl-pro-sound-site/src/pages/services.astro", void 0);

const $$file = "/Users/justinburrow/Sites/pfl-pro-sound-site/src/pages/services.astro";
const $$url = "/services";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Services,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
