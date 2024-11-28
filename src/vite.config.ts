import { defineConfig } from 'vite';
import electron from 'vite-plugin-electron/simple';
import react from '@vitejs/plugin-react';
import pkg from './package.json';
import path from 'node:path';

export default defineConfig(({ command }) => {
    const isServe = command === 'serve';
    const isBuild = command === 'build';
    const sourcemap = isServe || !!process.env.VSCODE_DEBUG;

    return {
        base: './',
        server: {
            port: 3000,
        },
        plugins: [
            react(),
            electron({
                main: {
                    // Main-Process entry file of the Electron App.
                    entry: path.join(__dirname, 'electron/main.ts'),
                    onstart(args) {
                        args.startup();
                    },
                    vite: {
                        build: {
                            sourcemap,
                            minify: isBuild,
                            outDir: 'dist/electron',
                            rollupOptions: {
                                external: Object.keys(
                                    'dependencies' in pkg
                                        ? pkg.dependencies
                                        : {}
                                ),
                            },
                        },
                    },
                },
                preload: {
                    input: path.join(__dirname, 'electron/preload.ts'),
                    vite: {
                        build: {
                            sourcemap: sourcemap ? 'inline' : undefined,
                            minify: isBuild,
                            outDir: 'dist/electron',
                            rollupOptions: {
                                external: Object.keys(
                                    'dependencies' in pkg
                                        ? pkg.dependencies
                                        : {}
                                ),
                            },
                        },
                    },
                },
                renderer: {},
            }),
        ],
        clearScreen: false,
    };
});
