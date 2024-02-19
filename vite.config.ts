import { fileURLToPath, URL } from 'node:url'
import { resolve } from 'path'

import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import babel from "vite-plugin-babel";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    babel({
      babelConfig: {
        configFile: true,
        plugins: [
          "module:@jetblack/operator-overloading",
        ]
      },
      include: [
        "*.b.ts",
        "*.b.tsx",
        "*.b.js",
        "*.b.jsx",
      ],
    }),
    vue(),
    vueJsx(),
  ],
  define: { 
    'process.env': {} 
  },
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      '@lib': fileURLToPath(new URL('./lib', import.meta.url)),
    }
  },
  esbuild: {
    sourcemap: false,
  },
  build: {
    lib: {
      // Could also be a dictionary or array of multiple entry points
      entry: resolve(__dirname, 'lib/index.ts'),
      name: 'VueDeclarativeCanvas',
      // the proper extensions will be added
      fileName: 'vue-declarative-canvas',
      formats: ["es", "umd", "cjs"],
    },
    minify: false,
    copyPublicDir: false,
    rollupOptions: {
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vue', 'lodash', '@babel/standalone'],
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vue: 'Vue',
          lodash: '_',
          '@babel/standalone': 'Babel',
        },
      },
    },
  }
})
