import { s as sanityClient } from './page-ssr_DmB2BbQ8.mjs';
import { c as createComponent } from './astro-component_ExcyaIsF.mjs';
import { m as maybeRenderHead, h as addAttribute, k as renderTemplate, p as renderComponent } from './entrypoint_TJJ8Tr1W.mjs';
import { r as renderScript, u as urlForImage, H as HOME_QUERY, B as BRANDPARTNER_QUERY, $ as $$Layout } from './global_U5ZjMs6t.mjs';
import 'clsx';

const $$GallerySection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$GallerySection;
  const { items = [] } = Astro2.props;
  const { heroHeadline } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<div class="grid grid-cols-12 gap-2 md:gap-10 max-w-7xl w-full mx-auto mt-4" data-astro-cid-aozjdial> <div class="col-span-12 flex flex-col justify-center mt-0 lg:col-span-4" data-astro-cid-aozjdial> <h2 class="text-brand-white-100 heading font-geist-mono text-[4vw] sm:text-[3vw] tracking-tighter font-normal leading-[7vw] sm:leading-9 lg:leading-12 xl:leading-14 mb-4 lg:mb-0 align-middle text-center justify-center lg:text-[2.7vw] px-8 lg:px-0 xl:text-4xl" data-astro-cid-aozjdial> ${heroHeadline} </h2></div> <div class="embla theme-light w-full max-w-7xl mx-auto mt-0 object-contain mb-4 col-span-12 lg:col-span-8" data-astro-cid-aozjdial> <div class="embla__viewport aspect-16/8 mt-2" data-astro-cid-aozjdial> <div class="embla__container h-full" data-astro-cid-aozjdial> ${items.map((item) => renderTemplate`<div class="embla__slide" data-astro-cid-aozjdial> <img${addAttribute(urlForImage(item.image).auto("format").url(), "src")}${addAttribute(item.image?.alt ?? "", "alt")} loading="lazy" data-astro-cid-aozjdial> <div class="embla__caption font-geist-mono text-xs text-brand-white-100 py-1 px-8 bg-black opacity-70 absolute bottom-0 z-10 right-0 w-full flex" data-astro-cid-aozjdial> <div class="max-w-7xl mx-auto text-right grow" data-astro-cid-aozjdial> ${item.title} </div> </div> </div>`)} </div> </div> <div class="embla__controls md:grid md:grid-cols-[auto_1fr] justify-between max-w-7xl mx-auto" data-astro-cid-aozjdial> <div class="embla__buttons hidden invisible lg:block lg:visible" data-astro-cid-aozjdial> <button class="embla__button embla__button--prev" type="button" data-astro-cid-aozjdial> <svg class="embla__button__svg" viewBox="0 0 532 532" data-astro-cid-aozjdial> <path fill="currentColor" d="M355.66 11.354c13.793-13.805 36.208-13.805 50.001 0 13.785 13.804 13.785 36.238 0 50.034L201.22 266l204.442 204.61c13.785 13.805 13.785 36.239 0 50.044-13.793 13.796-36.208 13.796-50.002 0a5994246.277 5994246.277 0 0 0-229.332-229.454 35.065 35.065 0 0 1-10.326-25.126c0-9.2 3.393-18.26 10.326-25.2C172.192 194.973 332.731 34.31 355.66 11.354Z" data-astro-cid-aozjdial></path> </svg> </button> <button class="embla__button embla__button--next" type="button" data-astro-cid-aozjdial> <svg class="embla__button__svg" viewBox="0 0 532 532" data-astro-cid-aozjdial> <path fill="currentColor" d="M176.34 520.646c-13.793 13.805-36.208 13.805-50.001 0-13.785-13.804-13.785-36.238 0-50.034L330.78 266 126.34 61.391c-13.785-13.805-13.785-36.239 0-50.044 13.793-13.796 36.208-13.796 50.002 0 22.928 22.947 206.395 206.507 229.332 229.454a35.065 35.065 0 0 1 10.326 25.126c0 9.2-3.393 18.26-10.326 25.2-45.865 45.901-206.404 206.564-229.332 229.52Z" data-astro-cid-aozjdial></path> </svg> </button> </div> <div class="embla__dots justify-center md:justify-end" data-astro-cid-aozjdial><button class="embla__dot" data-astro-cid-aozjdial></button></div> </div> </div> </div> ${renderScript($$result, "/Users/justinburrow/Sites/pfl-pro-sound-site/src/components/GallerySection.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/justinburrow/Sites/pfl-pro-sound-site/src/components/GallerySection.astro", void 0);

const $$TestimonialsSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$TestimonialsSection;
  const { items } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="testimonials bg-transparent"> ${items.map((item) => renderTemplate`<div class="mb-18 grid grid-cols-6 gap-1 max-w-7xl mx-auto bg-brand-black-800/70 lg:mb-10 fade rounded-sm"> <div class="px-12 pt-2 pb-8 lg:pt-8 lg:pb-8 pr-10 lg:pr-4 col-span-6 lg:col-span-2 order-2 flex justify-end"> <img class="relative top-0 w-full object-cover aspect-4-3 fade border border-brand-black-600 max-w-4/5 lg:max-w-none"${addAttribute(urlForImage(item.image).url(), "src")}${addAttribute(item.image.alt, "alt")}> </div> <div class="px-12 py-8 pb-0 lg:pb-8 col-span-6 lg:col-span-4 flex flex-col items-start"> <p class="font-oswald uppercase text-brand-black-200 text-xs font-normal border-brand-accent-300 border-b-2 inline pr-6 pb-1">Client Review</p> <h4 class="font-geist-mono text-2xl mt-4 font-light mb-1 uppercase">${item.clientName}</h4> <h5 class="mb-4 text-sm text-brand-accent-300 font-light p-0"><span class="font-bold">${item.reviewerName}</span> - ${item.reviewerTitle}</h5> <p class="max-w-2xl font-geist-mono text-sm mb-8 text-brand-black-50 leading-6 italic">"${item.quote}"</p> </div> </div>`)} </section>`;
}, "/Users/justinburrow/Sites/pfl-pro-sound-site/src/components/TestimonialsSection.astro", void 0);

const $$ServicesSection = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$ServicesSection;
  const { services, image } = Astro2.props;
  return renderTemplate`${maybeRenderHead()}<section class="grid grid-cols-8 gap-1 max-w-7xl mx-auto mb-4 lg:mb-18 rounded-sm"> <div class="row-span-3 bg-brand-black-800/70 py-0 lg:py-6 px-12 fade col-span-5 relative collapse lg:visible flex items-end pr-10 lg:pr-4"> <img${addAttribute(urlForImage(image).url(), "src")}${addAttribute(image?.alt, "alt")} class="relative top-0 max-w-full object-contain border border-brand-black-600 hidden lg:block"> </div> ${services.map((service) => renderTemplate`<div class="bg-brand-black-800/70 py-6 px-8 fade col-span-12 rounded-xs border-b border-brand-black-600 lg:col-span-3 last:border-0"> <h3 class="font-oswald uppercase text-gray-200 font-normal tracking text-xl mb-3 mt-6">${service.title}</h3> <p class="font-geist-mono text-sm font-light text-gray-100 leading-6">${service.description}</p> </div>`)} </section>`;
}, "/Users/justinburrow/Sites/pfl-pro-sound-site/src/components/ServicesSection.astro", void 0);

const $$ImageText = createComponent(($$result, $$props, $$slots) => {
  return renderTemplate``;
}, "/Users/justinburrow/Sites/pfl-pro-sound-site/src/components/ImageText.astro", void 0);

const $$Index = createComponent(async ($$result, $$props, $$slots) => {
  const { home, events, testimonials } = await sanityClient.fetch(HOME_QUERY);
  const brandPartners = await sanityClient.fetch(BRANDPARTNER_QUERY);
  console.log(home.testimonials);
  const sectionComponents = {
    testimonialsSection: $$TestimonialsSection,
    servicesSection: $$ServicesSection,
    imageText: $$ImageText
  };
  const extraProps = {
    gallerySection: { items: events },
    testimonialsSection: { items: home.testimonials },
    servicesSection: { image: home.servicesImage }
  };
  return renderTemplate`${renderComponent($$result, "Layout", $$Layout, { "data-astro-cid-j7pv25f6": true }, { "default": async ($$result2) => renderTemplate` ${maybeRenderHead()}<section class="w-full relative pb-16 mb-8 bg-brand-black-900/60 backdrop-blur-md mx-auto max-w-7xl p-2 md:p-6 rounded-sm mt-8 px-2 md:px-4 lg:px-20 fade" data-astro-cid-j7pv25f6> ${renderComponent($$result2, "GallerySection", $$GallerySection, { "heroHeadline": home.heroHeadline, "items": home.events, "data-astro-cid-j7pv25f6": true })} </section> ${home.sections?.map((section) => {
    const Section = sectionComponents[section._type];
    if (!Section) return null;
    const extra = extraProps[section._type] ?? {};
    return renderTemplate`${renderComponent($$result2, "Section", Section, { ...section, ...extra, "data-astro-cid-j7pv25f6": true })}`;
  })}<section class="w-full max-w-5xl mx-auto p-2 mb-8 fade" data-astro-cid-j7pv25f6> <div class="bg-brand-black-800/70 backdrop-blur-lg rounded-md py-4 px-8 grid grid-cols-12 gap-x-2 md:gap-x-10  text-center logos align-middle" data-astro-cid-j7pv25f6> <div class="col-span-10 col-start-2 text-center font-bold font-geist-mono text-xs uppercase pt-2 py-4 mb-2 text-brand-white" data-astro-cid-j7pv25f6>
PFL Pro Sound has provided support for:
</div> ${brandPartners?.map((bp) => renderTemplate`<div class="col-span-4 md:col-span-2 px-4 sm:px-8 md:px-2 flex align-middle justify-center max-w-[25vw] sm:max-w-[20vw]" data-astro-cid-j7pv25f6> <img class="-mt-2 object-contain max-h-15 opacity-60"${addAttribute(bp.src, "src")}${addAttribute(bp.brandPartnerName, "alt")} loading="lazy" data-astro-cid-j7pv25f6> </div>`)} </div> </section> ` })} ${renderScript($$result, "/Users/justinburrow/Sites/pfl-pro-sound-site/src/pages/index.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/justinburrow/Sites/pfl-pro-sound-site/src/pages/index.astro", void 0);

const $$file = "/Users/justinburrow/Sites/pfl-pro-sound-site/src/pages/index.astro";
const $$url = "";

const _page = /*#__PURE__*/Object.freeze(/*#__PURE__*/Object.defineProperty({
  __proto__: null,
  default: $$Index,
  file: $$file,
  url: $$url
}, Symbol.toStringTag, { value: 'Module' }));

const page = () => _page;

export { page };
