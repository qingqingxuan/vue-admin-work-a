<template>
  <a-card title="缓存信息">
    <template #header>
      <div>缓存信息</div>
    </template>
    <a-input v-model:value="content" placeholder="请输入信息" />
  </a-card>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'

  export default defineComponent({
    name: 'Menu211',
    setup() {
      const content = ref('')
      return {
        content,
      }
    },
  })
</script>
