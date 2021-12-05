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
    <ModalDialog ref="modalDialog" title="添加部门" @confirm="onDataFormConfirm">
      <template #content>
        <a-form :model="departmentModel" :labelCol="{ span: 4 }" :rules="formRule">
          <a-form-item label="上级部门" name="parentId">
            <a-select v-model:value="departmentModel.parentId" placeholder="请选择上级部门">
              <a-select-option
                v-for="item of departmentModel.children"
                :key="item.id"
                :value="item.depCode"
                >{{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="部门编号" name="depCode">
            <a-input placeholder="请输入部门编号" v-model:value="departmentModel.depCode">
            </a-input>
          </a-form-item>
          <a-form-item label="排序" name="order">
            <a-input-number v-model:value="departmentModel.order" />
          </a-form-item>
          <a-form-item label="状态" name="status">
            <a-radio-group v-model:value="departmentModel.status">
              <a-radio :value="1">正常</a-radio>
              <a-radio :value="0">禁用</a-radio>
            </a-radio-group>
          </a-form-item>
        </a-form>
      </template>
    </ModalDialog>
  </div>
</template>

<script lang="ts">
  import { getDepartmentList } from '@/api/url'
  import { useTable, useTableColumn } from '@/hooks/table'
  import { defineComponent, onMounted, reactive, ref } from 'vue'
  import _ from 'lodash'
  import usePost from '@/hooks/usePost'
  import { message } from 'ant-design-vue'
  import type { DataFormType, ModalDialogType } from '@/types/components'
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
  export default defineComponent({
    name: 'Department',
    setup() {
      const table = useTable()
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
      const departmentModel = reactive({
        parentId: undefined,
        id: '',
        name: '',
        depCode: '',
        order: 1,
        status: 1,
        children: [],
      })
      const formRule = {
        depCode: [
          { required: true, message: '请输入部门编号', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 - 10个字符', trigger: 'blur' },
        ],
      }
      const itemDataFormRef = ref<DataFormType | null>(null)
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
        itemDataFormRef,
        departmentModel,
        formRule,
        ...table,
        tableColumns,
        onUpdateItem,
        onDataFormConfirm,
        onDeleteItem,
        onAddItem,
        modalDialog,
      }
    },
  })
</script>
