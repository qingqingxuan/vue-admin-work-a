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
              <a-space>
                <a-button type="primary" size="small" @click="onUpdateItem(record)">
                  编辑
                </a-button>
                <a-button danger size="small" @click="onDeleteItem(record)"> 删除 </a-button>
              </a-space>
            </template>
          </template>
        </a-table>
      </template>
    </TableBody>
    <ModalDialog ref="modalDialog" :title="dialogTitle" @confirm="onDataFormConfirm">
      <template #content>
        <a-form ref="formRef" :model="departmentModel" :labelCol="{ span: 4 }" :rules="formRule">
          <a-form-item label="上级部门" name="parentId">
            <a-select v-model:value="departmentModel.parentId" placeholder="请选择上级部门">
              <a-select-option v-for="item of dataList" :key="item.id" :value="item.id">
                {{ item.name }}
              </a-select-option>
            </a-select>
          </a-form-item>
          <a-form-item label="部门名称" name="name">
            <a-input placeholder="请输入部门名称" v-model:value="departmentModel.name"> </a-input>
          </a-form-item>
          <a-form-item label="部门编号" name="depCode">
            <a-input
              :addon-before="DP_CODE_FLAG"
              placeholder="请输入部门编号"
              v-model:value="departmentModel.depCode"
            >
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
  import { Form, message, Modal } from 'ant-design-vue'
  import type { ModalDialogType } from '@/types/components'
  interface Department {
    parentId: number | undefined
    id: number
    name: string
    depCode: string
    order: number
    status: number
    children?: Array<Department>
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
      const departmentModel = reactive<Department>({
        parentId: undefined,
        id: 0,
        name: '',
        depCode: '',
        order: 1,
        status: 1,
      })
      const formRule = {
        name: [
          { required: true, message: '请输入部门名称', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 - 10个字符', trigger: 'blur' },
        ],
        depCode: [
          { required: true, message: '请输入部门编号', trigger: 'blur' },
          { min: 3, max: 10, message: '长度在 3 - 30个字符', trigger: 'blur' },
        ],
      }
      const formRef = ref<typeof Form>()
      const dialogTitle = ref()
      const modalDialog = ref<ModalDialogType | null>(null)
      const post = usePost()
      function doRefresh() {
        post({
          url: getDepartmentList,
        }).then(({ data = [] }) => {
          table.tableLoading.value = false
          table.dataList.length = 0
          table.dataList.push(...data)
          return data
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
              filterItems(element.children as Array<Department>, filterItem)
            }
          }
        }
      }
      const onDeleteItem = (item: any) => {
        Modal.confirm({
          title: '提示',
          content: '确定要删除此信息，删除后不可恢复？',
          onOk() {
            filterItems(table.dataList, item)
          },
        })
      }
      function onAddItem() {
        dialogTitle.value = '添加部门'
        departmentModel.parentId = undefined
        departmentModel.id = 0
        departmentModel.status = 1
        departmentModel.depCode = ''
        departmentModel.name = ''
        departmentModel.order = 1
        modalDialog.value?.toggle()
      }
      function onDataFormConfirm() {
        formRef.value
          ?.validate()
          .then(() => {
            modalDialog.value?.close()
            message.success('模拟部门添加/编辑成功，数据为：' + JSON.stringify(departmentModel))
          })
          .catch((error: any) => {
            console.log('error', error)
          })
      }
      function onUpdateItem(item: Department) {
        dialogTitle.value = '编辑部门'
        Object.keys(item).forEach((it) => {
          ;(departmentModel as any)[it] = (item as any)[it]
        })
        departmentModel.parentId = item.parentId
        modalDialog.value?.toggle()
      }
      onMounted(doRefresh)
      return {
        DP_CODE_FLAG,
        formRef,
        dialogTitle,
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
