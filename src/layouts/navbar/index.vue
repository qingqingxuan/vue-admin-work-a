<template>
  <div class="vaw-nav-bar-wrapper">
    <Humburger />
    <Breadcrumb v-if="state.device !== 'mobile'" />
    <div style="flex: 1"></div>
    <div class="right-wrapper">
      <ActionItems />
    </div>
    <div class="avatar-wrapper">
      <VAWavatar />
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { useLayoutStore } from '../index'
  export default defineComponent({
    name: 'NavBar',
    setup() {
      const store = useLayoutStore()
      return {
        state: store?.state,
      }
    },
  })
</script>

<style scoped lang="less">
  .vaw-nav-bar-wrapper {
    height: @logoHeight;
    max-height: @logoHeight;
    min-height: @logoHeight;
    overflow: hidden;
    box-sizing: border-box;
    display: flex;
    align-items: center;
    border-bottom: 1px solid var(--border-color);
    .avatar-wrapper {
      padding-right: 20px;
    }
    .right-wrapper {
      height: 100%;
    }
  }
</style>
