// import { defineConfig } from 'vite'
// import react from '@vitejs/plugin-react'

// // https://vite.dev/config/
// export default defineConfig({
//   plugins: [react()],
// })
// vite.config.js
// vite.config.js
// vite.config.js

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// CommonJS module import
import mockerApi from "mocker-api";

export default defineConfig({
  plugins: [react()],
  server: {
    // mocker-api middleware setup
    middlewareMode: false,
    proxy: {},
    setup: ({ app }) => {
      mockerApi(app, {
        mockPath: "mock",

        localEnabled: true,
      });
    },
  },
});
