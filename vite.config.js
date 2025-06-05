import { defineConfig } from 'vite'
import { resolve } from 'node:path'

import vue from '@vitejs/plugin-vue'
import vueDevTools from 'vite-plugin-vue-devtools'
import Components from 'unplugin-vue-components/vite'
import AutoImport from 'unplugin-auto-import/vite'
import UnoCSS from 'unocss/vite'
import Icons from 'unplugin-icons/vite'


// https://vite.dev/config/
export default defineConfig({
  plugins: [
    vue(),

    AutoImport({
      eslintrc: {
        enabled: true,
      },
      imports: [
        'vue',
        '@vueuse/core',
      ],
      dirs: [
        './src/composables',
      ],
      vueTemplate: true,
    }),

    vueDevTools(),

    Components({
      directoryAsNamespace: true,
      dts: false,
    }),

    UnoCSS(),
    Icons(),
  ],
  resolve: {
    alias: {
    '~/': `${resolve(__dirname, 'src')}/`,
    },
  },

  define: {
    __APP_VERSION__: process.env.NODE_ENV === 'production' ? process.env.VITE_APP_VERSION : JSON.stringify(process.env.VITE_APP_VERSION),
  },

})
