<template>
  <a-card title="请输入内容" :content-style="{ padding: '10px' }">
    <a-input-search
      :style="{ width: '50%' }"
      v-model:value="content"
      placeholder="请输入内容"
      @search="onCopy"
    >
      <template #enterButton>
        <a-button type="primary">复制</a-button>
      </template>
    </a-input-search>
  </a-card>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useClipboard } from '@vueuse/core'
  import { message } from 'ant-design-vue'

  export default defineComponent({
    name: 'Clipboard',
    setup() {
      const content = ref('')
      const { copy, isSupported, text } = useClipboard({ source: content })
      const onCopy = () => {
        copy(content.value).then(() => {
          message.success('复制成功，内容为：' + text.value)
        })
      }
      if (!isSupported) {
        message.error('当前浏览器不支持此功能')
      }
      return {
        content,
        onCopy,
      }
    },
  })
</script>
