import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import mdx from "@astrojs/mdx";

export default defineConfig({
  site: "https://regcdigital.co.za",
  trailingSlash: "always",
  build: {
    format: "directory",
  },
  integrations: [
    react(),
    tailwind({ applyBaseStyles: false }),
    mdx(),
    sitemap(),
  ],
  server: {
    host: "0.0.0.0",
    port: 5000,
  },
  vite: {
    server: {
      allowedHosts: true,
    },
  },
});
