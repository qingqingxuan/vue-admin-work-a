import vue from '@vitejs/plugin-vue'
import viteSvgIcons from 'vite-plugin-svg-icons'
import ViteComponents, { AntDesignVueResolver } from 'vite-plugin-components'
import path from 'path'
import dayjs from 'dayjs'

const __VERSION__INFO = {
  name: 'Admin Work A',
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
}

export default ({ command, mode }) => {
  const config = {
    define: {
      __VERSION__INFO: JSON.stringify(__VERSION__INFO),
    },
    plugins: [
      vue(),
      viteSvgIcons({
        iconDirs: [path.resolve(process.cwd(), 'src/icons')],
        symbolId: 'icon-[dir]-[name]',
      }),
      ViteComponents({
        customComponentResolvers: [AntDesignVueResolver()],
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
  if (command === 'build' && mode === 'staging') {
    return Object.assign(
      {
        base: '/vue-admin-work-a/',
      },
      config
    )
  } else {
    return Object.assign(
      {
        base: '/',
      },
      config
    )
  }
}
