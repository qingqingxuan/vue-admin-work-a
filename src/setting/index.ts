import { SETTING_INFO_KEY } from '@/layouts/setting/keys'

export const projectName = 'Vue Admin Work A'
const settingInfo = JSON.parse(localStorage.getItem(SETTING_INFO_KEY) || '{}')
interface Setting {
  projectName: string
  theme: 'light' | 'dark'
  sideTheme: 'dark' | 'white' | 'image'
  themeColor: string
  layoutMode: 'ltr' | 'ttb' | 'lcr'
  sideWidth: number
  pageAnim: 'fade' | 'opacity' | 'down' | 'scale'
  isShowTabbar: boolean
  isFixedNavBar: boolean
  isOpenWaterMark: boolean
  isGray: boolean
  waterMark: string
  actionBar: {
    isShowSearch: boolean
    isShowMessage: boolean
    isShowRefresh: boolean
    isShowFullScreen: boolean
  }
}

export default Object.assign(
  {
    theme: 'light',
    sideTheme: 'dark',
    themeColor: 'cyan@#18a058',
    layoutMode: 'ltr',
    sideWidth: 210,
    pageAnim: 'opacity',
    isShowTabbar: true,
    isFixedNavBar: true,
    isOpenWaterMark: false,
    waterMark: projectName,
    isGray: false,
    actionBar: {
      isShowSearch: true,
      isShowMessage: true,
      isShowRefresh: true,
      isShowFullScreen: true,
    },
  },
  settingInfo
) as Setting
