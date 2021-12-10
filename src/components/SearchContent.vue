<template>
  <a-modal
    v-model:visible="visible"
    :closable="false"
    :footer="null"
    :bodyStyle="{ padding: '0 10px' }"
  >
    <a-tabs v-model:activeKey="activeKey" size="small">
      <a-tab-pane key="1">
        <template #tab>
          <file-search-outlined />
          <span> 站内 </span>
        </template>
        <div class="p-4">
          <a-tree-select
            v-model:value="innerValue"
            show-search
            style="width: 100%"
            :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
            placeholder="请输入菜单名称"
            allow-clear
            size="large"
            @select="onSelectItem"
            :tree-data="searchList"
          >
          </a-tree-select>
        </div>
      </a-tab-pane>
      <a-tab-pane key="2">
        <template #tab>
          <search-outlined />
          <span> 站外 </span>
        </template>
        <div class="p-4">
          <a-input-search
            v-model:value="outValue"
            placeholder="请输入关键字"
            enter-button
            allowClear
            size="large"
            @search="onOutSearch"
          />
        </div>
      </a-tab-pane>
    </a-tabs>
  </a-modal>
</template>

<script lang="ts">
  import { useLayoutStore } from '@/layouts'
  import { RouteRecordRawWithHidden } from '@/types/store'
  import { message } from 'ant-design-vue'
  import { defineComponent, onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  interface InnerSearchItem {
    title: string
    value: string
    children?: InnerSearchItem[]
  }

  export default defineComponent({
    setup() {
      const visible = ref(false)
      const activeKey = ref('1')
      const outValue = ref('')
      const innerValue = ref(undefined)
      const searchList = ref<Array<InnerSearchItem>>([])
      function show() {
        visible.value = true
      }
      function close() {
        visible.value = false
      }
      function onOutSearch() {
        if (outValue.value) {
          visible.value = false
          window.open('https://www.baidu.com/s?wd=' + outValue.value)
        }
      }
      const store = useLayoutStore()
      function transformRoutes(
        routes: RouteRecordRawWithHidden[],
        parentPath: string = '/'
      ): InnerSearchItem[] {
        const list: InnerSearchItem[] = []
        routes
          .filter((it) => it.hidden !== true && it.fullPath !== parentPath)
          .forEach((it) => {
            const searchItem: InnerSearchItem = {
              value: ((it.meta?.title as string) || '') + ':' + it.path,
              title: it.meta ? (it.meta.title as string) : '',
            }
            if (it.children && it.children.length > 0) {
              searchItem.children = transformRoutes(it.children, it.fullPath)
            }
            list.push(searchItem)
          })
        return list
      }
      const router = useRouter()
      function onSelectItem(value: any, option: any) {
        const items = value.split(':')
        if (option.children && option.children.length > 0) {
          message.success('请选择' + items[0] + '下的子菜单')
          return
        }
        router.push(items[1]).then(() => {
          visible.value = false
        })
      }
      onMounted(() => {
        searchList.value = transformRoutes(store.state.permissionRoutes)
      })
      return {
        visible,
        activeKey,
        searchList,
        outValue,
        innerValue,
        show,
        close,
        onOutSearch,
        onSelectItem,
      }
    },
  })
</script>
