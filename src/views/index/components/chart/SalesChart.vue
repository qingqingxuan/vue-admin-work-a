<template>
  <a-card
    :body-style="{ padding: '10px' }"
    :head-style="{ padding: '0 10px' }"
    title="一周销售额（单位：万）"
  >
    <div class="chart-item-container">
      <a-skeleton active v-if="loading" />
      <template v-else>
        <div ref="salesChart" class="chart-item"> </div>
      </template>
    </div>
  </a-card>
</template>

<script lang="ts">
  import { dispose, graphic } from 'echarts/core'
  import useEcharts from '@/hooks/useEcharts'
  import { defineComponent, nextTick, onBeforeUnmount, onMounted, ref } from 'vue'
  export default defineComponent({
    name: 'SalesChart',
    setup() {
      const loading = ref(true)
      const salesChart = ref<HTMLDivElement | null>(null)
      const init = () => {
        const option = {
          grid: {
            left: '2%',
            right: '5%',
            top: '5%',
            bottom: '3%',
            containLabel: true,
          },
          tooltip: {
            trigger: 'axis',
          },
          xAxis: {
            type: 'category',
            data: ['周一', '周二', '周三', '周四', '周五', '周六', '周天'],
            boundaryGap: false,
            splitLine: { show: false },
          },
          yAxis: {
            type: 'value',
            boundaryGap: false,
            splitLine: { show: false },
          },
          series: [
            {
              data: [150, 180, 224, 218, 200, 180, 150],
              type: 'line',
              smooth: true,
              showSymbol: false,
              lineStyle: {
                width: 0,
              },
              areaStyle: {
                opacity: 0.8,
                color: new graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: '#1890ff',
                  },
                  {
                    offset: 1,
                    color: '#78b2e8',
                  },
                ]),
              },
            },
          ],
        }
        setTimeout(() => {
          loading.value = false
          nextTick(() => {
            useEcharts(salesChart.value as HTMLDivElement).setOption(option)
          })
        }, 1000)
      }
      const updateChart = () => {
        useEcharts(salesChart.value as HTMLDivElement).resize()
      }
      onMounted(init)
      onBeforeUnmount(() => {
        dispose(salesChart.value as HTMLDivElement)
      })
      return {
        loading,
        salesChart,
        updateChart,
      }
    },
  })
</script>

<style lang="less" scoped>
  .chart-item-container {
    width: 100%;
    .chart-item {
      height: 30vh;
    }
  }
</style>
