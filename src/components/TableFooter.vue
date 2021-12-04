<template>
  <a-card :content-style="{ padding: 0 }" class="table-footer-container">
    <div class="flex justify-center">
      <n-pagination
        v-model:current="pagination.page"
        v-model:pageSize="pagination.pageSize"
        :pageSizeOptions="pagination.pageSizes"
        show-size-changer
        :total="pagination?.pageCount"
        @showSizeChange="onPageSizeChange"
      />
      <a-button
        v-if="showRefresh"
        shape="circle"
        class="ml-1"
        size="small"
        type="primary"
        @click="refresh"
      >
        <template #icon>
          <RefreshIcon />
        </template>
      </a-button>
    </div>
  </a-card>
</template>

<script lang="ts">
  import { defineComponent, toRef } from 'vue'

  export default defineComponent({
    name: 'TableFooter',
    props: {
      pagination: {
        type: Object,
        require: true,
      },
      showRefresh: {
        type: Boolean,
        default: true,
      },
    },
    setup(props) {
      const pagination = toRef(props, 'pagination')
      function onChange(page: number) {
        ;(pagination as any).value.page = page
        ;(pagination as any).value.onChange()
      }
      function onPageSizeChange(pageSize: number) {
        ;(pagination as any).value.page = 1
        ;(pagination as any).value.pageSize = pageSize
        ;(pagination as any).value.onPageSizeChange()
      }
      function refresh() {
        ;(pagination as any).value.onChange()
      }
      return {
        onChange,
        onPageSizeChange,
        refresh,
      }
    },
  })
</script>
<style lang="less" scoped>
  .table-footer-container {
    height: 45px;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
  }
</style>
