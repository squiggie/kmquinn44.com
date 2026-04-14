import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';

export default defineConfig({
  site: 'https://kmquinn44.com',
  output: 'static',
  integrations: [tailwind()],
});
