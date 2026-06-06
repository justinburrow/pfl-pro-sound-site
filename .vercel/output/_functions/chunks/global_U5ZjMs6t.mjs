import { c as createComponent } from './astro-component_ExcyaIsF.mjs';
import { v as createRenderInstruction, h as addAttribute, k as renderTemplate, m as maybeRenderHead, p as renderComponent, q as renderHead, o as renderSlot, w as renderTransition } from './entrypoint_TJJ8Tr1W.mjs';
import 'flowbite';
import { s as sanityClient } from './page-ssr_DmB2BbQ8.mjs';
import 'clsx';
import { createImageUrlBuilder } from '@sanity/image-url';
import { createClient } from '@sanity/client';
import groq, { defineQuery } from 'groq';

async function renderScript(result, id) {
  const inlined = result.inlinedScripts.get(id);
  let content = "";
  if (inlined != null) {
    if (inlined) {
      content = `<script type="module">${inlined}</script>`;
    }
  } else {
    const resolved = await result.resolve(id);
    content = `<script type="module" src="${result.userAssetsBase ? (result.base === "/" ? "" : result.base) + result.userAssetsBase : ""}${resolved}"></script>`;
  }
  return createRenderInstruction({ type: "script", id, content });
}

const $$CommonHead = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$CommonHead;
  const { settings } = Astro2.props;
  return renderTemplate`<meta charset="UTF-8"><meta name="viewport" content="width=device-width"><link rel="icon" type="image/svg+xml" href="/favicon.svg"><meta name="generator"${addAttribute(Astro2.generator, "content")}><title>${settings.title}</title>`;
}, "/Users/justinburrow/Sites/pfl-pro-sound-site/src/components/CommonHead.astro", void 0);

const imageBuilder = createImageUrlBuilder(sanityClient);
function urlForImage(source) {
  return imageBuilder.image(source);
}

const $$Header = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Header;
  const { settings } = Astro2.props;
  const { instagramUrl } = Astro2.props;
  const logoUrl = urlForImage(settings.logo[0].logoImage);
  return renderTemplate`${maybeRenderHead()}<header class="fixed md:relative w-full z-10 bg-brand-black-800/85 px-8"> <div class="flex mx-auto flex-row gap-10 relative max-w-7xl items-center py-2 px-0"> <div class="text-brand-white-100 flex flex-row py-4 md:grow"> <a href="/"> <img class="w-[48vw] sm:w-[40vw] md:w-full md:max-w-65"${addAttribute(logoUrl.url(), "src")}${addAttribute(settings.logo[0].logoAlt || settings.title, "alt")}> <h1 class="sr-only">${settings.title}</h1> </a> </div> <div class="flex grow md:grow-0 justify-end relative"> <nav class="justify-end flex font-geist-mono font-bold text-sm text-brand-white-100 tracking-tight relative"> <button data-collapse-toggle="navbar-solid" type="button" id="navbar-hamburger" class="inline-flex items-center p-2 w-12 h-12 justify-center text-sm text-body rounded-sm md:hidden hover:bg-neutral-secondary-soft hover:text-heading focus:outline-none focus:ring-2 focus:ring-neutral-tertiary border border-brand-white-50/60 z-20" aria-controls="navbar-solid" aria-expanded="false"> <span class="sr-only">Open main menu</span> <svg class="w-10 h-10" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" width="30" height="30" fill="none" viewBox="0 0 24 24"><path stroke="currentColor" stroke-linecap="round" stroke-width="2" d="M5 7h14M5 12h14M5 17h14"></path></svg> </button> <div class="hidden w-auto absolute top-14 md:top-0 md:right-0 -right-8 z-10 md:relative md:block md:w-auto p-4 md:p-0 md:ml-0 pl-4 ml-6 md:pl-0 bg-brand-black-800/30 drop-shadow-brand-black-900/30 backdrop-blur-md drop-shadow-md rounded-sm align-middle self-center justify-center" id="navbar-solid"> <ul class="text-brand-white-100 flex gap-y-10 md:gap-y-6 md:gap-6 text-left md:text-center list-none flex-col md:flex-row w-full p-8 md:p-0"> <li class="w-full md:w-auto"> <a href="/about-us" class="stroke-brand-white-100 md:border-transparent border md:bg-transparent text-left md:text-center text-brand-white-100 rounded-sm px-2.5 py-2 lowercase hover:border-white transition duration-200 w-full md:w-auto">
about us
</a> </li> <li> <a href="/contact" class="md:border-brand-orange-500/80 border md:bg-brand-orange-500/80 text-left stroke-brand-white-100 md:text-center  text-brand-white-100 rounded-sm px-2.5 py-2 lowercase hover:bg-brand-orange-500/60 transition-colors duration-200">
contact
</a> </li> <li class="w-full md:w-auto"> <a${addAttribute(instagramUrl, "href")} target="_blank" class="mt-0 md:-mt-3  md:border text-right pl-0 flex justify-self-end w-full md:w-auto stroke-brand-white-100 rounded-sm md:px-2.5 md:py-2  lowercase hover:stroke-brand-orange-300 transition-colors duration-200"> <span class="flex"> <svg width="30px" height="30px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" class=""><path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16Z" stroke-width="1.5"></path><path d="M17.5 6.51L17.51 6.49889" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg> <span class="leading-6 ml-1 md:sr-only">Instagram</span> </span> </a> </li> </ul> </div> </nav> </div> </div> </header> ${renderScript($$result, "/Users/justinburrow/Sites/pfl-pro-sound-site/src/components/Header.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/justinburrow/Sites/pfl-pro-sound-site/src/components/Header.astro", void 0);

const $$Footer = createComponent(($$result, $$props, $$slots) => {
  const Astro2 = $$result.createAstro($$props, $$slots);
  Astro2.self = $$Footer;
  const { settings } = Astro2.props;
  const { instagramUrl } = Astro2.props;
  const logoUrl = urlForImage(settings.logo[0].logoImage);
  const d = /* @__PURE__ */ new Date();
  const year = d.getFullYear();
  return renderTemplate`${maybeRenderHead()}<footer class="w-full bg-brand-black-800/85 pt-10 mt-10 pb-2 px-4"> <div class="max-w-7xl mx-auto py-2 px-4 fade text-brand-white-100 grid grid-cols-6"> <div class="col-span-2 lg:col-span-1 lg:text-right font-geist-mono text-xs font-thin leading-6 lowercase"> <ul> <li> <a href="/">- Home</a> </li> <li> <a href="/about-us">- About Us</a> </li> <li class="lg:hidden"> <a href="/contact">- Contact</a> </li> </ul> </div> <div class="hidden lg:visible col-span-2 lg:col-span-1 md:text-right font-geist-mono text-xs font-bold lowercase"> <ul class="w-full"> <li class="text-right"> <a href="/contact">- Contact</a> </li> </ul> </div> <div class="mt-2 sm:mt-4 col-span-0 lg:col-span-1 lg:mt-0 md:text-right font-geist-mono text-xs font-thin lowercase"> <ul> <li class="lg:text-right -mt-1"> <a${addAttribute(instagramUrl, "href")} target="_blank" class="text-left md:text-right md:justify-self-end inline-block"> <span class="flex"> <svg width="24px" height="24px" stroke-width="1.5" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" color="#ffffff"><path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M3 16V8C3 5.23858 5.23858 3 8 3H16C18.7614 3 21 5.23858 21 8V16C21 18.7614 18.7614 21 16 21H8C5.23858 21 3 18.7614 3 16Z" stroke="#ffffff" stroke-width="1.5"></path><path d="M17.5 6.51L17.51 6.49889" stroke="#ffffff" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg> <span class="leading-6 ml-1">Instagram</span> </span> </a> </li> </ul> </div> <div class="mt-2 md:mt-0 col-span-6 lg:col-span-3 text-right"> <a href="/" class="text-right"> <div class="flex justify-end"> <img class="max-w-50 text-right w-full"${addAttribute(logoUrl.url(), "src")}${addAttribute(settings.logo[0].logoAlt || settings.title, "alt")}> </div> <h6 class="font-geist-mono text-sm font-thin text-brand-white-100 lowercase mt-2 tracking-wide opacity-45">
www.pflprosound.com
</h6> </a> </div> <div class="col-span-full"> <p class="font-geist-mono text-[2.4vw] sm:text-xs font-normal text-brand-white-100 mt-12 md:mt-16 pt-3 px-4 text-center opacity-45 border-t border-brand-white/45">&#169;${year} <a href="/">${settings.copyright} </a></p></div> </div> </footer>`;
}, "/Users/justinburrow/Sites/pfl-pro-sound-site/src/components/Footer.astro", void 0);

const $$Background = createComponent(async ($$result, $$props, $$slots) => {
  return renderTemplate`${maybeRenderHead()}<div id="shader-canvas" data-astro-cid-y3soregm></div>  ${renderScript($$result, "/Users/justinburrow/Sites/pfl-pro-sound-site/src/components/Background.astro?astro&type=script&index=0&lang.ts")}`;
}, "/Users/justinburrow/Sites/pfl-pro-sound-site/src/components/Background.astro", void 0);

createClient({
  projectId: "z3u9veqi",
  dataset: "production",
  useCdn: false,
  apiVersion: "v2021-10-21"
});
const SITE_SETTINGS_QUERY = defineQuery(`*[_type == 'siteSettings'][0]{
    accentColor,
    title,
    logo,
    copyright,
    social[]{ platform, url },
    seo
  }`);
const HOME_QUERY = groq`{
  "home": *[_type == "homePage"][0]{
    heroHeadline,
    servicesImage,
    "sections": sections[!hidden]{
      _key,
      _type,
      _type == "servicesSection" => {
        services[]{ title, description }
      },
      _type == "imageText" => {
        heading, body, imagePosition, image
      }
    },
    "events": *[_type == "eventHighlight"] | order(orderRank){
      _id, title, image
    },
    "testimonials": *[_type == "testimonial"] | order(orderRank){
      _id, quote, reviewerName, reviewerTitle, clientName, clientUrl, image
    }
  }
}`;
defineQuery(`*[_type == "homePage"][0]{
  heroHeadline,
  "sections": sections[hidden != true]{
    _type,
    _key,

    _type == "servicesSection" => {
      services[]{ title, description }
    },

    _type == "imageText" => {
      heading,
      body,
      imagePosition,
      image
    },

    _type == "testimonialsSection" => {
      "items": *[_type == "testimonial"] | order(orderRank){
        _id, quote, reviewerName, reviewerTitle, clientName, clientUrl, image
      }
    },
  },
}`);
const ABOUT_QUERY = defineQuery(`*[_type == "aboutPage"][0]{
  headingAccent,
  headingCopy,
  lead,
  introBlock,
  ownerBlock
}`);
const CONTACT_QUERY = defineQuery(`*[_type == "contactPage"][0]{
    formId
}`);
const THANKS_QUERY = defineQuery(`*[_type == "thanksPage"][0]{
  heading,
  copy
}`);
const BRANDPARTNER_QUERY = defineQuery(`*[_type == "brandPartner"] | order(orderRank){
      brandPartnerName,
      brandPartnerLink,
      image,
      "src": image.asset->url,
      "mimeType": image.asset->mimeType,
      logoWidthAdjustment
}`);

const $$Layout = createComponent(async ($$result, $$props, $$slots) => {
  const siteSettings = await sanityClient.fetch(SITE_SETTINGS_QUERY);
  const instagramUrl = await sanityClient.fetch('*[_type == "siteSettings"][0].social[platform == "Instagram"][0].url');
  return renderTemplate`<html lang="en" class="dark" data-astro-cid-sckkx6r4${addAttribute(renderTransition($$result, "smooz4hq", "fade", "root"), "data-astro-transition-scope")}> <head>${renderComponent($$result, "CommonHead", $$CommonHead, { "settings": siteSettings, "data-astro-cid-sckkx6r4": true })}${renderHead()}</head> <body class="bg-brand-black-800 antialiased" data-astro-cid-sckkx6r4> <div id="smooth-wrapper" data-astro-cid-sckkx6r4> <div id="smooth-content" class="flex min-h-screen flex-col" data-astro-cid-sckkx6r4> ${renderComponent($$result, "Header", $$Header, { "settings": siteSettings, "instagramUrl": instagramUrl, "data-astro-cid-sckkx6r4": true })} <main class="grow px-2 lg:px-0 mt-20 md:mt-0" data-astro-cid-sckkx6r4> ${renderSlot($$result, $$slots["default"])} </main> ${renderComponent($$result, "Background", $$Background, { "data-astro-cid-sckkx6r4": true })} ${renderComponent($$result, "Footer", $$Footer, { "instagramUrl": instagramUrl, "settings": siteSettings, "data-astro-cid-sckkx6r4": true })} </div> </div>  ${renderScript($$result, "/Users/justinburrow/Sites/pfl-pro-sound-site/src/layouts/Layout.astro?astro&type=script&index=0&lang.ts")}</body></html>`;
}, "/Users/justinburrow/Sites/pfl-pro-sound-site/src/layouts/Layout.astro", "self");

export { $$Layout as $, ABOUT_QUERY as A, BRANDPARTNER_QUERY as B, CONTACT_QUERY as C, HOME_QUERY as H, THANKS_QUERY as T, renderScript as r, urlForImage as u };
