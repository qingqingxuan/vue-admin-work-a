<template>
  <a-popover v-model:visible="visible" trigger="click">
    <template #content>
      <div class="icon-container">
        <a-input-search placeholder="搜索图标名称" enter-button @search="onSearch" allowClear />
        <div class="mt-4"></div>
        <div class="icon-wrapper">
          <a-row :wrap="true">
            <a-col :span="4" v-for="item of iconNames" :key="item">
              <div
                class="flex justify-center items-center flex-col icon-item"
                @click="onSelectItem(item)"
              >
                <component :is="item" style="font-size: 22px" />
                <div class="label-name">{{ item }}</div>
              </div>
            </a-col>
          </a-row>
        </div>
        <div class="mt-1"></div>
        <a-pagination
          size="small"
          :pageSize="pageSize"
          :total="total"
          :show-size-changer="false"
          @change="onPageChange"
        />
      </div>
    </template>
    <a-button v-if="!seletedItem">请选择图标</a-button>
    <a-button type="primary" ghost v-else>
      已选择
      <component :is="seletedItem" />
    </a-button>
  </a-popover>
</template>

<script lang="ts" setup>
  import * as Icons from '@ant-design/icons-vue/lib/icons'
  import { useClipboard } from '@vueuse/core'
  import { message } from 'ant-design-vue'
  import { ref, watch } from 'vue'
  const emit = defineEmits(['onSelect', 'update:value'])
  const props = defineProps({
    value: {
      type: String,
      default: '',
    },
    enableCopy: {
      type: Boolean,
      default: false,
    },
  })
  const iconList = Object.keys(Icons)
  const pageSize = 36
  const currentPage = ref(1)
  const iconNames = ref(iconList.slice(0, pageSize))
  const searchList = ref<Array<string>>([])
  const total = ref(iconList.length)
  const visible = ref(false)
  const seletedItem = ref(props.value)
  watch(
    () => props.value,
    (newVal) => {
      seletedItem.value = newVal
    }
  )
  function onPageChange(page: number) {
    currentPage.value = page
    iconNames.value =
      searchList.value.length === 0
        ? iconList.slice((page - 1) * pageSize, page * pageSize)
        : searchList.value.slice((page - 1) * pageSize, page * pageSize)
  }
  function onSearch(searchValue: string) {
    if (searchValue) {
      searchList.value = iconList.filter((it) =>
        it.startsWith(searchValue.slice(0, 1).toUpperCase() + searchValue.slice(1).toLowerCase())
      )
      total.value = searchList.value.length
      iconNames.value = searchList.value.slice(0, pageSize)
    } else {
      searchList.value = []
      total.value = iconList.length
      iconNames.value = iconList.slice(
        (currentPage.value - 1) * pageSize,
        currentPage.value * pageSize
      )
    }
  }
  async function onSelectItem(item: string) {
    emit('onSelect', item)
    emit('update:value', item)
    seletedItem.value = item
    visible.value = false
    if (props.enableCopy) {
      const { isSupported, copied, copy } = useClipboard()
      if (isSupported) {
        await copy(`<${item} />`)
        if (copied) {
          message.success(`已选择并且复制成功 ${item} 图标`)
        }
      }
    }
  }
</script>
<style lang="less" scoped>
  .icon-container {
    width: 350px;
    overflow: hidden;
    text-align: center;
    .icon-wrapper {
      min-height: 300px;
      .icon-item {
        height: 60px;
        overflow: hidden;
        text-align: center;
        .label-name {
          width: 70%;
          margin: 0 auto;
          font-size: 12px;
          color: #888;
          margin-top: 5px;
          text-overflow: ellipsis;
          overflow: hidden;
        }
        .anticon {
          transform: scale(1);
          transition: transform 0.2s linear;
        }
        &:hover {
          cursor: pointer;
          .anticon {
            transform: scale(1.5);
            transition: transform 0.2s linear;
          }
        }
      }
    }
  }
</style>
