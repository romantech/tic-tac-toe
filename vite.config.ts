import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import svgr from 'vite-plugin-svgr';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    /**
     * vite-plugin-pwa 플러그인으로 서비스 워커 스크립트 자동 등록
     * 서비스 워커는 웹페이지와 브라우저 사이에서 작동하는 프록시 스크립트
     * 오프라인 모드, 푸시, 백그라운드 데이터 동기화 등의 기능 지원
     * {@link https://vite-pwa-org.netlify.app/guide/}
     * */
    VitePWA({ registerType: 'autoUpdate' }),
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
