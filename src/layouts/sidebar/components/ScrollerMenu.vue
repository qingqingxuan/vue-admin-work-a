<template>
  <Scrollbar>
    <a-menu
      :mode="menuMode"
      :theme="theme"
      :inline-collapsed="state.device === 'mobile' ? false : state.isCollapse"
      v-model:selectedKeys="defaultPath"
      v-model:openKeys="defaultExpandKeys"
      @select="onMenuClick"
    >
      <template v-for="item of menuOptions" :key="item.key">
        <template v-if="!item.children">
          <a-menu-item :key="item.key">
            <template #icon>
              <component :is="item.icon || 'MenuOutlined'" />
            </template>
            {{ item.label }}
          </a-menu-item>
        </template>
        <template v-else>
          <SubMenu :key="item.key" :menu-info="item" />
        </template>
      </template>
    </a-menu>
  </Scrollbar>
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
    onMounted,
    PropType,
    ref,
    shallowReactive,
    watch,
    watchEffect,
  } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useLayoutStore } from '../../index'
  import { RouteRecordRawWithHidden } from '../../../types/store'
  import { isExternal, transfromMenu } from '../../../utils'

  export default defineComponent({
    name: 'ScrollerMenu',
    props: {
      routes: {
        type: Object as PropType<Array<RouteRecordRawWithHidden>>,
        require: true,
      },
      mode: {
        type: String,
        default: 'inline',
      },
    },
    setup(props) {
      const store = useLayoutStore()
      const menuOptions = shallowReactive([] as Array<any>)
      const defaultPath = ref([] as Array<string>)
      const defaultExpandKeys = ref([] as Array<string>)
      const menuMode = computed(() => props.mode)
      const theme = computed(() => {
        if (store.state.theme === 'dark') {
          return 'dark'
        }
        if (store.state.layoutMode === 'ttb') {
          return 'light'
        }
        return store.state.sideBarBgColor === 'image' ? 'dark' : store.state.sideBarBgColor
      })
      const currentRoute = useRoute()
      const router = useRouter()
      defaultPath.value.push(currentRoute.fullPath)
      handleExpandPath()
      onMounted(() => {
        handleMenu(props.routes)
      })
      function handleMenu(routes?: Array<RouteRecordRawWithHidden>) {
        menuOptions.length = 0
        const tempMenus = transfromMenu(routes || [])
        menuOptions.push(...tempMenus)
      }
      function handleExpandPath() {
        if (props.mode === 'inline') {
          const paths = currentRoute.fullPath.split('/')
          const pathList = paths
            .filter((it) => !!it)
            .reduce((pre: Array<string>, cur: string) => {
              const lastItem = pre[pre.length - 1] || ''
              pre.push(lastItem + '/' + cur)
              return pre
            }, [])
          defaultExpandKeys.value = pathList
        }
      }
      function onMenuClick({ key }: any) {
        if (isExternal(key)) {
          window.open(key)
        } else {
          router.push(key)
          if (store.state.device === 'mobile') {
            store.toggleCollapse(true)
          }
        }
      }
      watch(
        () => currentRoute.fullPath,
        (newVal) => {
          defaultPath.value = [newVal]
          handleExpandPath()
        }
      )
      watchEffect(() => {
        handleMenu(props.routes)
      })
      return {
        menuMode,
        defaultPath,
        defaultExpandKeys,
        state: store?.state,
        menuOptions,
        onMenuClick,
        theme,
      }
    },
  })
</script>

<style lang="less" scoped>
  :deep(.ant-menu.ant-menu-inline-collapsed) {
    width: 65px !important;
  }
  :deep(.ant-menu-horizontal) {
    border-bottom: none !important;
  }
  :deep(.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-active:after) {
    border-bottom: 3px solid #1890ff !important;
  }
  :deep(.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu:hover:after) {
    border-bottom: 3px solid #1890ff !important;
  }
  :deep(.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item:hover:after) {
    border-bottom: 3px solid #1890ff !important;
  }
  :deep(.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-active:after) {
    border-bottom: 3px solid #1890ff !important;
  }
  :deep(.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-item-selected:after) {
    border-bottom: 3px solid #1890ff !important;
  }
  :deep(.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-open:after) {
    border-bottom: 3px solid #1890ff !important;
  }
  :deep(.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu-selected:after) {
    border-bottom: 3px solid #1890ff !important;
  }
  :deep(.ant-menu-horizontal:not(.ant-menu-dark) > .ant-menu-submenu:hover:after) {
    border-bottom: 3px solid #1890ff !important;
  }
  .scrollbar {
    height: calc(100vh - @logoHeight) !important;
    overflow-y: auto;
  }
</style>
