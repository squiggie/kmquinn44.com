import { defineConfig } from 'astro/config';
import tailwind from '@astrojs/tailwind';
import node from '@astrojs/node';

export default defineConfig({
  site: 'https://kmquinn44.com',
  output: 'hybrid',
  adapter: node({ mode: 'standalone' }),
  integrations: [tailwind()],
});
