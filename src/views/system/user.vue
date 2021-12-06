<template>
  <a-row :gutter="10">
    <a-col :span="5">
      <a-card
        class="h-full"
        :content-style="{ padding: '5px' }"
        :header-style="{ padding: '5px' }"
        :segmented="true"
      >
        <template #header>
          <div class="flex items-center">
            <n-input class="mr-2" v-model:value="pattern" placeholder="搜索" size="small" />
            <n-switch size="small" v-model:value="expandAllFlag" />
          </div>
        </template>
        <n-tree
          :expanded-keys="getExpandedKeys"
          block-line
          :pattern="pattern"
          :data="departmentData"
          selectable
          :on-update:expanded-keys="onUpdateExpandedKeys"
          :on-update:selected-keys="onCheckedKeys"
        />
      </a-card>
    </a-col>
    <a-col :span="19">
      <div>
        <TableHeader ref="tableHeaderRef" :show-filter="false">
          <template #top-right>
            <DeleteButton @delete="onDeleteItems" />
          </template>
        </TableHeader>
        <TableBody>
          <template #default>
            <a-table
              :loading="tableLoading"
              :data-source="dataList"
              :columns="tableColumns"
              :pagination="false"
              tableLayout="fixed"
              :scroll="{ y: tableHeight, x: 'max-content' }"
            >
              <template #bodyCell="{ column, record }">
                <template v-if="column.key === 'gender'">
                  {{ record.gender === 1 ? '男' : '女' }}
                </template>
                <template v-if="column.key === 'avatar'">
                  <a-avatar>
                    <img :src="record.avatar" />
                  </a-avatar>
                </template>
                <template v-if="column.key === 'actions'">
                  <a-button danger @click="onDeleteItem(record)" size="small">删除</a-button>
                </template>
                <template v-if="column.key === 'status'">
                  <a-tag color="success" size="small" v-if="record.status === 1">正常</a-tag>
                  <a-tag color="error" size="small" v-else>禁用</a-tag>
                </template>
              </template>
            </a-table>
          </template>
        </TableBody>
        <TableFooter ref="tableFooterRef" :pagination="pagination" />
      </div>
    </a-col>
  </a-row>
</template>

<script lang="ts">
  import { post } from '@/api/http'
  import { getTableList } from '@/api/url'
  import { usePagination, useRowKey, useTable, useTableColumn, useTableHeight } from '@/hooks/table'
  import { message, Modal } from 'ant-design-vue'
  import { defineComponent, getCurrentInstance, onMounted, ref, shallowReactive, watch } from 'vue'
  export default defineComponent({
    name: 'UserList',
    setup() {
      const table = useTable()
      const rowKey = useRowKey('id')
      const pagination = usePagination(doRefresh)
      const checkedRowKeys = [] as Array<any>
      const departmentData = [
        {
          label: '东部地区',
          key: 1,
          children: [
            {
              label: '总裁部',
              key: 11,
            },
            {
              label: '财务部',
              key: 12,
            },
            {
              label: '技术部',
              key: 13,
            },
            {
              label: '销售部',
              key: 14,
            },
          ],
        },
        {
          label: '西部地区',
          key: 2,
          children: [
            {
              label: '总裁部',
              key: 21,
            },
            {
              label: '财务部',
              key: 22,
            },
            {
              label: '技术部',
              key: 23,
            },
            {
              label: '销售部',
              key: 24,
            },
          ],
        },
        {
          label: '南部地区',
          key: 3,
          children: [
            {
              label: '总裁部',
              key: 31,
            },
            {
              label: '财务部',
              key: 32,
            },
            {
              label: '技术部',
              key: 33,
            },
            {
              label: '销售部',
              key: 34,
            },
          ],
        },
        {
          label: '北部地区',
          key: 4,
          children: [
            {
              label: '总裁部',
              key: 41,
            },
            {
              label: '财务部',
              key: 42,
            },
            {
              label: '技术部',
              key: 43,
            },
            {
              label: '销售部',
              key: 44,
            },
          ],
        },
      ]
      const tableColumns = useTableColumn(
        [
          {
            title: '名称',
            key: 'nickName',
            dataIndex: 'nickName',
          },
          {
            title: '性别',
            key: 'gender',
            dataIndex: 'gender',
            width: 80,
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
            width: 120,
          },
          {
            title: '登录IP',
            key: 'lastLoginIp',
            dataIndex: 'lastLoginIp',
            width: 100,
          },
          {
            title: '状态',
            key: 'status',
            dataIndex: 'status',
            width: 80,
          },
          {
            title: '操作',
            key: 'actions',
            fixed: 'right',
            width: 80,
          },
        ],
        {
          align: 'center',
        }
      )
      const expandAllFlag = ref(false)
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
            pagination.setTotalSize((res as any).totalSize)
          })
          .catch(console.log)
      }
      function onDeleteItems() {
        Modal.confirm({
          title: '提示',
          content: '确定要删除此数据吗？',
          onOk: () => {
            message.success('数据模拟删除成功，参数为：' + JSON.stringify(checkedRowKeys))
          },
        })
      }
      function onDeleteItem(item: any) {
        Modal.confirm({
          title: '提示',
          content: '确定要删除此数据吗？',
          onOk: () => {
            table.dataList.splice(table.dataList.indexOf(item), 1)
          },
        })
      }
      function onRowCheck(rowKeys: Array<any>) {
        checkedRowKeys.length = 0
        checkedRowKeys.push(...rowKeys)
      }
      function onUpdateExpandedKeys(keys: any) {
        getExpandedKeys.length = 0
        getExpandedKeys.push(...keys)
      }
      function onCheckedKeys(keys: any) {
        message.success('选中的值为--->' + JSON.stringify(keys))
      }
      const getExpandedKeys = shallowReactive([] as Array<number>)
      watch(
        () => expandAllFlag.value,
        (newVal) => {
          newVal
            ? getExpandedKeys.push(...departmentData.map((it) => it.key))
            : (getExpandedKeys.length = 0)
        }
      )
      onMounted(async () => {
        table.tableHeight.value = await useTableHeight(getCurrentInstance())
        doRefresh()
      })
      return {
        ...table,
        rowKey,
        pattern: ref(''),
        expandAllFlag,
        departmentData,
        tableColumns,
        pagination,
        onDeleteItem,
        onDeleteItems,
        onRowCheck,
        getExpandedKeys,
        onUpdateExpandedKeys,
        onCheckedKeys,
      }
    },
  })
</script>

<style lang="less" scoped>
  .avatar-container {
    position: relative;
    width: 30px;
    margin: 0 auto;
    vertical-align: middle;
    .avatar {
      width: 100%;
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
