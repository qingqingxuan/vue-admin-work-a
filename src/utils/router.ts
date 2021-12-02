import router, { constantRoutes } from '../router'
import Cookies from 'js-cookie'
import { post } from '@/api/http'
import store from '@/store/store'
import { getMenuListByRoleId } from '@/api/url'
import { RouteRecordRaw } from 'vue-router'
import { mapTwoLevelRouter, toHump } from '.'
import { Layout } from '@/layouts'
import layoutStore from '@/store'
import { defineAsyncComponent } from 'vue'
import LoadingComponent from '@/layouts/loading/index.vue'

interface OriginRoute {
  menuUrl: string
  menuName?: string
  hidden?: boolean
  redirect?: string
  affix?: boolean
  cacheable?: boolean
  iconPrefix?: string
  icon?: string
  badge?: string | number
  isSingle?: boolean
  children: Array<OriginRoute>
}

type RouteRecordRawWithHidden = RouteRecordRaw & { hidden: boolean }

function getRoutes() {
  return post({
    url: getMenuListByRoleId,
    data: {
      userId: store.getters['user/userId'],
      roleId: store.getters['user/roleId'],
    },
  }).then((res: any) => {
    return generatorRoutes(res.data)
  })
}

function loadComponents() {
  return import.meta.glob('../views/**/*.vue')
}

const asynComponents = loadComponents()

function getComponent(it: OriginRoute) {
  return defineAsyncComponent({
    loader: asynComponents['../views' + it.menuUrl + '.vue'],
    loadingComponent: LoadingComponent,
  })
}

function getCharCount(str: string, char: string) {
  const regex = new RegExp(char, 'g')
  const result = str.match(regex)
  const count = !result ? 0 : result.length
  return count
}

function isMenu(path: string) {
  return getCharCount(path, '/') === 1
}

function getNameByUrl(menuUrl: string) {
  const temp = menuUrl.split('/')
  return toHump(temp[temp.length - 1])
}

function generatorRoutes(res: Array<OriginRoute>) {
  const tempRoutes: Array<RouteRecordRawWithHidden> = []
  res.forEach((it) => {
    const route: RouteRecordRawWithHidden = {
      path: it.menuUrl,
      name: getNameByUrl(it.menuUrl),
      hidden: !!it.hidden,
      redirect: it.redirect || '',
      component: isMenu(it.menuUrl) ? Layout : getComponent(it),
      meta: {
        title: it.menuName,
        affix: !!it.affix,
        cacheable: !!it.cacheable,
        icon: it.icon || 'menu',
        iconPrefix: it.iconPrefix || 'iconfont',
        badge: it.badge,
        isSingle: !!it.isSingle,
      },
    }
    if (it.children) {
      route.children = generatorRoutes(it.children)
    }
    tempRoutes.push(route)
  })
  return tempRoutes
}

const whiteRoutes: string[] = ['/login']

function isTokenExpired(): boolean {
  const token = Cookies.get('p-admin-token')
  return !!token
}
router.beforeEach(async (to) => {
  if (whiteRoutes.includes(to.path)) {
    return true
  } else {
    if (!isTokenExpired()) {
      return {
        path: '/login',
        query: { redirect: to.fullPath },
      }
    } else {
      const isEmptyRoute = layoutStore.isEmptyPermissionRoute()
      if (isEmptyRoute) {
        // 加载路由
        const accessRoutes: Array<RouteRecordRaw> = []
        const tempRoutes = await getRoutes()
        accessRoutes.push(...tempRoutes)
        const mapRoutes = mapTwoLevelRouter(accessRoutes)
        mapRoutes.forEach((it: any) => {
          router.addRoute(it)
        })
        router.addRoute({
          path: '/:pathMatch(.*)*',
          redirect: '/404',
          hidden: true,
        } as RouteRecordRaw)
        layoutStore.initPermissionRoute([...constantRoutes, ...accessRoutes])
        return { ...to, replace: true }
      } else {
        return true
      }
    }
  }
})
