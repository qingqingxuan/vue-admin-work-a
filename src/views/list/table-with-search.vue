<template>
  <div class="main-container">
    <TableHeader
      :show-filter="true"
      title="查询条件"
      @search="onSearch"
      @reset-search="onResetSearch"
    >
      <template #search-content>
        <a-form layout="inline">
          <a-form-item v-for="item of conditionItems" :key="item.key" :label="item.label">
            <template v-if="item.type === 'input'">
              <a-input v-model:value="item.value.value" :placeholder="item.placeholder" />
            </template>
            <template v-if="item.type === 'select'">
              <a-select
                v-model:value="item.value.value"
                style="width: 150px"
                :placeholder="item.placeholder"
              >
                <a-select-option
                  v-for="optionItem of item.optionItems"
                  :key="optionItem.value"
                  :value="optionItem.value"
                >
                  {{ optionItem.label }}
                </a-select-option>
              </a-select>
            </template>
            <template v-if="item.type === 'date'">
              <a-date-picker v-model:value="item.value.value" />
            </template>
            <template v-if="item.type === 'time'">
              <a-time-picker v-model:value="item.value.value" value-format="HH:mm:ss" />
            </template>
            <template v-if="item.type === 'check-group'">
              <a-checkbox-group v-model:value="item.value.value" :options="item.optionItems" />
            </template>
          </a-form-item>
        </a-form>
      </template>
    </TableHeader>
    <TableBody ref="tableBody">
      <template #default>
        <a-table
          :row-selection="{ selectedRowKeys: selectedRowKeys, onChange: onSelectChange }"
          :loading="tableLoading"
          :data-source="dataList"
          :columns="tableColumns"
          :pagination="false"
          :rowKey="rowKey"
        >
          <template #bodyCell="{ column, record, index }">
            <template v-if="column.key === 'index'">
              {{ index + 1 }}
            </template>
            <template v-if="column.key === 'gender'">
              {{ record.gender === 1 ? '男' : '女' }}
            </template>
            <template v-if="column.key === 'avatar'">
              <a-avatar>{{ record.nickName.substring(0, 1) }}</a-avatar>
            </template>
            <template v-if="column.key === 'status'">
              <a-tag color="success" size="small" v-if="record.status === 1">正常</a-tag>
              <a-tag color="error" size="small" v-else>禁用</a-tag>
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
  import {
    usePagination,
    useRowKey,
    useRowSelection,
    useTable,
    useTableColumn,
  } from '@/hooks/table'
  import { DataFormType, FormItem } from '@/types/components'
  import { message } from 'ant-design-vue'
  import { defineComponent, onMounted, ref } from 'vue'
  import type { Dayjs } from 'dayjs'
  const conditionItems: Array<FormItem> = [
    {
      key: 'name',
      label: '用户姓名',
      type: 'input',
      placeholder: '请输入用户姓名',
      value: ref(''),
      reset: function () {
        this.value.value = ''
      },
    },
    {
      key: 'sex',
      label: '用户姓别',
      value: ref(undefined),
      type: 'select',
      placeholder: '请选择用户姓别',
      optionItems: [
        {
          label: '男',
          value: 1,
        },
        {
          label: '女',
          value: 2,
        },
      ],
      reset: function () {
        this.value.value = undefined
      },
    },
    {
      key: 'date',
      label: '日期',
      type: 'date',
      value: ref<Dayjs>(),
    },
    {
      key: 'time',
      label: '时间',
      type: 'time',
      value: ref<string>(''),
    },
    {
      key: 'checkbox',
      label: '复选',
      type: 'check-group',
      value: ref([]),
      optionItems: [
        {
          label: '选项1',
          value: 0,
        },
        {
          label: '选项2',
          value: 1,
        },
      ],
    },
  ]
  export default defineComponent({
    name: 'TableWithSearch',
    setup() {
      const searchForm = ref<DataFormType | null>(null)
      const pagination = usePagination(doRefresh)
      const { selectedRowKeys, onSelectChange } = useRowSelection()
      const table = useTable()
      const rowKey = useRowKey('id')
      const tableColumns = useTableColumn(
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
            pagination.setTotalSize(res.totalSize || 10)
          })
          .catch(console.log)
      }
      function onSearch() {
        message.success(
          '模拟查询成功，参数为：' +
            JSON.stringify(
              conditionItems.reduce((pre, cur) => {
                ;(pre as any)[cur.key] = cur.value.value
                return pre
              }, {})
            )
        )
      }
      function onResetSearch() {
        conditionItems.forEach((it) => {
          it.reset ? it.reset() : (it.value.value = '')
        })
      }
      onMounted(doRefresh)
      return {
        ...table,
        rowKey,
        pagination,
        searchForm,
        tableColumns,
        conditionItems,
        onSearch,
        onResetSearch,
        selectedRowKeys,
        onSelectChange,
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
