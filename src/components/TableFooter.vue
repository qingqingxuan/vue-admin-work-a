<template>
  <a-card :body-style="{ padding: 0 }" class="table-footer-container">
    <div class="flex justify-center items-center">
      <a-pagination
        v-model:current="pagination.page"
        v-model:pageSize="pagination.pageSize"
        :pageSizeOptions="pagination.pageSizes"
        :showSizeChanger="pagination.showSizePicker"
        :total="pagination?.pageCount"
        @showSizeChange="onPageSizeChange"
        @change="onChange"
      />
      <a-button
        v-if="showRefresh"
        style="margin-left: 10px"
        shape="circle"
        size="small"
        type="primary"
        @click="refresh"
      >
        <template #icon>
          <ReloadOutlined style="font-size: 12px" />
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
      function onPageSizeChange(current: number, pageSize: number) {
        ;(pagination as any).value.page = current
        ;(pagination as any).value.pageSize = pageSize
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
