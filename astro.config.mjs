// @ts-check
import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";

// https://astro.build/config
export default defineConfig({
  integrations: [tailwind(), mdx()],
  i18n: {
    defaultLocale: "ru",
    locales: ["ru", "ua", "fr"],
  },
  markdown: {
    syntaxHighlight: 'shiki',
    remarkPlugins: [],
    rehypePlugins: [],
  }
});
