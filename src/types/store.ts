import { Ref, UnwrapRef } from 'vue'
import { RouteRecordRaw, RouteMeta } from 'vue-router'
import CacheView from './cached-view'
import VisitedView from './visited-view'

export interface RouteMetaType extends RouteMeta {
  icon?: string
  title?: string
  cacheable?: boolean
  affix?: boolean
}

export type RouteRecordRawWithHidden = RouteRecordRaw & {
  fullPath?: string
  icon?: string
  hidden?: boolean
  params?: Record<string, any>
  query?: Record<string, any>
}

export interface SplitTab {
  label: string
  iconPrefix?: string | unknown
  icon: string
  fullPath: string
  children?: Array<RouteRecordRawWithHidden>
  checked: Ref<UnwrapRef<boolean>>
}

export enum LayoutMode {
  LTR = 'ltr',
  LCR = 'lcr',
  TTB = 'ttb',
}

export enum DeviceType {
  PC = 'pc',
  PAD = 'pad',
  MOBILE = 'mobile',
}

export enum ThemeMode {
  LIGHT = 'light',
  DARK = 'dark',
}

export enum SideTheme {
  DARK = 'dark',
  WHITE = 'white',
  BLUE = 'blue',
  IMAGE = 'image',
}

export interface StateType {
  isCollapse: boolean
  isFixedNavBar: boolean
  layoutMode: string
  device: DeviceType
  theme: string
  sideBarBgColor: string
  pageAnim: string
  isShowTabbar: boolean
  waterMark: string
  isOpenWaterMark: boolean
  isGray: boolean
  permissionRoutes: Array<RouteRecordRawWithHidden>
  visitedView: Array<RouteRecordRawWithHidden>
  cachedView: Array<string>
  actionItem: {
    showSearch: boolean
    showMessage: boolean
    showFullScreen: boolean
    showRefresh: boolean
  }
}

export interface StoreType extends CacheView, VisitedView {
  state: UnwrapRef<StateType>
  start: (params: any) => void
  randomLayouMode: () => void
  toggleCollapse: (newStatus: boolean) => void
  toggleFixedNavBar: (newStatus: boolean) => void
  changeLayoutMode: (mode: LayoutMode) => void
  changeDevice: (device: DeviceType) => void
  changeTheme: (theme: ThemeMode) => void
  changeSideBarBgColor: (colorName: SideTheme) => void
  changePageAnim: (pageAnim: string) => void
  changePrimaryColor: (color: string) => void
  setWaterMark: (waterMark: string) => void
  changeOpenWaterMark: (isOpen: boolean) => void
  changeGray: (isGray: boolean) => void
  changeShowTabbar: (tabbar: boolean) => void
  isShowHeader: () => boolean
  getSplitTabs: () => Array<RouteRecordRawWithHidden>
  initPermissionRoute: (routes: Array<RouteRecordRaw>) => void
  isEmptyPermissionRoute: () => boolean
  reset: () => void
}
