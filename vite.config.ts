import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { VitePWA } from 'vite-plugin-pwa'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    VitePWA({
      registerType: 'autoUpdate',

      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,woff2}'],

        navigateFallback: '/index.html',
        navigateFallbackDenylist: [/^\/~oauth/],

        runtimeCaching: [
          {
            urlPattern: /^https:\/\/fonts\.googleapis\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-stylesheets',
            },
          },
          {
            urlPattern: /^https:\/\/fonts\.gstatic\.com\/.*/i,
            handler: 'CacheFirst',
            options: {
              cacheName: 'google-fonts-webfonts',
            },
          },
        ],
      },

      devOptions: {
        enabled: false,
      },
    })
  ],
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
  server: {
    port: 5153,
    host: true,
  },
  preview: {
    port: 5153,
    host: true,
  },
});
