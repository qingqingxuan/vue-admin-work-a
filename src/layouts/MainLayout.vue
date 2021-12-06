<template>
  <div
    class="vaw-main-layout-container scrollbar"
    :class="[
      state.layoutMode == 'ttb'
        ? ''
        : !state.isCollapse
        ? 'main-layout-open-status'
        : 'main-layout-close-status',
      state.isFixedNavBar ? 'main-layout_fixed-nav-bar' : 'main-layout',
      !state.isFixedNavBar
        ? 'main-layout_padding-top__0'
        : isShowTabbar
        ? 'main-layout_padding-top__all'
        : 'main-layout_padding-top__logo',
    ]"
  >
    <section
      :class="[
        state.layoutMode == 'ttb'
          ? 'nav-bar-open-status__ttb'
          : !state.isCollapse
          ? 'nav-bar-open-status'
          : 'nav-bar-close-status',
        state.isFixedNavBar ? 'fixed-nav-bar' : '',
        !showNavBar ? 'tab-bar-top' : '',
      ]"
    >
      <NavBar v-if="showNavBar" />
      <TabBar v-show="isShowTabbar" />
    </section>
    <div
      class="main-base-style scrollbar"
      :class="[state.theme === 'light' ? 'main-base-light-theme' : 'main-base-dark-theme']"
    >
      <section class="main-section" :class="{ 'main-section__overflow-y': state.isFixedNavBar }">
        <Main />
      </section>
      <section class="footer-wrapper">
        <Footer />
      </section>
      <a-back-top :target="listenTo1" />
    </div>
    <a-back-top :target="listenTo2" />
  </div>
</template>

<script lang="ts">
  import { computed, defineComponent, onMounted, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { useLayoutStore } from './index'
  import { useTitle } from '@vueuse/core'
  import { projectName } from '@/setting'
  export default defineComponent({
    name: 'MainLayout',
    props: {
      showNavBar: {
        type: Boolean,
        default: true,
      },
    },
    setup() {
      const store = useLayoutStore()
      const listenTo1 = ref()
      const listenTo2 = ref()
      const isShowTabbar = computed(() => store.state.isShowTabbar)
      const router = useRouter()
      const route = useRoute()
      const title = useTitle(projectName + ' | ' + (route.meta.title as string))
      onMounted(() => {
        listenTo1.value = () => document.querySelector('.main-base-style')
        listenTo2.value = () => document.querySelector('.vaw-main-layout-container')
      })
      return {
        state: store?.state,
        listenTo1,
        listenTo2,
        isShowTabbar,
      }
    },
  })
</script>

<style lang="less" scoped>
  .scrollbar::-webkit-scrollbar {
    width: 0;
  }
  .main-layout-open-status {
    margin-left: @menuWidth;
  }
  .main-layout-close-status {
    margin-left: @minMenuWidth;
  }
  .nav-bar-open-status__ttb {
    width: 100%;
  }
  .nav-bar-open-status.fixed-nav-bar {
    width: calc(100% - @menuWidth);
  }
  .nav-bar-close-status.fixed-nav-bar {
    width: calc(100% - @minMenuWidth);
  }

  .main-layout {
    overflow-y: auto;
  }
  .main-layout_fixed-nav-bar {
    overflow-y: hidden;
    .main-base-style {
      overflow-y: auto;
    }
  }

  .main-layout_padding-top__0 {
    padding-top: 0;
  }

  .main-layout_padding-top__all {
    padding-top: calc(@logoHeight + @tabHeight);
  }

  .main-layout_padding-top__logo {
    padding-top: @logoHeight;
  }

  .vaw-main-layout-container {
    height: 100%;
    box-sizing: border-box;
    transition: margin-left @transitionTime;
    .main-base-style {
      height: 100%;
      box-sizing: border-box;
      padding: 5px;
    }
    .main-base-light-theme {
      background-color: #f0f2f5;
    }
    .main-base-dark-theme {
      background-color: #333333;
    }
    .main-section {
      min-height: calc(100% - 10px - @footerHeight);
      overflow-x: hidden;
    }
    .main-section__overflow-y {
      overflow-y: hidden;
    }
    .fixed-nav-bar {
      position: fixed;
      top: 0;
      transition: width @transitionTime;
      z-index: 99;
    }
    .tab-bar-top {
      padding-top: @logoHeight;
    }
  }
  .footer-wrapper {
    margin-top: 6px;
  }
  .is-mobile {
    .main-layout-open-status,
    .main-layout-close-status {
      margin-left: 0;
      transition: none;
    }
    .nav-bar-open-status,
    .nav-bar-close-status {
      width: 100%;
    }
  }
</style>
