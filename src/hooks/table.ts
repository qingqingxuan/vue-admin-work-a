import { reactive, Ref, ref, shallowReactive } from 'vue'

import { TableFooterType, TableHeaderType } from '@/types/components'
import { TableColumnType } from 'ant-design-vue'
import { TableRowSelection } from 'ant-design-vue/lib/table/interface'

interface Table {
  dataList: Array<any>
  bordered: Ref<Boolean>
  selectRows: Ref<Array<RowSelectKey>>
  tableLoading: Ref<boolean>
  tableHeaderRef: Ref<TableHeaderType | null>
  tableFooterRef: Ref<TableFooterType | null>
  tableHeight: Ref<number>
  handleSuccess: (res: any) => Promise<any>
  useTableColumn: (columns: TableColumnType[], options: TableColumnType) => Array<any>
  onSelectChange: (selectedRowKeys: RowSelectKey[]) => void
  selectionColumn: { type: 'selection' }
  indexColumn: {
    title: string
    key: string
    width: number
  }
}

export const useTableHeight = async function (currentIns: any): Promise<number> {
  return new Promise((resolve) => {
    setTimeout(() => {
      const clientHeight =
        document.querySelector('.main-section')?.getBoundingClientRect().height || 0
      const tableHeaderHeight =
        document.querySelector('.ant-table-header')?.getBoundingClientRect().height || 0
      if (currentIns) {
        let tempHeight = tableHeaderHeight
        if (currentIns.refs.tableHeaderRef) {
          const header = (currentIns.refs as any).tableHeaderRef.$el
          tempHeight += header.clientHeight
        }
        if (currentIns.refs.tableFooterRef) {
          tempHeight += 45
        }
        resolve(clientHeight - tempHeight)
      }
      resolve(150)
    }, 500)
  })
}

export const useTable = function (): Table {
  const dataList = shallowReactive([]) as Array<any>
  const selectRows = ref([] as Array<RowSelectKey>)
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
  const onSelectChange = (tempSelectRows: Array<RowSelectKey>) => {
    selectRows.value = tempSelectRows
    console.log(selectRows.value)
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
    onSelectChange,
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

type RowSelectKey = string | number

export const useRowSelection = function (
  selectedRowKeys: Array<RowSelectKey> = [],
  onChange: (selectedRowKeys: RowSelectKey[]) => void,
  options: TableRowSelection = {}
) {
  return reactive(
    Object.assign(
      {
        selectedRowKeys,
        onChange,
      } as TableRowSelection,
      options
    )
  )
}

export const useTableColumn = function (columns: TableColumnType[], options: TableColumnType = {}) {
  return columns.map((it) => Object.assign(it, options))
}

export const useTableIndexColumn = function () {
  return {
    title: '序号',
    key: 'index',
    width: 80,
  }
}

export const usePagination = function (callback: () => void) {
  function onChange() {
    callback()
  }
  const paginationInfo = reactive({
    page: 1,
    pageSize: 10,
    showSizePicker: true,
    pageCount: 1,
    pageSizes: ['10', '20', '30', '40'],
    onChange,
    setTotalSize(totalSize: number) {
      paginationInfo.pageCount = totalSize
    },
  })
  return paginationInfo
}
