import tailwindcss from "@tailwindcss/vite";
import { defineConfig, fontProviders } from 'astro/config';
import tailwindcss from '@tailwindcss/vite';
import { webcore } from 'webcoreui/integration';
import svelte from '@astrojs/svelte';
import sanity from '@sanity/astro';

import react from '@astrojs/react';

//https://astro.build/config
export default defineConfig({
	integrations: [sanity({
    projectId: 'f28fd9dk',
    dataset: 'production',
    // Set useCdn to false if you're building statically.
    useCdn: false,
  }), svelte(), webcore(), react()],
  apiVersion: '2025-12-08',
  studioBasePath: '/content-studio',
  vite: {
    plugins: [tailwindcss()],
  },
});