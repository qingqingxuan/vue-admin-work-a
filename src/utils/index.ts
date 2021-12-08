import { RouteRecordRaw } from 'vue-router'
import path from 'path-browserify'
import { SplitTab, RouteRecordRawWithHidden } from '../types/store'
import { ref } from 'vue'
import { DataNode } from 'ant-design-vue/lib/vc-tree-select/interface'
import { TablePropsType } from '@/types/components'

export function isExternal(path: string) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

export function uuid() {
  const s: Array<any> = []
  const hexDigits = '0123456789abcdef'
  for (let i = 0; i < 36; i++) {
    s[i] = hexDigits.substr(Math.floor(Math.random() * 0x10), 1)
  }
  s[14] = '4' // bits 12-15 of the time_hi_and_version field to 0010
  s[19] = hexDigits.substr((s[19] & 0x3) | 0x8, 1) // bits 6-7 of the clock_seq_hi_and_reserved to 01
  s[8] = s[13] = s[18] = s[23] = '-'
  const uuid = s.join('')
  return uuid
}

export function randomString(length: number) {
  const str = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ'
  let result = ''
  for (let i = length; i > 0; --i) {
    result += str[Math.floor(Math.random() * str.length)]
  }
  return result
}

/**
 * 中划线字符驼峰
 * @param {*} str 要转换的字符串
 * @returns 返回值
 */
export function toHump(str: string): string {
  if (!str) return str
  return str
    .replace(/\-(\w)/g, function (all, letter) {
      return letter.toUpperCase()
    })
    .replace(/(\s|^)[a-z]/g, function (char) {
      return char.toUpperCase()
    })
}

export function mapTwoLevelRouter(srcRoutes: Array<RouteRecordRaw>) {
  function addParentRoute(routes: any, parent: any, parentPath: string) {
    routes.forEach((it: RouteRecordRaw) => {
      if (!isExternal(it.path)) {
        it.path = path.resolve(parentPath, it.path)
      }
      parent.push(it)
      if (it.children && it.children.length > 0) {
        addParentRoute(it.children, parent, it.path)
      }
    })
  }
  if (srcRoutes && srcRoutes.length > 0) {
    const tempRoutes = [] as Array<any>
    srcRoutes.forEach((it) => {
      const route = { ...it }
      const parentRoutes = [] as Array<any>
      if (route.children && route.children.length > 0) {
        addParentRoute(route.children, parentRoutes, route.path)
      }
      parentRoutes && parentRoutes.length > 0 && (route.children = parentRoutes)
      tempRoutes.push(route)
    })
    return tempRoutes
  }
  return []
}

export function transfromRoutes(
  originRoutes: Array<RouteRecordRaw>,
  parentPath = '/'
): Array<RouteRecordRawWithHidden> | undefined {
  if (!originRoutes) {
    return undefined
  }
  const tempRoutes: Array<RouteRecordRawWithHidden> = []
  originRoutes.forEach((it) => {
    const tempRoute = {
      ...it,
      hidden: (it as any).hidden ? !!(it as any).hidden : false,
      fullPath: isExternal(it.path) ? it.path : path.resolve(parentPath, it.path),
    } as RouteRecordRawWithHidden
    if (tempRoute.children) {
      tempRoute.children = transfromRoutes(tempRoute.children, tempRoute.fullPath)
    }
    tempRoutes.push(tempRoute)
  })
  return tempRoutes
}

interface MenuOption {
  key: string | undefined
  label: string | undefined
  icon: string | undefined
  children: Array<MenuOption> | null
}

export function transfromMenu(originRoutes: Array<RouteRecordRawWithHidden>): Array<MenuOption> {
  if (!originRoutes) {
    return []
  }
  const tempMenus = [] as Array<MenuOption>
  originRoutes
    .filter((it) => !it.hidden)
    .forEach((it) => {
      const tempMenu: MenuOption = {
        key: it.fullPath,
        label: it.meta?.title as string,
        icon: it.meta?.icon as string,
        children: null,
      }
      if (it.children) {
        if (it.meta && it.meta.isSingle && it.children.length === 1) {
          const lastItem = it.children[0] as RouteRecordRawWithHidden
          tempMenu.key = lastItem.fullPath || tempMenu.key
          tempMenu.label = (
            lastItem.meta && lastItem.meta.title ? lastItem.meta?.title : tempMenu.label
          ) as string
          tempMenu.icon = (
            lastItem.meta && lastItem.meta.icon ? lastItem.meta?.icon : tempMenu.icon
          ) as string
          tempMenu.children = null
        } else {
          tempMenu.children = transfromMenu(it.children)
        }
      }
      tempMenus.push(tempMenu)
    })
  return tempMenus
}

export function transformSplitTabMenu(routes?: Array<RouteRecordRawWithHidden>): Array<SplitTab> {
  if (!routes) {
    return [] as Array<SplitTab>
  }
  const tempTabs = [] as Array<SplitTab>
  routes.forEach((it) => {
    const splitTab: SplitTab = {
      label: it.meta ? (it.meta?.title as string) : '',
      fullPath: it.fullPath || '',
      iconPrefix: it.meta?.iconPrefix || 'icon',
      icon: it.meta ? (it.meta?.icon as any) : undefined,
      children: it.children,
      checked: ref(false),
    }
    tempTabs.push(splitTab)
  })
  return tempTabs
}

export function sortColumns(originColumns: any[], newColumns: TablePropsType[]) {
  if (!originColumns || !newColumns) {
    return
  }
  if (newColumns.length === 0) {
    originColumns.length = 0
  } else {
    const selectionItem = originColumns.find((it) => it.type === 'selection')
    originColumns.length = 0
    if (selectionItem) {
      originColumns.push(selectionItem)
    }
    originColumns.push(...newColumns)
  }
}

export function transformTreeSelect(origin: any[], labelName: string, keyName: string): DataNode[] {
  const tempSelections: DataNode[] = []
  origin.forEach((it) => {
    const selection = {
      title: it[labelName],
      key: it[keyName],
      value: it[keyName],
    } as DataNode
    if (it.children) {
      selection.children = transformTreeSelect(it.children, labelName, keyName)
    }
    tempSelections.push(selection)
  })
  return tempSelections
}

export function findRouteByUrl(routes: Array<any>, path: string): RouteRecordRawWithHidden | null {
  if (!path || !routes) {
    return null
  }
  let tempRoute = null
  for (let index = 0; index < routes.length; index++) {
    const temp = routes[index]
    if (temp.path === path) {
      tempRoute = temp
      return tempRoute
    }
    if (temp.children) {
      tempRoute = findRouteByUrl(temp.children, path)
      if (tempRoute) {
        return tempRoute
      }
    }
  }
  return null
}
