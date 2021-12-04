<template>
  <a-modal
    v-model:visible="showModal"
    :title="title"
    class="modal-dialog-wrapper"
    :style="bodyStyle"
    cancelText="取消"
    okText="确定"
  >
    <div :style="{ maxHeight: '50vh', overflow: 'auto' }">
      <slot name="content"></slot>
    </div>
  </a-modal>
</template>

<script lang="ts">
  import { computed, defineComponent, ref } from 'vue'
  import { useLayoutStore } from '@/layouts'

  export default defineComponent({
    name: 'ModalDialog',
    props: {
      title: {
        type: String,
        default: '操作',
      },
      contentHeight: {
        type: String,
        default: '30vh',
      },
    },
    emits: ['confirm', 'cancel'],
    setup(props, { emit }) {
      const showModal = ref(false)
      const header = ref<HTMLElement | null>()
      const layoutStore = useLayoutStore()
      const bodyStyle = computed(() => ({
        width: layoutStore.state.device === 'mobile' ? '80%' : '50%',
      }))
      function toggle() {
        showModal.value = !showModal.value
        console.log(showModal)
        return Promise.resolve(showModal.value)
      }
      function show() {
        showModal.value = true
        return Promise.resolve(true)
      }
      function close() {
        showModal.value = false
        return Promise.resolve(false)
      }
      function onConfirm() {
        emit('confirm')
      }
      function onCancel() {
        showModal.value = false
        emit('cancel')
      }
      return {
        showModal,
        bodyStyle,
        toggle,
        show,
        close,
        onConfirm,
        onCancel,
      }
    },
  })
</script>
