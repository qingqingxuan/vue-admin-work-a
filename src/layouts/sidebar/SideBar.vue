<template>
  <div
    class="vaw-side-bar-wrapper"
    :bordered="false"
    :style="{ borderRadius: '0px', marginTop: state.layoutMode === 'ttb' ? '48px' : 0 }"
    :class="[!state.isCollapse ? 'open-status' : 'close-status', bgColor]"
  >
    <transition name="logo">
      <Logo v-if="showLogo" />
    </transition>
    <ScrollerMenu :routes="routes" />
    <div class="mobile-shadow"></div>
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { useLayoutStore } from '../index'
  export default defineComponent({
    name: 'SideBar',
    props: {
      showLogo: {
        type: Boolean,
        default: true,
      },
    },
    setup() {
      const store = useLayoutStore()
      const bgColor = computed(() => {
        if (store.state.sideBarBgColor === 'image') {
          return 'sidebar-bg-img'
        } else if (store.state.sideBarBgColor === 'dark') {
          return 'sidebar-bg-dark'
        } else {
          return 'sidebar-bg-light'
        }
      })
      const routes = computed(() => {
        return store?.state.permissionRoutes.filter((it) => !!it.name)
      })
      return {
        state: store?.state,
        routes,
        bgColor,
      }
    },
  })
</script>
<style scoped lang="less">
  .sidebar-bg-img {
    background-image: url('../../assets/bg_img.webp') !important;
    background-size: cover;
    :deep(.ant-menu) {
      background: transparent !important;
    }
    :deep(.logo-wrapper .logo-title) {
      color: #fff !important;
    }
  }
  .sidebar-bg-dark {
    :deep(.logo-wrapper .logo-title) {
      color: #fff !important;
    }
  }
  .light .sidebar-bg-dark {
    background-color: #001529;
  }
  .dark .sidebar-bg-dark {
    :deep(.ant-menu) {
      background: transparent !important;
    }
  }
  .sidebar-bg-light {
    background-color: #fff;
  }
  .open-status {
    width: @menuWidth;
    box-shadow: 2px 5px 10px rgba(0, 0, 0, 0.12);
    transition: all @transitionTime;
  }
  .close-status {
    width: @minMenuWidth;
    box-shadow: none;
    transition: all @transitionTime;
  }
  .vaw-side-bar-wrapper {
    position: fixed;
    top: 0;
    left: 0;
    overflow-x: hidden;
    height: 100%;
    box-sizing: border-box;
    z-index: 999;
    .vaw-menu-wrapper {
      overflow-x: hidden;
      color: white;
    }
  }
  .is-mobile {
    .open-status {
      width: @menuWidth;
      transform: translateX(0);
      transition: transform @transitionTime;
    }
    .close-status {
      width: @menuWidth;
      @negativeMenuWidth: calc(@menuWidth * -1);
      transform: translateX(@negativeMenuWidth);
      transition: transform @transitionTime;
      box-shadow: none;
    }
  }
</style>
