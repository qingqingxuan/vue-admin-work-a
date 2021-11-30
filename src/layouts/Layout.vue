<template>
  <div
    class="vaw-layout-container"
    :class="[state.device === 'mobile' && 'is-mobile', state.theme]"
  >
    <transition name="header">
      <VAWHeader v-if="isShowHeader" />
    </transition>
    <template v-if="isShowHeader">
      <SideBar :show-logo="!isShowHeader" />
      <MainLayout :show-nav-bar="!isShowHeader" />
    </template>
    <template v-else-if="state.layoutMode === 'lcr'">
      <TabSplitSideBar />
      <MainLayout />
    </template>
    <template v-else>
      <SideBar />
      <MainLayout />
    </template>
    <div
      v-if="state.device === 'mobile'"
      class="mobile-shadow"
      :class="[state.isCollapse ? 'close-shadow' : 'show-shadow']"
      @click="closeMenu"
    ></div>
  </div>
  <WaterMark />
  <Setting ref="settingRef" />
</template>

<script lang="ts">
  import { computed, defineComponent, onBeforeUnmount, onMounted, ref } from 'vue'
  import { DeviceType } from '../types/store'
  import { useLayoutStore } from './index'
  import useEmit from '@/hooks/useEmit'
  export default defineComponent({
    name: 'Layout',
    setup() {
      const settingRef = ref()
      const store = useLayoutStore()
      const isShowHeader = computed(() => store?.isShowHeader())
      const emitter = useEmit()
      emitter?.on('show-setting', () => {
        settingRef.value?.openDrawer()
      })
      onMounted(() => {
        handleScreenResize()
        window.addEventListener('resize', handleScreenResize)
      })
      onBeforeUnmount(() => {
        window.removeEventListener('resize', handleScreenResize)
      })
      function handleScreenResize() {
        const width = document.body.clientWidth
        if (width <= 768) {
          store?.changeDevice(DeviceType.MOBILE)
          store?.toggleCollapse(true)
        } else if (width < 992 && width > 768) {
          store?.changeDevice(DeviceType.PAD)
          store?.toggleCollapse(true)
        } else if (width < 1200 && width >= 992) {
          store?.changeDevice(DeviceType.PC)
          store?.toggleCollapse(false)
        } else {
          store?.changeDevice(DeviceType.PC)
          store?.toggleCollapse(false)
        }
      }
      function closeMenu() {
        store?.toggleCollapse(true)
      }
      return {
        settingRef,
        state: store?.state,
        isShowHeader,
        closeMenu,
      }
    },
  })
</script>

<style lang="less">
  .vaw-layout-container {
    height: 100%;
    max-width: 100%;
    overflow-x: hidden;
    .mobile-shadow {
      display: none;
    }
    .layout-mode-ttb {
      margin-top: @logoHeight;
      transition: all @transitionTime;
    }
  }
  .is-mobile {
    .mobile-shadow {
      background-color: #000000;
      position: fixed;
      top: 0;
      left: 0;
      width: 100vw;
      height: 100vh;
      z-index: 997;
    }
    .close-shadow {
      display: none;
    }
    .show-shadow {
      display: block;
      opacity: 0.5;
      transition: all @transitionTime;
    }
  }
</style>
