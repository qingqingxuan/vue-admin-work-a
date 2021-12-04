<template>
  <div id="tableHeaderContainer" class="relative">
    <a-card :title="title" size="small" :bodyStyle="{ padding: '0px' }">
      <template #extra>
        <a-space>
          <slot name="table-config"></slot>
          <a-tooltip class="ml-2 mr-2" trigger="hover" v-if="showFilter">
            <template #trigger>
              <a-button type="primary" size="small" @click="showSearchContent = !showSearchContent">
                <template #icon>
                  <FilterOutlined />
                </template>
                筛选条件
              </a-button>
            </template>
            展开筛选条件
          </a-tooltip>
          <slot name="top-right"></slot>
        </a-space>
      </template>
      <a-drawer
        v-model:visible="showSearchContent"
        placement="top"
        :getContainer="false"
        title="搜索条件"
        :height="searchContentHeight"
      >
        <slot name="search-content"></slot>
        <template #extra>
          <div class="flex justify-end">
            <a-space>
              <a-button danger size="small" @click="doResetSearch">重置</a-button>
              <a-button type="primary" size="small" @click="doSearch">搜索</a-button>
            </a-space>
          </div>
        </template>
      </a-drawer>
    </a-card>
  </div>
</template>

<script lang="ts">
  import { defineComponent, nextTick, onMounted, ref } from 'vue'

  export default defineComponent({
    name: 'TableHeader',
    props: {
      title: {
        type: String,
        default: '基本操作',
      },
      showFilter: {
        type: Boolean,
        default: true,
      },
      searchContentHeight: {
        type: String,
        default: '300px',
      },
    },
    emits: ['search', 'reset-search'],
    setup(props, { emit }) {
      const showSearchContent = ref(false)
      const target = ref<HTMLElement | null>(null)
      onMounted(() => {
        nextTick(() => {
          target.value = document.getElementById('tableHeaderContainer')
        })
      })
      function doSearch() {
        showSearchContent.value = false
        emit('search')
      }
      function doResetSearch() {
        emit('reset-search')
      }
      return {
        showSearchContent,
        target,
        doSearch,
        doResetSearch,
      }
    },
  })
</script>
