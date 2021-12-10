import { StoreType } from './../../types/store'
import { AxiosResponse } from 'axios'
import { message } from 'ant-design-vue'

export default function (response: AxiosResponse, store: StoreType): AxiosResponse {
  if (response.status === 200) {
    if (response.data.code === 400) {
      message.error('当前用户登录已过期，请重新登录')
      setTimeout(() => {
        ;(store as any).onLogout && (store as any).onLogout()
      }, 1500)
    }
  }
  return response
}
