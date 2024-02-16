import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tsconfigPaths(),
    svgr({
      svgrOptions: {
        icon: true,
        replaceAttrValues: { '#000000': 'currentColor', '#ffffff': 'currentColor' },
      },
    }),
  ],
  server: {
    open: true,
    port: 5173,
    host: true, // 외부 장치에서 접근 허용
  },
});
