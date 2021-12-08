<template>
  <div class="main-container">
    <TableHeader :show-filter="false">
      <template #top-right>
        <AddButton @add="onAddItem" />
      </template>
    </TableHeader>
    <TableBody>
      <template #default>
        <a-table
          :loading="tableLoading"
          :data-source="dataList"
          :row-key="rowKey"
          :columns="tableColumns"
          :pagination="false"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'index'">
              {{ index + 1 }}
            </template>
            <template v-if="column.key === 'icon'">
              <component :is="record.icon || 'MenuOutlined'" style="font-size: 18px" />
            </template>
            <template v-if="column.key === 'cacheable'">
              <a-tag size="small" :color="record.cacheable ? 'success' : 'error'">
                {{ record.cacheable ? '是' : '否' }}
              </a-tag>
            </template>
            <template v-if="column.key === 'hidden'">
              <a-tag size="small" :color="record.hidden ? 'success' : 'error'">
                {{ record.hidden ? '是' : '否' }}
              </a-tag>
            </template>
            <template v-if="column.key === 'affix'">
              <a-tag size="small" :color="record.affix ? 'success' : 'error'">
                {{ record.affix ? '是' : '否' }}
              </a-tag>
            </template>
            <template v-if="column.key === 'actions'">
              <a-space>
                <a-button ghost type="primary" @click="onUpdateItem(record)" size="small">
                  编辑
                </a-button>
                <a-button danger size="small" @click="onDeleteItem(record)">删除</a-button>
              </a-space>
            </template>
          </template>
        </a-table>
      </template>
    </TableBody>
    <ModalDialog
      ref="modalDialog"
      :title="actionModel === 'add' ? '添加菜单' : '编辑菜单'"
      @confirm="onConfirm"
      content-height="50vh"
    >
      <template #content>
        <a-form :wrapperCol="{ span: 18 }">
          <a-form-item
            :class="[item.required ? 'form-item__require' : 'form-item__no_require']"
            :label="item.label"
            v-for="item of itemFormOptions"
            :key="item.key"
          >
            <template v-if="item.type === 'tree-select'">
              <a-tree-select
                v-model:value="item.value.value"
                show-search
                :fieldNames="{ label: 'menuName', key: 'menuUrl', value: 'menuUrl' }"
                style="width: 100%"
                :dropdown-style="{ maxHeight: '400px', overflow: 'auto' }"
                :placeholder="item.placeholder"
                allow-clear
                :tree-data="dataList"
              >
              </a-tree-select>
            </template>
            <template v-if="item.type === 'input'">
              <a-input v-model:value="item.value.value" :placeholder="item.placeholder"></a-input>
            </template>
            <template v-if="item.type === 'icon'">
              <IconSelector v-model:value="item.value.value"></IconSelector>
            </template>
            <template v-if="item.type === 'switch'">
              <a-switch v-model:checked="item.value.value"></a-switch>
            </template>
          </a-form-item>
        </a-form>
      </template>
    </ModalDialog>
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref, Ref } from 'vue'
  import { post } from '@/api/http'
  import { getMenuList } from '@/api/url'
  import { useRowKey, useTable, useTableColumn } from '@/hooks/table'
  import { DataFormType, ModalDialogType, FormItem } from '@/types/components'
  import { message, Modal } from 'ant-design-vue'
  export default defineComponent({
    name: 'Menu',
    setup() {
      const actionModel = ref('add')
      let tempItem: { menuUrl: string } | null = null
      const table = useTable()
      const modalDialog = ref<ModalDialogType | null>(null)
      const dataForm = ref<DataFormType | null>(null)
      const rowKey = useRowKey('menuUrl')
      const tableColumns = useTableColumn(
        [
          {
            title: '菜单名称',
            key: 'menuName',
            dataIndex: 'menuName',
          },
          {
            title: '菜单地址',
            key: 'menuUrl',
            dataIndex: 'menuUrl',
          },
          {
            title: '菜单图标',
            key: 'icon',
          },
          {
            title: '是否缓存',
            key: 'cacheable',
            dataIndex: 'cacheable',
          },
          {
            title: '是否隐藏',
            key: 'hidden',
            dataIndex: 'hidden',
          },
          {
            title: '是否固定标题栏',
            key: 'affix',
            dataIndex: 'affix',
          },
          {
            title: '操作',
            key: 'actions',
          },
        ],
        {
          align: 'center',
        }
      )
      const itemFormOptions = [
        {
          label: '上级菜单',
          key: 'parentPath',
          value: ref(undefined),
          placeholder: '请选择上级菜单',
          type: 'tree-select',
          reset: function () {
            this.value.value = undefined
          },
        },
        {
          label: '菜单名称',
          key: 'menuName',
          required: true,
          type: 'input',
          placeholder: '请输入菜单名称',
          value: ref(''),
          validator: function () {
            if (!this.value.value) {
              message.error(this.placeholder)
              return false
            }
            return true
          },
          reset: function () {
            this.value.value = ''
          },
        },
        {
          label: '菜单地址',
          key: 'menuUrl',
          required: true,
          value: ref(''),
          type: 'input',
          disabled: ref(false),
          placeholder: '请输入菜单地址',
          validator: function () {
            if (!this.value.value) {
              message.error(this.placeholder)
              return false
            }
            return true
          },
          reset: function () {
            this.value.value = ''
          },
        },
        {
          label: '外链地址',
          key: 'redirect',
          type: 'input',
          placeholder: '请输入外链地址',
          value: ref(''),
          reset: function () {
            this.value.value = ''
          },
        },
        {
          label: '菜单图标',
          key: 'icon',
          type: 'icon',
          value: ref(''),
          reset: function () {
            this.value.value = ''
          },
        },
        {
          label: '是否缓存',
          key: 'cacheable',
          type: 'switch',
          value: ref(false),
          reset: function () {
            this.value.value = false
          },
        },
        {
          label: '是否隐藏',
          key: 'hidden',
          type: 'switch',
          value: ref(false),
          reset: function () {
            this.value.value = false
          },
        },
        {
          label: '是否固定',
          key: 'affix',
          type: 'switch',
          value: ref(false),
          reset: function () {
            this.value.value = false
          },
        },
      ] as Array<FormItem>
      function doRefresh() {
        post({
          url: getMenuList,
          data: {},
        })
          .then(table.handleSuccess)
          .catch(console.log)
      }
      function onAddItem() {
        actionModel.value = 'add'
        itemFormOptions.forEach((it) => {
          it.reset && it.reset()
        })
        modalDialog.value?.show()
      }
      function onUpdateItem(item: any) {
        actionModel.value = 'edit'
        tempItem = item
        itemFormOptions.forEach((it) => {
          it.value.value = item[it.key] || null
          if (it.key === 'menuUrl' && it.disabled) {
            ;(it.disabled as Ref<boolean>).value = true
          }
        })
        modalDialog.value?.show()
      }
      function onConfirm() {
        if (actionModel.value === 'add') {
          if (itemFormOptions.every((it) => (it.validator ? it.validator() : true))) {
            modalDialog.value?.close()
            message.success(
              '模拟创建菜单成功, 参数为:' +
                JSON.stringify(
                  itemFormOptions.reduce((pre, cur) => {
                    ;(pre as any)[cur.key] = cur.value.value || ''
                    return pre
                  }, {})
                )
            )
          }
        } else {
          // if (dataForm.value?.validator()) {
          //   const params = dataForm.value?.generatorParams()
          //   if (tempItem) {
          //     const tempRoute = findRouteByUrl(layoutStore.state.permissionRoutes, tempItem.menuUrl)
          //     if (tempRoute && tempRoute.meta && tempRoute.meta.badge) {
          //       ;(tempRoute.meta as any).badge = (params as any).badge || ''
          //     }
          //   }
          //   message.success('模拟修改菜单成功, 参数为:' + JSON.stringify(params))
          // }
        }
      }
      function onDeleteItem(item: any) {
        Modal.confirm({
          title: '提示',
          content: '是否要删除此数据？',
          okText: '删除',
          cancelText: '取消',
          onOk: () => {
            message.success('模拟删除成功，参数为：' + JSON.stringify(item))
          },
        })
      }
      onMounted(doRefresh)
      return {
        rowKey,
        actionModel,
        modalDialog,
        dataForm,
        ...table,
        itemFormOptions,
        tableColumns,
        onAddItem,
        onDeleteItem,
        onUpdateItem,
        onConfirm,
      }
    },
  })
</script>
