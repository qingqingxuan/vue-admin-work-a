<template>
  <div class="bg-black test"> 111 </div>
</template>
<script setup lang="ts">
  import { ref } from 'vue'

  defineProps<{ msg: string }>()

  const count = ref(0)
</script>

<style scoped lang="less">
  .test {
    width: @menuWidth;
  }
</style>
