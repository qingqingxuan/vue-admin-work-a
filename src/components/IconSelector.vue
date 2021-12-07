<template>
  <a-popover v-model:visible="visible" title="请选择图标" trigger="click">
    <template #content>
      <div class="icon-wrapper">
        <a-row :wrap="true">
          <a-col :span="4" v-for="item of iconNames" :key="item">
            <component :is="item" />
          </a-col>
        </a-row>
      </div>
    </template>
    <a-button type="primary" ghost>请选择图标</a-button>
  </a-popover>
</template>

<script lang="ts" setup>
  import * as Icons from '@ant-design/icons-vue/lib/icons'
  import { ref } from 'vue'
  const iconNames = Object.keys(Icons).slice(0, 10)
  const visible = ref(false)
</script>
<style lang="less" scoped>
  .icon-wrapper {
    width: 300px;
    height: 300px;
    overflow-y: auto;
  }
</style>
