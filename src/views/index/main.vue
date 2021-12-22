<template>
  <div class="main-container">
    <a-row :gutter="[10]">
      <a-col
        :xs="24"
        :sm="12"
        :md="8"
        :lg="6"
        :xl="6"
        :xxl="6"
        v-for="(item, index) of dataList"
        :key="index"
        class="item-wrapper"
      >
        <DataItem :data-model="item">
          <template v-if="index === 0" #extra="{ extra }">
            <div class="margin-top-lg">
              <div> 较昨日新增：{{ extra.data }} </div>
              <div class="margin-top-sm"> 较上周新增：{{ extra.data1 }} </div>
            </div>
          </template>
          <template v-else-if="index === 1" #extra="{ extra }">
            <div class="margin-top" style="position: relative">
              <div> 较昨日新增：{{ extra.data }} </div>
              <div class="margin-top-sm"> 较上周新增：{{ extra.data1 }} </div>
              <div class="stack-avatar-wrapper"> </div>
            </div>
          </template>
          <template v-else-if="index === 2" #extra="{ extra }">
            <div class="p-4">
              <a-progress :percent="extra.data" />
            </div>
          </template>
          <template v-else-if="index === 3" #extra>
            <OrderChart ref="mOrderChart" />
          </template>
        </DataItem>
      </a-col>
    </a-row>
    <a-row class="mt-2" :gutter="10">
      <a-col :xs="24" :sm="24" :md="12" :lg="16" :xl="16" :xxl="16">
        <FullYearSalesChart ref="fullYearSalesChart" />
        <div class="mt-2 flex w-full">
          <DepartmentChart class="flex-1" ref="departmentChart" />
          <div style="width: 8px"></div>
          <EnrollmentChannelsChart class="flex-1" ref="mOrderChart" />
        </div>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="8" :xl="8" :xxl="8">
        <SalesChart ref="salesChart" />
        <StudentChart style="margin-top: 0.5rem" ref="enrollmentChannelsChart" />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
  import DataItem from './components/DataItem.vue'
  import OrderChart from './components/chart/OrderChart.vue'
  import SalesChart from './components/chart/SalesChart.vue'
  import StudentChart from './components/chart/StudentChart.vue'
  import EnrollmentChannelsChart from './components/chart/EnrollmentChannelsChart.vue'
  import FullYearSalesChart from './components/chart/FullYearSalesChart.vue'
  import DepartmentChart from './components/chart/DepartmentChart.vue'
  import { computed, defineComponent, ref, watch } from 'vue'
  import { useLayoutStore } from '@/layouts'
  export default defineComponent({
    name: 'Home',
    components: {
      DataItem,
      OrderChart,
      SalesChart,
      StudentChart,
      EnrollmentChannelsChart,
      FullYearSalesChart,
      DepartmentChart,
    },
    setup() {
      const layoutStore = useLayoutStore()
      const mOrderChart = ref<InstanceType<typeof OrderChart>>()
      const salesChart = ref<InstanceType<typeof SalesChart>>()
      const enrollmentChannelsChart = ref<InstanceType<typeof EnrollmentChannelsChart>>()
      const studentChart = ref<InstanceType<typeof StudentChart>>()
      const fullYearSalesChart = ref<InstanceType<typeof FullYearSalesChart>>()
      const departmentChart = ref<InstanceType<typeof DepartmentChart>>()
      const onResize = () => {
        setTimeout(() => {
          mOrderChart.value?.updateChart()
          salesChart.value?.updateChart()
          enrollmentChannelsChart.value?.updateChart()
          studentChart.value?.updateChart()
          fullYearSalesChart.value?.updateChart()
          departmentChart.value?.updateChart()
        }, 500)
      }
      const collapse = computed(() => {
        return layoutStore.state.isCollapse
      })
      watch(collapse, () => {
        onResize()
      })
      return {
        collapse,
        mOrderChart,
        salesChart,
        enrollmentChannelsChart,
        studentChart,
        departmentChart,
        fullYearSalesChart,
        dataList: [
          {
            id: 'visited',
            title: '今日访问量',
            data: '1000',
            prefix: '+',
            bottomTitle: '总访问量',
            totalSum: '100万+',
            icon: 'smile-filled',
            color: '#1890ff',
            extra: {
              data: 1000,
              data1: 2350,
            },
          },
          {
            id: 'newAdd',
            title: '新增用户',
            data: '500',
            prefix: '+',
            bottomTitle: '总用户量',
            totalSum: '200万+',
            icon: 'heart-filled',
            color: '#ff0000',
            extra: {
              data: 700,
              data1: 968,
            },
          },
          {
            id: 'sales',
            title: '当月销售额',
            data: '50000',
            prefix: '￥',
            bottomTitle: '累计销售额',
            totalSum: '2000万+',
            color: '#18e3ff',
            icon: 'account-book-filled',
            extra: {
              data: 80,
            },
          },
          {
            id: 'order',
            title: '当月订单量',
            data: '189',
            suffix: '笔',
            bottomTitle: '累计订单量',
            totalSum: '1万+',
            color: '#bbc314',
            icon: 'pay-circle-filled',
            extra: {
              data: 80,
            },
          },
        ],
      }
    },
  })
</script>
