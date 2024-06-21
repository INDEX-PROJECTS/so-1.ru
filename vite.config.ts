import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import tsconfigPaths from 'vite-tsconfig-paths';
import svgr from 'vite-plugin-svgr';

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react(),
        svgr(),
        tsconfigPaths()],
    build: {
        minify: true,
    },
    preview: {
        host: true,
        port: 3000,
        strictPort: true,
    },
    server: {
        host: true,
        port: 3000,
        strictPort: true,
        watch: {
            usePolling: true,
        },
    },
});
