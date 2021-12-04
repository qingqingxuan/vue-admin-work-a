<template>
  <a-card :bodyStyle="{ padding: 0 }">
    <slot name="default"></slot>
  </a-card>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  export default defineComponent({
    name: 'TableBody',
  })
</script>
