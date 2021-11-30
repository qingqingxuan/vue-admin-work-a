<template>
  <div class="action-items-wrapper">
    <span v-if="state.actionItem.showSearch" class="action-item" @click="onShowSearch">
      <SearchIcon />
    </span>
    <a-popover placement="bottom" trigger="click" :width="300">
      <a-badge v-if="state.actionItem.showMessage" :count="badgeValue" class="badge-action-item action-item">
        <NotificationsIcon />
      </a-badge>
      <template #content>
        <p>Content</p>
        <p>Content</p>
      </template>
      <!-- <PopoverMessage @clear="badgeValue = 0" /> -->
    </a-popover>
    <span v-if="state.actionItem.showRefresh" class="action-item" @click="onRefrehRoute">
      <RefreshIcon />
    </span>
    <span
      v-if="state.actionItem.showFullScreen && state.device !== 'mobile'"
      class="action-item"
      @click="onScreenFull"
    >
      <ExpandIcon />
    </span>
    <span class="action-item" @click="onShowSetting">
      <SettingIcon />
    </span>
    <!-- <SearchContent ref="searchContentRef" /> -->
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { message } from 'ant-design-vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useLayoutStore } from '../index'
  import { SearchContentType } from '@/types/components'
  import {
    SettingOutlined as SettingIcon,
    SearchOutlined as SearchIcon,
    ExpandOutlined as ExpandIcon,
    BellOutlined as NotificationsIcon,
    ReloadOutlined as RefreshIcon,
  } from '@ant-design/icons-vue'
  import { useFullscreen } from '@vueuse/core'
  import useEmit from '@/hooks/useEmit'
  export default defineComponent({
    name: 'ActionItems',
    components: {
      SearchIcon,
      SettingIcon,
      ExpandIcon,
      NotificationsIcon,
      RefreshIcon,
    },
    setup() {
      const searchContentRef = ref<SearchContentType>()
      const showSearchContent = ref(false)
      const searchContent = ref('')
      const settingRef = ref()
      const badgeValue = ref(3)
      const store = useLayoutStore()
      const router = useRouter()
      const route = useRoute()
      const emitter = useEmit()
      function onShowSearch() {
        searchContentRef.value?.onShow()
      }
      const { isSupported, enter } = useFullscreen(document.documentElement)
      function onScreenFull() {
        if (!isSupported) {
          message.error('当前浏览器不支持全屏操作')
          return false
        }
        enter()
      }
      function onRefrehRoute() {
        router.replace({ path: '/redirect' + route.path })
      }
      function onShowSetting() {
        emitter?.emit('show-setting')
      }
      return {
        searchContentRef,
        settingRef,
        showSearchContent,
        searchContent,
        badgeValue,
        state: store.state,
        onShowSearch,
        onScreenFull,
        onRefrehRoute,
        onShowSetting,
      }
    },
  })
</script>

<style lang="less" scoped>
  @primary-color: #f00;
  .action-items-wrapper {
    position: relative;
    height: 100%;
    display: flex;
    align-items: center;
    z-index: 1;
    .action-item {
      font-size: 16px;
      min-width: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      height: 100%;
      &:hover {
        cursor: pointer;
        background-color: var(--border-color);
      }
    }
    .badge-action-item {
      :deep(.ant-badge-count, .ant-badge-dot) {
        transform: translate(0, 20%) !important;
      }
    }
  }
</style>