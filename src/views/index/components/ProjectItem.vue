<template>
  <div class="item-container">
    <div class="info-wrapper">
      <span class="title">
        {{ item.title }}
      </span>
      <a-space class="mt-1">
        <a-button class="mr-1" type="primary" ghost size="small" @click="preView"
          >预览地址</a-button
        >
        <a-button ghost type="primary" size="small" @click="gitee">项目地址</a-button>
      </a-space>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, PropType, toRef } from 'vue'
  interface ItemData {
    title: string
    gitee: string
    target?: string
  }

  export default defineComponent({
    name: 'ProjectItem',
    props: {
      item: {
        type: Object as PropType<ItemData>,
        default: () => {
          return {}
        },
      },
    },
    setup(props) {
      const item = toRef(props, 'item')
      return {
        gitee: function () {
          console.log(item.value.gitee)
          window.open(item.value.gitee)
        },
        preView: function () {
          window.open(item.value.target)
        },
      }
    },
  })
</script>

<style lang="less" scoped>
  .item-container {
    position: relative;
    height: 7rem;
    z-index: 0;
    cursor: pointer;
    .info-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      padding: 0;
      z-index: 2;
      font-size: 16px;
      font-weight: bold;
      color: #fff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-shadow: 0px 0px 5px #1890ff, 0px 0px 15px #1890ff, 0px 0px 25px #1890ff;
      &::after {
        content: '';
        display: block;
        position: absolute;
        border-radius: 10px;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        z-index: -1;
        background-color: var(--border-color);
      }
    }
  }
</style>
