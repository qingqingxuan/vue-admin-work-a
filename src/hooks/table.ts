import { h, reactive, Ref, ref, shallowReactive, VNode } from 'vue'

import { TableFooterType, TableHeaderType } from '@/types/components'
import { TableColumnType } from 'ant-design-vue'

interface Table {
  dataList: Array<any>
  bordered: Ref<Boolean>
  selectRows: Array<string | number>
  tableLoading: Ref<boolean>
  tableHeaderRef: Ref<TableHeaderType | null>
  tableFooterRef: Ref<TableFooterType | null>
  tableHeight: Ref<number>
  handleSuccess: (res: any) => Promise<any>
  handleSelectionChange: (tempSelectRows: Array<any>) => void
  useTableColumn: (columns: TableColumnType[], options: TableColumnType) => Array<any>
  selectionColumn: { type: 'selection' }
  indexColumn: {
    title: string
    key: string
    width: number
    render: (rowData: any, rowIndex: number) => VNode
  }
}

export const useTableHeight = async function (currentIns: any): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const clientHeight =
        document.querySelector('.main-section')?.getBoundingClientRect().height || 0
      const tableHeaderHeight =
        document.querySelector('.ant-table-header')?.getBoundingClientRect().height || 0
      console.log(tableHeaderHeight)
      if (currentIns) {
        let tempHeight = tableHeaderHeight
        if (currentIns.refs.tableHeaderRef) {
          const header = (currentIns.refs as any).tableHeaderRef.$el
          tempHeight += header.clientHeight
        }
        if (currentIns.refs.tableFooterRef) {
          tempHeight += 45
        }
        console.log(clientHeight, tempHeight)
        resolve(clientHeight - tempHeight)
      }
      resolve(150)
    }, 500)
  })
}

export const useTable = function (): Table {
  const dataList = shallowReactive([]) as Array<any>
  let selectRows = shallowReactive([]) as Array<any>
  const tableHeaderRef = ref<TableHeaderType | null>(null)
  const tableFooterRef = ref<TableFooterType | null>(null)
  const tableHeight = ref(200)
  const bordered = ref(false)
  const tableLoading = ref(true)
  const handleSuccess = ({ data = [] }): Promise<any> => {
    tableLoading.value = false
    dataList.length = 0
    dataList.push(...data)
    return Promise.resolve(data)
  }
  const handleSelectionChange = (tempSelectRows: Array<any>) => {
    selectRows = tempSelectRows
  }
  return {
    dataList,
    tableHeaderRef,
    tableFooterRef,
    tableHeight,
    bordered,
    selectRows,
    tableLoading,
    handleSuccess,
    handleSelectionChange,
    useTableColumn,
    selectionColumn: {
      type: 'selection',
    },
    indexColumn: useTableIndexColumn(),
  }
}

export const useRowKey = function (propName: string) {
  return function (rowData: any) {
    return rowData[propName]
  }
}

export const useTableColumn = function (columns: TableColumnType[], options: TableColumnType = {}) {
  return columns.map((it) => Object.assign(it, options))
}

export const useTableIndexColumn = function () {
  return {
    title: '序号',
    key: 'index',
    width: 80,
    render: (rowData: any, rowIndex: number) => {
      return h('div', null, { default: () => rowIndex + 1 })
    },
  }
}

export const usePagination = function (callback: () => void) {
  function onChange() {
    callback()
  }
  function onPageSizeChange() {
    callback()
  }
  const paginationInfo = reactive({
    page: 1,
    pageSize: 10,
    showSizePicker: true,
    pageCount: 1,
    pageSizes: [10, 20, 30, 40],
    onChange,
    onPageSizeChange,
    setTotalSize(totalSize: number) {
      paginationInfo.pageCount = Math.ceil(totalSize / paginationInfo.pageSize)
    },
  })
  return paginationInfo
}
