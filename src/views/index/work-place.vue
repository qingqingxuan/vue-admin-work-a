<template>
  <div class="main-container">
    <a-card
      title="工作台"
      :bodyStyle="{ padding: '20px' }"
      :headStyle="{ padding: '0 10px' }"
      size="small"
    >
      <a-row class="margin-top" wrap>
        <a-col :xs="24" :sm="16" :md="16" :lg="16" :xl="14">
          <div class="flex justify-center items-center">
            <div class="avatar-wrapper">
              <img :src="avatar" />
            </div>
            <div class="flex flex-col justify-around ml-3.5 flex-1">
              <div class="text-lg">早上好，Andy，青春只有一次，别让自己过得不精彩</div>
              <div class="text-sm text-gray-500">
                <i class="el-icon-heavy-rain"></i> 今日有小雨，出门别忘记带伞哦~
              </div>
            </div>
          </div>
        </a-col>
        <a-col :xs="24" :sm="8" :md="8" :lg="8" :xl="10">
          <div class="flex justify-end items-center h-full w-full mt-4">
            <div class="flex flex-col justify-around align-end item-action">
              <div class="text-gray">项目数</div>
              <div class="text-xl">12</div>
            </div>
            <div class="flex flex-col justify-around align-end item-action">
              <div class="text-gray">待办项</div>
              <div class="text-xl">3/20</div>
            </div>
            <div class="flex flex-col justify-around align-end item-action">
              <div class="text-gray">当前日期</div>
              <div class="text-xl">{{ currentDate }}</div>
            </div>
          </div>
        </a-col>
      </a-row>
    </a-card>
    <a-row class="mt-1" :gutter="10">
      <a-col :xs="24" :sm="24" :md="24" :lg="14" :xl="14">
        <div>
          <a-card
            :bodyStyle="{ padding: '20px' }"
            :headStyle="{ padding: '0 10px' }"
            size="small"
            hoverable
            title="我的项目"
          >
            <div class="flex">
              <ProjectItem
                class="flex-1 ml-2"
                v-for="(item, index) of dataItems"
                :key="index"
                :item="item"
              />
            </div>
          </a-card>
          <a-card
            :style="{ marginTop: '10px' }"
            title="快捷操作"
            :bodyStyle="{ padding: '20px' }"
            :headStyle="{ padding: '0 10px' }"
            size="small"
            hoverable
          >
            <a-row>
              <a-col :span="8" v-for="(item, index) of fastActions" :key="index">
                <div
                  @click="fastActionClick(item)"
                  class="flex flex-col items-center justify-center fast-item-wrapper"
                >
                  <component :is="item.icon" :style="{ color: item.color }" />
                  <span class="mt-1">{{ item.title }}</span>
                </div>
              </a-col>
            </a-row>
          </a-card>
        </div>
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="10" :xl="10">
        <StudentChart />
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
  import ProjectItem from './components/ProjectItem.vue'
  import TodoItem from './components/TodoItem.vue'
  import StudentChart from './components/StudentChart.vue'
  import { computed, defineComponent, onMounted, reactive, ref } from 'vue'
  import { useRouter } from 'vue-router'
  import { useStore } from '@/store/store'
  import { random } from 'lodash'
  const COLORS = ['#67C23A', '#E6A23C', '#F56C6C', '#409EFF']
  const date = new Date()
  export default defineComponent({
    name: 'WorkPlace',
    components: {
      ProjectItem,
      TodoItem,
      StudentChart,
    },
    setup() {
      const waitingItmes = [
        {
          content: '早上，中午，晚上上下班别忘记打卡',
          time: '04-05',
          bgColor: COLORS[Math.floor(Math.random() * COLORS.length)],
        },
        {
          content: '给经理打印文件',
          time: '04-04',
          bgColor: COLORS[Math.floor(Math.random() * COLORS.length)],
        },
        {
          content: '下班断电',
          time: '04-03',
          bgColor: COLORS[Math.floor(Math.random() * COLORS.length)],
        },
        {
          content: '等到周末的时候和同事一起去逛街，买新衣服，买新手机，买包包，各种买买买',
          time: '04-02',
          bgColor: COLORS[Math.floor(Math.random() * COLORS.length)],
        },
        {
          content: '新同事入职培训工作',
          time: '04-01',
          bgColor: COLORS[Math.floor(Math.random() * COLORS.length)],
        },
        {
          content: '给领导安排机票，酒店住宿等问题',
          time: '03-31',
          bgColor: COLORS[Math.floor(Math.random() * COLORS.length)],
        },
      ]
      const isShowMore = computed(() => {
        return waitingItmes.length > 4
      })
      const store = useStore()
      const avatar = computed(() => store.state.user.avatar)
      const tempWaitingItems = reactive([] as Array<any>)
      const showWatingMode = ref(false)
      const toggleMore = () => {
        showWatingMode.value = !showWatingMode.value
        tempWaitingItems.length = 0
        if (showWatingMode.value) {
          tempWaitingItems.push(...waitingItmes)
        } else {
          tempWaitingItems.push(...waitingItmes.slice(0, 4))
        }
      }
      const router = useRouter()
      const fastActionClick = ({ path = '/' }) => {
        router.push(path)
      }
      onMounted(() => {
        tempWaitingItems.push(
          ...(waitingItmes.length > 4 ? waitingItmes.slice(0, 4) : waitingItmes)
        )
      })
      return {
        isShowMore,
        tempWaitingItems,
        avatar,
        currentDate: date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate(),
        dataItems: [
          {
            title: 'Vue Admin Work',
            target: 'http://qingqingxuan.gitee.io/vue-admin-work',
            gitee: 'https://gitee.com/qingqingxuan/vue-admin-work',
          },
          {
            title: 'Vue Admin Work X',
            target: 'http://qingqingxuan.gitee.io/vue-admin-work-x',
            gitee: 'https://gitee.com/qingqingxuan/vue-admin-work-x',
          },
          {
            title: 'Admin Work',
            target: 'http://qingqingxuan.gitee.io/admin-work',
            gitee: 'https://gitee.com/qingqingxuan/admin-work',
          },
        ],
        fastActions: [
          {
            title: '首页',
            icon: 'DashboardOutlined',
            path: '/',
            color: COLORS[random(0, COLORS.length)],
          },
          {
            title: '系统管理',
            path: '/system/department',
            icon: 'AccountBookOutlined',
            color: COLORS[random(0, COLORS.length)],
          },
          {
            title: '列表',
            path: '/list/table-custom',
            icon: 'BarsOutlined',
            color: COLORS[random(0, COLORS.length)],
          },
          {
            title: '表单',
            path: '/form/base-form-view',
            icon: 'FileDoneOutlined',
            color: COLORS[random(0, COLORS.length)],
          },
          {
            title: '多级菜单',
            path: '/next/menu2/menu-2-1/menu-2-1-1',
            icon: 'ApartmentOutlined',
            color: COLORS[random(0, COLORS.length)],
          },
          {
            title: '更多功能',
            path: '/other/qrcode',
            icon: 'MoreOutlined',
            color: COLORS[random(0, COLORS.length)],
          },
        ],
        showWatingMode,
        fastActionClick,
        toggleMore,
      }
    },
  })
</script>

<style lang="less" scoped>
  .avatar-wrapper {
    width: 4rem;
    height: 4rem;
    max-width: 4rem;
    max-height: 4rem;
    min-width: 4rem;
    min-height: 4rem;
    & > img {
      width: 100%;
      height: 100%;
      border-radius: 50%;
      border: 2px solid yellowgreen;
    }
  }
  .item-action {
    position: relative;
    padding: 0 30px;
  }
  .item-action::after {
    position: absolute;
    top: 20%;
    right: 0;
    height: 60%;
    content: '';
    display: block;
    width: 1px;
    background-color: var(--border-color);
  }
  div.item-action:last-child::after {
    width: 0;
  }
  .fast-item-wrapper {
    border-right: 1px solid var(--border-color);
    border-bottom: 1px solid var(--border-color);
    height: 80px;
    .anticon {
      font-size: 20px;
    }
  }
  .fast-item-wrapper:hover {
    cursor: pointer;
    box-shadow: 0px 0px 10px #ddd;
  }
</style>
