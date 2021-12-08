<template>
  <div class="main-container">
    <TableHeader :show-filter="false">
      <template #table-config>
        <TableConfig
          @update-border="onUpdateBorder"
          @update-striped="onUpdateStriped"
          @refresh="doRefresh"
        />
        <SortableTable class="ml-4" :columns="tableColumns" @update="onUpdateTable" />
      </template>
    </TableHeader>
    <TableBody>
      <template #default>
        <a-table
          class="ant-table-striped"
          :loading="tableLoading"
          :bordered="bordered"
          :striped="striped"
          :data-source="dataList"
          :columns="tableColumns"
          :pagination="false"
          :row-key="rowKey"
          :row-class-name="
            (_record, index) => (index % 2 === 1 && striped ? 'table-striped' : null)
          "
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column">
              <template v-if="column.key === 'index'">
                {{ index + 1 }}
              </template>
              <template v-if="column.key === 'gender'">
                {{ record.gender === 1 ? '男' : '女' }}
              </template>
              <template v-if="column.key === 'avatar'">
                <a-avatar :src="record.avatar"> </a-avatar>
              </template>
              <template v-if="column.key === 'status'">
                <a-tag color="success" size="small" v-if="record.status === 1">正常</a-tag>
                <a-tag color="error" size="small" v-else>禁用</a-tag>
              </template>
            </template>
          </template>
        </a-table>
      </template>
    </TableBody>
    <TableFooter :pagination="pagination" />
  </div>
</template>

<script lang="ts">
  import { post } from '@/api/http'
  import { getTableList } from '@/api/url'
  import { usePagination, useRowKey, useTable, useTableColumn } from '@/hooks/table'
  import { TablePropsType } from '@/types/components'
  import { sortColumns } from '@/utils'
  import { message, Modal } from 'ant-design-vue'
  import { defineComponent, onMounted, reactive } from 'vue'
  export default defineComponent({
    name: 'TableCustom',
    setup() {
      const table = useTable()
      const pagination = usePagination(doRefresh)
      const rowKey = useRowKey('id')
      const tableColumns = reactive(
        useTableColumn(
          [
            table.indexColumn,
            {
              title: '名称',
              key: 'nickName',
              dataIndex: 'nickName',
            },
            {
              title: '性别',
              key: 'gender',
              dataIndex: 'gender',
            },
            {
              title: '头像',
              key: 'avatar',
              dataIndex: 'avatar',
            },
            {
              title: '地址',
              key: 'address',
              dataIndex: 'address',
            },
            {
              title: '登录时间',
              key: 'lastLoginTime',
              dataIndex: 'lastLoginTime',
            },
            {
              title: '登录IP',
              key: 'lastLoginIp',
              dataIndex: 'lastLoginIp',
            },
            {
              title: '状态',
              key: 'status',
              dataIndex: 'status',
            },
          ],
          {
            align: 'center',
          }
        )
      )
      function doRefresh() {
        post({
          url: getTableList,
          data: () => {
            return {
              page: pagination.page,
              pageSize: pagination.pageSize,
            }
          },
        })
          .then((res) => {
            table.handleSuccess(res)
            pagination.setTotalSize(res.totalSize)
          })
          .catch(console.log)
      }
      function onDeleteItem(item: any) {
        if (item) {
          Modal.confirm({
            content: '是否要删除此数据，删除后不恢复？',
            okText: '删除',
            onOk: () => {
              message.success('模拟删除成功，参数为：' + item.id)
            },
          })
        }
      }
      function onUpdateTable(newColumns: Array<TablePropsType>) {
        sortColumns(tableColumns, newColumns)
      }
      function onUpdateBorder(isBordered: boolean) {
        table.bordered.value = isBordered
      }
      function onUpdateStriped(isStriped: boolean) {
        table.striped.value = isStriped
      }
      onMounted(doRefresh)
      return {
        ...table,
        rowKey,
        tableColumns,
        pagination,
        onUpdateTable,
        onDeleteItem,
        doRefresh,
        onUpdateBorder,
        onUpdateStriped,
      }
    },
  })
</script>

<style lang="less" scoped>
  .avatar-container {
    position: relative;
    width: 30px;
    height: 30px;
    margin: 0 auto;
    vertical-align: middle;
    .avatar {
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    .avatar-vip {
      border: 2px solid #cece1e;
    }
    .vip {
      position: absolute;
      top: 0;
      right: -9px;
      width: 15px;
      transform: rotate(60deg);
    }
  }
  .gender-container {
    .gender-icon {
      width: 20px;
    }
  }
</style>
<style scoped>
  .ant-table-striped :deep(.table-striped) td {
    background-color: #fafafa;
  }
</style>
