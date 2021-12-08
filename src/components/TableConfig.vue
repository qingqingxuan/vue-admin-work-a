<template>
  <a-space align="center">
    <a-checkbox v-model:checked="border" @change="updateBorder">表格边框</a-checkbox>
    <a-checkbox v-model:checked="striped" @change="updateStriped">斑马纹</a-checkbox>
    <a-tooltip class="item" trigger="hover" placement="top">
      <template #title> 刷新页面 </template>
      <a-button shape="circle" type="primary" size="small" @click="doRefresh">
        <template #icon>
          <ReloadOutlined />
        </template>
      </a-button>
    </a-tooltip>
  </a-space>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    name: 'TableConfig',
    emits: ['refresh', 'update-border', 'update-striped'],
    setup(props, { emit }) {
      function doRefresh() {
        emit('refresh')
      }
      const border = ref(false)
      const striped = ref(false)
      function updateBorder() {
        emit('update-border', border.value)
      }
      function updateStriped() {
        emit('update-striped', striped.value)
      }
      return {
        border,
        striped,
        doRefresh,
        updateBorder,
        updateStriped,
      }
    },
  })
</script>
