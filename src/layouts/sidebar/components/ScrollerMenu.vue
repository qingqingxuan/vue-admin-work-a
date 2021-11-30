<template>
  <div class="scrollbar">
    <a-menu
      mode="inline"
      :theme="theme"
      :inline-collapsed="state.isCollapse"
      v-model:selectedKeys="defaultPath"
      v-model:openKeys="defaultExpandKeys"
      @select="onMenuClick"
    >
      <template v-for="item of menuOptions" :key="item.key">
        <template v-if="!item.children">
          <a-menu-item :key="item.key">
            <template #icon>
              <PieChartOutlined />
            </template>
            {{ item.label }}
          </a-menu-item>
        </template>
        <template v-else>
          <SubMenu :key="item.key" :menu-info="item" />
        </template>
      </template>
    </a-menu>
  </div>
</template>

<script lang="ts">
  import {
    computed,
    defineComponent,
    onMounted,
    PropType,
    reactive,
    ref,
    shallowReactive,
    watch,
    watchEffect,
  } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useLayoutStore } from '../../index'
  import { RouteRecordRawWithHidden } from '../../../types/store'
  import { isExternal, transfromMenu } from '../../../utils'
  import { PieChartOutlined } from '@ant-design/icons-vue'

  export default defineComponent({
    name: 'ScrollerMenu',
    components: { PieChartOutlined },
    props: {
      routes: {
        type: Object as PropType<Array<RouteRecordRawWithHidden>>,
        require: true,
      },
    },
    setup(props) {
      const store = useLayoutStore()
      const menuOptions = shallowReactive([] as Array<any>)
      const defaultPath = ref([] as Array<string>)
      const defaultExpandKeys = ref([] as Array<string>)
      const theme = computed(() => {
        if (store.state.sideBarBgColor === 'white') {
          return 'light'
        } else {
          return 'dark'
        }
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
        const paths = currentRoute.fullPath.split('/')
        paths.forEach((it) => {
          if (it && !defaultExpandKeys.value.includes('/' + it)) {
            defaultExpandKeys.value.push('/' + it)
          }
        })
      }
      function onMenuClick({ key }: any) {
        if (isExternal(key)) return
        router.push(key)
        if (store.state.device === 'mobile') {
          store.toggleCollapse(true)
        }
      }
      watch(
        () => currentRoute.fullPath,
        (newVal) => {
          defaultPath.value.length = 0
          defaultPath.value.push(newVal)
          handleExpandPath()
        }
      )
      watchEffect(() => {
        handleMenu(props.routes)
      })
      return {
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
    width: 65px;
  }
  .scrollbar {
    height: calc(100vh - @logoHeight) !important;
    overflow-y: auto;
    &::-webkit-scrollbar {
      width: 0;
    }
  }
</style>
