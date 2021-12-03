<template>
  <div style="height: 150vh">
    main,
    <a-modal v-model:visible="visible" title="Basic Modal" @ok="handleOk">
      <p>Some contents...</p>
      <p>Some contents...</p>
      <p>Some contents...</p>
    </a-modal>
    <a-button @click="open">打开</a-button>
  </div>
</template>

<script lang="ts" setup>
  import { Modal } from 'ant-design-vue'
  import { ref } from 'vue'
  const visible = ref(false)
  function open() {
    visible.value = true
    // Modal.success({
    //   title: 'hello',
    //   content: 'content',
    //   zIndex: 10000,
    // })
  }
</script>

<style></style>
