<template>
  <div style="height: 150vh"> main, {{ version }} </div>
</template>

<script lang="ts" setup>
  // const version = process.env.version
  const { version } = __VERSION__INFO
</script>

<style></style>
