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
          :columns="tableColumns"
          :pagination="false"
        >
          <template #bodyCell="{ column, record }">
            <template v-if="column.key === 'status'">
              <a-tag :color="record.status === 1 ? 'success' : 'error'">
                {{ record.status === 1 ? '正常' : '禁用' }}
              </a-tag>
            </template>
            <template v-if="column.key === 'actions'">
              <a-button type="primary" size="small"> 编辑 </a-button>
            </template>
          </template>
        </a-table>
      </template>
    </TableBody>
    <ModalDialog ref="modalDialog" @confirm="onDataFormConfirm">
      <template #content>
        <!-- <DataForm ref="itemDataFormRef" :options="itemFormOptions" /> -->
        <div style="height: 10vh">asdfasd</div>
      </template>
    </ModalDialog>
  </div>
</template>

<script lang="ts">
  import { getDepartmentList } from '@/api/url'
  import { TableActionModel, useTable, useTableColumn } from '@/hooks/table'
  import { defineComponent, h, nextTick, onMounted, Ref, ref, shallowReactive } from 'vue'
  import _ from 'lodash'
  import usePost from '@/hooks/usePost'
  import { message } from 'ant-design-vue'
  import type { ModalDialogType } from '@/types/components'
  interface Department {
    parentId: number
    id: number
    name: string
    depCode: string
    order: number
    status: number
    children: Array<Department>
  }
  const DP_CODE_FLAG = 'dp_code_'
  // const itemFormOptions = [
  //   {
  //     key: 'parentId',
  //     label: '父级部门',
  //     value: ref(null),
  //     optionItems: shallowReactive([] as Array<SelectOption>),
  //     render: (formItem) => {
  //       return h(NSelect, {
  //         value: formItem.value.value,
  //         onUpdateValue: (val) => {
  //           formItem.value.value = val
  //         },
  //         placeholder: '请选择父级部门',
  //         options: formItem.optionItems as Array<SelectOption>,
  //       })
  //     },
  //   },
  //   {
  //     key: 'name',
  //     label: '部门名称',
  //     type: 'input',
  //     value: ref(null),
  //     render: (formItem) => {
  //       return h(NInput, {
  //         value: formItem.value.value,
  //         onUpdateValue: (newVal) => {
  //           formItem.value.value = newVal
  //         },
  //         maxlength: 50,
  //         placeholder: '请输入部门名称',
  //       })
  //     },
  //     validator: (formItem, message) => {
  //       if (!formItem.value.value) {
  //         message.error('请输入部门名称')
  //         return false
  //       }
  //       return true
  //     },
  //   },
  //   {
  //     label: '部门编号',
  //     key: 'depCode',
  //     value: ref(null),
  //     render: (formItem) => {
  //       return h(
  //         NInput,
  //         {
  //           value: formItem.value.value,
  //           onUpdateValue: (val) => {
  //             formItem.value.value = val
  //           },
  //           placeholder: '请输入部门编号',
  //         },
  //         {
  //           prefix: () => DP_CODE_FLAG,
  //         }
  //       )
  //     },
  //     validator: (formItem, message) => {
  //       if (!formItem.value.value) {
  //         message.error('请输入部门编号')
  //         return false
  //       }
  //       return true
  //     },
  //   },
  // ] as Array<FormItem>
  export default defineComponent({
    name: 'Department',
    setup() {
      const table = useTable()
      // const naiveDailog = useDialog()
      const tableColumns = useTableColumn([
        {
          title: '部门名称',
          key: 'name',
          dataIndex: 'name',
          align: 'center',
        },
        {
          title: '部门编号',
          key: 'depCode',
          dataIndex: 'depCode',
          align: 'center',
        },
        {
          title: '排序',
          key: 'order',
          dataIndex: 'order',
          align: 'center',
        },
        {
          title: '状态',
          key: 'status',
          dataIndex: 'status',
          align: 'center',
        },
        {
          title: '操作',
          key: 'actions',
          dataIndex: 'actions',
          align: 'center',
        },
      ])
      // const itemDataFormRef = ref<DataFormType | null>(null)
      // const searchDataFormRef = ref<DataFormType | null>(null)
      const modalDialog = ref<ModalDialogType | null>(null)
      const post = usePost()
      function doRefresh() {
        post({
          url: getDepartmentList,
        })
          .then(({ data = [] }) => {
            table.tableLoading.value = false
            table.dataList.length = 0
            table.dataList.push(...data)
            return data
          })
          .then((res) => {
            // const parentFormItem = itemFormOptions.find((it) => it.key === 'parentId') as FormItem
            // ;(parentFormItem.optionItems as Array<SelectOption>).length = 0
            // parentFormItem?.optionItems?.push(
            //   ...(res as unknown as Array<any>).map((it) => {
            //     return {
            //       label: it.name,
            //       value: it.id,
            //     }
            //   })
            // )
          })
      }
      function filterItems(srcArray: Array<Department>, filterItem: Department) {
        for (let index = 0; index < srcArray.length; index++) {
          const element = srcArray[index]
          if (element.id === filterItem.id) {
            if (!_.isEmpty(element.children)) {
              message.error('当前部门下有子部门，不能删除')
              return
            }
            srcArray.splice(index, 1)
            return
          } else {
            if (!_.isEmpty(element.children)) {
              filterItems(element.children, filterItem)
            }
          }
        }
      }
      const onDeleteItem = (item: any) => {
        // naiveDailog.warning({
        //   title: '提示',
        //   content: '确定要删除此信息，删除后不可恢复？',
        //   positiveText: '删除',
        //   negativeText: '再想想',
        //   onPositiveClick: () => {
        //     filterItems(table.dataList, item)
        //   },
        // })
      }
      function onAddItem() {
        modalDialog.value?.toggle()
        // nextTick(() => {
        //   itemDataFormRef.value?.reset()
        // })
      }
      function onDataFormConfirm() {
        // if (itemDataFormRef.value?.validator()) {
        //   modalDialog.value?.toggle()
        //   naiveDailog.success({
        //     title: '提示',
        //     positiveText: '确定',
        //     content:
        //       '模拟部门添加/编辑成功，数据为：' +
        //       JSON.stringify(itemDataFormRef.value.generatorParams()),
        //   })
        // }
      }
      function onUpdateItem(item: any) {
        // modalDialog.value?.toggle()
        // nextTick(() => {
        //   itemFormOptions.forEach((it) => {
        //     const key = it.key
        //     const propName = item[key]
        //     if (propName) {
        //       if (it.key === 'depCode') {
        //         it.value.value = propName.replace(DP_CODE_FLAG, '')
        //       } else {
        //         it.value.value = propName
        //       }
        //     }
        //   })
        // })
      }
      function rowKey(rowData: any) {
        return rowData.id
      }
      onMounted(doRefresh)
      return {
        // itemDataFormRef,
        // searchDataFormRef,
        onDataFormConfirm,
        tableColumns,
        onUpdateItem,
        ...table,
        onDeleteItem,
        onAddItem,
        // itemFormOptions,
        rowKey,
        modalDialog,
      }
    },
  })
</script>
