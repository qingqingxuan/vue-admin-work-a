import vue from '@vitejs/plugin-vue'
import viteSvgIcons from 'vite-plugin-svg-icons'
import Components from 'unplugin-vue-components/vite'
import { AntDesignVueResolver } from 'unplugin-vue-components/resolvers'
import path from 'path'
import { defineConfig } from 'vite'
import dotenv from 'dotenv'

export default defineConfig(({ mode }) => {
  const dotenvConfig = dotenv.config({ path: `./.env.${mode}` })
  const dotenvObj = dotenvConfig.parsed
  return {
    base: dotenvObj.BUILD_PATH,
    build: {
      outDir: dotenvObj.BUILD_OUT_DIR || 'dist',
    },
    plugins: [
      vue(),
      viteSvgIcons({
        iconDirs: [path.resolve(process.cwd(), 'src/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      Components({
        resolvers: [AntDesignVueResolver()],
      }),
    ],
    css: {
      preprocessorOptions: {
        less: {
          additionalData: `@import "src/styles/variables.less";`,
          modifyVars: {},
          javascriptEnabled: true,
        },
      },
    },
    resolve: {
      alias: [
        {
          find: '@/',
          replacement: path.resolve(process.cwd(), 'src') + '/',
        },
      ],
    },
    server: {
      open: true,
    },
    optimizeDeps: {
      include: [],
      exclude: ['vue-demi'],
    },
  }
})
