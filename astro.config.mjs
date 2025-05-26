// @ts-check
import { defineConfig } from 'astro/config';

import react from '@astrojs/react';

import tailwindcss from '@tailwindcss/vite';

import mdx from '@astrojs/mdx';

import sitemap from '@astrojs/sitemap';

// https://astro.build/config
export default defineConfig({
  site:'https://Andu-alem.github.io',
  output: 'static',
  integrations: [react(), mdx(), sitemap()],
  prefetch: {
    prefetchAll: true
  },
  vite: {
    plugins: [tailwindcss()]
  },
  i18n: {
    locales: ["am", "en"],
    defaultLocale: "en",
  }
});