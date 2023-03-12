import { defineConfig, splitVendorChunkPlugin } from 'vite';
import vue from '@vitejs/plugin-vue';
import basicSsl from '@vitejs/plugin-basic-ssl';
import { resolve } from 'path';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [vue(), basicSsl(), splitVendorChunkPlugin()],
  server: {
    port: 3400,
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          'mapbox-gl': ['mapbox-gl'],
          'vue-mapbox-gl': ['@studiometa/vue-mapbox-gl'],
        },
      },
    },
  },
});
