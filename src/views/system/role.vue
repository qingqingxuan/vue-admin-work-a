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
          :row-key="rowKey"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'index'">
              {{ index + 1 }}
            </template>
            <template v-if="column.key === 'actions'">
              <a-space>
                <a-button ghost type="primary" @click="onUpdateItem(record)" size="small"
                  >编辑</a-button
                >
                <a-button danger size="small" @click="onDeleteItem(record)">删除</a-button>
                <a-button ghost type="primary" size="small" @click="onShowMenu(record)">
                  菜单权限
                </a-button>
              </a-space>
            </template>
          </template>
        </a-table>
      </template>
    </TableBody>
    <ModalDialog ref="modalDialogRef" :title="actionTitle" @confirm="onDataFormConfirm">
      <template #content>
        <a-form>
          <a-form-item
            :class="[item.required ? 'form-item__require' : 'form-item__no_require']"
            :label="item.label"
            v-for="item of formItems"
            :key="item.key"
          >
            <template v-if="item.type === 'input'">
              <a-input
                :addon-before="item.key === 'roleCode' ? ROLE_CODE_FLAG : ''"
                :placeholder="item.placeholder"
                v-model:value="item.value.value"
              >
              </a-input>
            </template>
            <template v-if="item.type === 'textarea'">
              <a-textarea
                v-model:value="item.value.value"
                :placeholder="item.placeholder"
                :auto-size="{ minRows: 3, maxRows: 5 }"
              />
            </template>
          </a-form-item>
        </a-form>
      </template>
    </ModalDialog>
    <ModalDialog ref="menuModalDialogRef" title="编辑菜单权限">
      <template #content>
        <a-tree
          :tree-data="menuData"
          checkable
          v-model:expandedKeys="defaultExpandedKeys"
          v-model:checkedKeys="defaultCheckedKeys"
        />
      </template>
    </ModalDialog>
  </div>
</template>

<script lang="ts">
  import { post } from '@/api/http'
  import { getMenuListByRoleId, getRoleList } from '@/api/url'
  import { useRowKey, useTable, useTableColumn } from '@/hooks/table'
  import { ModalDialogType, FormItem } from '@/types/components'
  import { message, Modal } from 'ant-design-vue'
  import { defineComponent, nextTick, onMounted, ref, shallowReactive } from 'vue'
  const ROLE_CODE_FLAG = 'ROLE_'
  const formItems = [
    {
      label: '角色名称',
      type: 'input',
      key: 'name',
      value: ref(''),
      required: true,
      placeholder: '请输入角色名称',
      validator: function () {
        if (!this.value.value) {
          message.error(this.placeholder)
          return false
        }
        return true
      },
    },
    {
      label: '角色编号',
      key: 'roleCode',
      value: ref(''),
      type: 'input',
      required: true,
      placeholder: '请输入角色编号',
      validator: function () {
        if (!this.value.value) {
          message.error(this.placeholder)
          return false
        }
        return true
      },
    },
    {
      label: '角色描述',
      key: 'description',
      value: ref(''),
      type: 'textarea',
      placeholder: '请输入角色描述',
    },
  ] as FormItem[]
  function handleMenuData(
    menuData: Array<any>,
    defaultCheckedKeys: Array<string>,
    defaultExpandedKeys: Array<string>
  ) {
    const tempMenus = [] as Array<any>
    menuData.forEach((it) => {
      const tempMenu = {} as any
      tempMenu.key = it.menuUrl
      tempMenu.title = it.menuName
      defaultCheckedKeys.push(tempMenu.key as string)
      if (it.children) {
        defaultExpandedKeys.push(tempMenu.key as string)
        tempMenu.children = handleMenuData(it.children, defaultCheckedKeys, defaultExpandedKeys)
      }
      tempMenus.push(tempMenu)
    })
    return tempMenus
  }
  export default defineComponent({
    name: 'Role',
    setup() {
      const modalDialogRef = ref<ModalDialogType | null>(null)
      const menuModalDialogRef = ref<ModalDialogType | null>(null)
      const table = useTable()
      const rowKey = useRowKey('id')
      const actionTitle = ref('添加角色')
      const menuData = shallowReactive([] as Array<any>)
      const tableColumns = useTableColumn(
        [
          table.indexColumn,
          {
            title: '角色名称',
            key: 'name',
            dataIndex: 'name',
          },
          {
            title: '角色编号',
            key: 'roleCode',
            dataIndex: 'roleCode',
          },
          {
            title: '角色描述',
            key: 'description',
            dataIndex: 'description',
          },
          {
            title: '创建时间',
            key: 'createTime',
            dataIndex: 'createTime',
          },
          {
            title: '角色编号',
            key: 'roleCode',
            dataIndex: 'roleCode',
          },
          {
            title: '操作',
            key: 'actions',
          },
        ],
        { align: 'center' }
      )
      const defaultCheckedKeys = shallowReactive([] as Array<string>)
      const defaultExpandedKeys = shallowReactive([] as Array<string>)
      function doRefresh() {
        post({
          url: getRoleList,
          data: {},
        })
          .then(table.handleSuccess)
          .catch(console.log)
      }
      function onAddItem() {
        actionTitle.value = '添加角色'
        modalDialogRef.value?.toggle()
      }
      function onUpdateItem(item: any) {
        actionTitle.value = '编辑角色'
        modalDialogRef.value?.toggle()
        nextTick(() => {
          formItems.forEach((it) => {
            const key = it.key
            const propName = item[key]
            if (propName) {
              if (it.key === 'roleCode') {
                it.value.value = propName.replace(ROLE_CODE_FLAG, '')
              } else {
                it.value.value = propName
              }
            }
          })
        })
      }
      function onDeleteItem(data: any) {
        Modal.confirm({
          title: '提示',
          content: '是否要删除此角色？',
          cancelText: '取消',
          okText: '删除',
          onOk: () => {
            message.success('模拟角色删除成功，参数为' + JSON.stringify(data))
          },
        })
      }
      function onDataFormConfirm() {
        if (formItems.every((it) => (it.validator ? it.validator() : true))) {
          modalDialogRef.value?.toggle()
          message.success(
            '模拟菜单添加成功，参数为：' +
              JSON.stringify(
                formItems.reduce((pre, cur) => {
                  ;(pre as any)[cur.key] = cur.value.value
                  return pre
                }, {})
              )
          )
        }
      }
      function onShowMenu(item: any) {
        post({
          url: getMenuListByRoleId,
          data: {
            roleId: item.id,
          },
        })
          .then((res) => {
            menuData.length = 0
            defaultCheckedKeys.length = 0
            defaultExpandedKeys.length = 0
            menuData.push(...handleMenuData(res.data, defaultCheckedKeys, defaultExpandedKeys))
            menuModalDialogRef.value?.toggle()
          })
          .catch(console.log)
      }
      onMounted(doRefresh)
      return {
        ROLE_CODE_FLAG,
        modalDialogRef,
        menuModalDialogRef,
        rowKey,
        menuData,
        tableColumns,
        formItems,
        actionTitle,
        defaultCheckedKeys,
        defaultExpandedKeys,
        ...table,
        onAddItem,
        onDataFormConfirm,
        onShowMenu,
        onDeleteItem,
        onUpdateItem,
      }
    },
  })
</script>
