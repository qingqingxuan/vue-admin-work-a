import { createApp } from 'vue'
import App from './App.vue'
import LayoutStore from './layouts'
import './styles/index.css'
import router from './router'
import { DeviceType } from './types/store'
import './utils/router'
import '../mock'
import 'ant-design-vue/dist/antd.css'
import './styles/theme/antd.dark.min.css'
import './styles/theme/antd.min.css'
import pinia from './store/pinia'

function getScreenType() {
  const width = document.body.clientWidth
  if (width <= 768) {
    return DeviceType.MOBILE
  } else if (width < 992 && width > 768) {
    return DeviceType.PAD
  } else if (width < 1200 && width >= 992) {
    return DeviceType.PC
  } else {
    return DeviceType.PC
  }
}

const app = createApp(App)
app.use(LayoutStore, {
  state: {
    device: getScreenType(),
  },
  actions: {
    onPersonalCenter() {
      router.push('/personal')
    },
    onLogout() {
      router.replace({ path: '/login', query: { redirect: '/' } }).then(() => {
        window.location.reload()
      })
    },
  },
})
app.use(pinia)
app.use(router)
router.isReady().then(() => {
  app.mount('#app')
})
