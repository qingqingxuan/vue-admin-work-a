import { SideTheme, RouteRecordRawWithHidden } from './../types/store'
import { reactive } from 'vue'
import { DeviceType, LayoutMode, StateType, ThemeMode } from '../types/store'
import { transfromRoutes } from '../utils'
import CachedViewAction from './modules/cached-view'
import VisitedViewAction from './modules/visited-view'
import { RouteRecordRaw } from 'vue-router'
import Setting from '../setting'
import { useChangeMenuWidth } from '../hooks/useMenuWidth'
import useGray from '../hooks/useGray'

function presistSettingInfo(setting: any) {
  localStorage.setItem('setting-info', JSON.stringify(setting))
}

!localStorage.getItem('setting-info') && presistSettingInfo(Setting)

const primaryColor = Setting.themeColor.split('@')[1]

const originState = {
  isCollapse: false,
  isFixedNavBar: Setting.isFixedNavBar,
  layoutMode: Setting.layoutMode,
  device: DeviceType.PC,
  theme: Setting.theme,
  sideBarBgColor: Setting.sideTheme,
  pageAnim: Setting.pageAnim,
  isShowTabbar: Setting.isShowTabbar,
  waterMark: Setting.waterMark,
  isOpenWaterMark: Setting.isOpenWaterMark,
  isGray: Setting.isGray,
  themeOverrides: {
    common: {
      primaryColor: primaryColor,
      primaryColorHover: primaryColor,
    },
  },
  sideThemeOverrides: {
    common: {
      cardColor: '',
    },
  },
  permissionRoutes: [],
  visitedView: [],
  cachedView: [],
  userInfo: {
    nickName: '超级管理员',
    avatar: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
  },
  actionItem: {
    showSearch: Setting.actionBar.isShowSearch,
    showMessage: Setting.actionBar.isShowMessage,
    showFullScreen: Setting.actionBar.isShowFullScreen,
    showRefresh: Setting.actionBar.isShowRefresh,
  },
}

const store = {
  state: reactive<StateType>(originState),
  start({ state, actions }: any): void {
    state && (this.state = Object.assign(this.state, state))
    if (actions) {
      for (const key in actions) {
        ;(this as any)[key] = actions[key]
      }
    }
    useChangeMenuWidth(Setting.sideWidth)
    useGray(Setting.isGray)
    this.restoreVisitedView()
  },
  toggleCollapse(newStatus: boolean) {
    this.state.isCollapse = newStatus
  },
  toggleFixedNavBar(newStatus: boolean) {
    this.state.isFixedNavBar = newStatus
  },
  changeLayoutMode(mode: LayoutMode) {
    this.state.layoutMode = mode
    presistSettingInfo(
      Object.assign(Setting, {
        layoutMode: mode,
      })
    )
  },
  changeDevice(device: DeviceType) {
    this.state.device = device
  },
  changeTheme(theme: ThemeMode) {
    this.state.theme = theme
    presistSettingInfo(
      Object.assign(Setting, {
        theme,
      })
    )
  },
  changeSideBarBgColor(colorName: SideTheme) {
    this.state.sideBarBgColor = colorName
    presistSettingInfo(
      Object.assign(Setting, {
        sideTheme: colorName,
      })
    )
  },
  changePageAnim(pageAnim: string) {
    this.state.pageAnim = pageAnim
    presistSettingInfo(
      Object.assign(Setting, {
        pageAnim,
      })
    )
  },
  changePrimaryColor(item: any) {
    this.state.themeOverrides.common.primaryColor = item.value
    this.state.themeOverrides.common.primaryColorHover = item.value
    presistSettingInfo(
      Object.assign(Setting, {
        themeColor: item.name + '@' + item.value,
      })
    )
  },
  isShowHeader() {
    return this.state.device === 'pc' && this.state.layoutMode === 'ttb'
  },
  setWaterMark(waterMark: string) {
    this.state.waterMark = waterMark
    presistSettingInfo(
      Object.assign(Setting, {
        waterMark,
      })
    )
  },
  changeOpenWaterMark(isOpen: boolean) {
    this.state.isOpenWaterMark = isOpen
    presistSettingInfo(
      Object.assign(Setting, {
        isOpenWaterMark: isOpen,
      })
    )
  },
  changeShowTabbar(showTabbar: boolean) {
    this.state.isShowTabbar = showTabbar
    presistSettingInfo(
      Object.assign(Setting, {
        showTabbar: showTabbar,
      })
    )
  },
  changeGray(isGray: boolean) {
    this.state.isGray = isGray
    presistSettingInfo(
      Object.assign(Setting, {
        isGray,
      })
    )
    setTimeout(() => {
      useGray(isGray)
    }, 100)
  },
  getSplitTabs() {
    return this.state.permissionRoutes.filter((it) => {
      return it.path && !it.hidden && it.children && it.children.length > 0
    }) as Array<RouteRecordRawWithHidden>
  },
  initPermissionRoute(routes: Array<RouteRecordRaw>) {
    const tempRoutes = transfromRoutes(routes) || []
    this.state.permissionRoutes.length = 0
    this.state.permissionRoutes.push(...tempRoutes)
  },
  isEmptyPermissionRoute() {
    return (
      !this.state.permissionRoutes || this.state.permissionRoutes.length === 0
    )
  },
  setUserInfo(userInfo: { nickName: string; avatar: string }) {
    this.state.userInfo.nickName = userInfo ? userInfo.nickName || '' : ''
    this.state.userInfo.avatar = userInfo ? userInfo.avatar || '' : ''
  },
  reset() {
    this.state = reactive<StateType>({
      isCollapse: false,
      isFixedNavBar: Setting.isFixedNavBar,
      layoutMode: Setting.layoutMode,
      device: DeviceType.PC,
      theme: Setting.theme,
      sideBarBgColor: Setting.sideTheme,
      pageAnim: Setting.pageAnim,
      isShowTabbar: Setting.isShowTabbar,
      waterMark: Setting.waterMark,
      isOpenWaterMark: Setting.isOpenWaterMark,
      isGray: Setting.isGray,
      themeOverrides: {
        common: {
          primaryColor: '#18a058',
        },
      },
      sideThemeOverrides: {
        common: {
          cardColor: '',
        },
      },
      permissionRoutes: [],
      visitedView: [],
      cachedView: [],
      userInfo: {
        nickName: '超级管理员',
        avatar: 'https://07akioni.oss-cn-beijing.aliyuncs.com/07akioni.jpeg',
      },
      actionItem: {
        showSearch: Setting.actionBar.isShowSearch,
        showMessage: Setting.actionBar.isShowMessage,
        showFullScreen: Setting.actionBar.isShowFullScreen,
        showRefresh: Setting.actionBar.isShowRefresh,
      },
    })
  },
  ...CachedViewAction,
  ...VisitedViewAction,
}

export default store
