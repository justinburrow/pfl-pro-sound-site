import { s as sanityClient } from './page-ssr_DmB2BbQ8.mjs';
import { c as createComponent } from './astro-component_DlePoCU4.mjs';
import { p as renderComponent, k as renderTemplate, m as maybeRenderHead } from './entrypoint_CiK2YbrO.mjs';
import { T as THANKS_QUERY, r as renderScript, $ as $$Layout } from './global_CxjpIDqN.mjs';

const $$Thanks = createComponent(async ($$result, $$props, $$slots) => {
  const thanksContent = await sanityClient.fetch(THANKS_QUERY);
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, {}, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="w-full max-w-7xl mx-auto p-6 pb-16 my-8 bg-gray-900/50 backdrop-blur-2xl fade"> <h1 class="font-oswald text-3xl uppercase">${thanksContent.heading}</h1> <p class="font-geist-mono text-sm font-thin mt-12">${thanksContent.copy}</p> </section> ` })}  ${renderScript($$result, "/Users/justinburrow/Sites/pfl-pro-sound-site/src/pages/thanks.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/justinburrow/Sites/pfl-pro-sound-site/src/pages/thanks.astro", void 0);

const $$file = "/Users/justinburrow/Sites/pfl-pro-sound-site/src/pages/thanks.astro";
const $$url = "/thanks";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Thanks,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
