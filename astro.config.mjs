import tailwindcss from "@tailwindcss/vite";
import { defineConfig } from 'astro/config';
import { webcore } from 'webcoreui/integration';
import astrolab from 'astrolab-ui';
import svelte from '@astrojs/svelte';
import sanity from '@sanity/astro';
import react from '@astrojs/react';
import vercel from '@astrojs/vercel';
import metaTags from 'astro-meta-tags';
import showTailwindcssBreakpoint from 'astro-show-tailwindcss-breakpoint';

//https://astro.build/config
export default defineConfig({
  integrations: [
    svelte(),
    webcore(),
    sanity({
      projectId: 'z3u9veqi',
      dataset: 'production',
      useCdn: false,
      studioBasePath: '/admin',
      stega: {
        studioUrl: '/admin',
      },
      // log server-side Sanity requests
      logClientRequests: 'dev',
    }),
    react(),
    metaTags(),
    showTailwindcssBreakpoint(),
    astrolab({
      componentsDir: 'src/components',
      stylesheets: ['src/styles/global.css'],
      scripts: ['src/lib/utils.ts', 'src/lib/sanity.ts'],
    }),
  ],

  vite: {
    plugins: [tailwindcss()],
    optimizeDeps: {
      include: ['astro/toolbar'],
    },
  },

  env: {
    schema: {
      //
    },
  },

  devToolbar: {
    enabled: true,
  },
  output: 'server',
  adapter: vercel(),
});