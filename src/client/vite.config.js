import { fileURLToPath, URL } from "url";
import react from "@vitejs/plugin-react";
import { defineConfig, loadEnv } from "vite";

export default defineConfig(({ mode }) => {
    const env = loadEnv(mode, process.cwd(), "");

    return {
        build: {
            emptyOutDir: true,
            sourcemap: false,
        },
        css: {
            postcss: "./postcss.config.js",
        },
        server: {
            host: process.env.VITE_HOST || "localhost",
            port: parseInt(process.env.VITE_PORT || "5173"),
            headers: [{
                key: "Content-Security-Policy",
                value: "default-src 'self'; script-src 'self' 'unsafe-eval'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https: blob:; connect-src 'self' http://localhost:* https://*.googleapis.com https://*.firebaseio.com https://*.google.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com; font-src 'self' data: https:; object-src 'none'; frame-ancestors 'none';"
            }],
            proxy: {
                "/auth": {
                    target: "http://localhost:3001",
                    changeOrigin: true,
                },
                "/api": {
                    target: "http://localhost:3001",
                    changeOrigin: true,
                },
            },
        },
        define: {
            "process.env": env,
        },
        plugins: [react()],
        resolve: {
            alias: {
                "@": fileURLToPath(new URL("./src",
                    import.meta.url)),
            },
        },
    };
});