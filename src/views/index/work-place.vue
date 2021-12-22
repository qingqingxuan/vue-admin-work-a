<template>
  <div class="main-container">
    <a-card
      title="工作台"
      :bodyStyle="{ padding: '15px' }"
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
              <div class="text-sm text-gray-500 mt-2"> 今日有小雨，出门别忘记带伞哦~ </div>
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
    <a-row class="mt-2 mb-2" :gutter="[10, 10]">
      <a-col
        :xs="12"
        :sm="8"
        :md="6"
        :lg="4"
        :xl="4"
        :xxl="4"
        v-for="(item, index) of fastActions"
        :key="index"
      >
        <a-card
          @click="fastActionClick(item)"
          :bodyStyle="{ padding: '0' }"
          :headStyle="{ padding: '0 10px' }"
        >
          <div class="flex flex-col items-center justify-center fast-item-wrapper">
            <component
              :is="item.icon"
              :style="{ color: item.color, fontSize: '30px', fontWeight: 'bold' }"
            />
            <span class="mt-4 text-sm">{{ item.title }}</span>
          </div>
        </a-card>
      </a-col>
    </a-row>
    <a-row class="mt-1" :gutter="10">
      <a-col :xs="24" :sm="24" :md="24" :lg="16" :xl="16">
        <div>
          <a-card
            :bodyStyle="{ padding: '20px' }"
            :headStyle="{ padding: '0 10px' }"
            size="small"
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
            title="项目进度"
            :bodyStyle="{ padding: '0px' }"
            :headStyle="{ padding: '0 10px' }"
            size="small"
          >
            <a-table :columns="columns" :data-source="dataSource" :pagination="false">
              <template #bodyCell="{ column, record }">
                <template v-if="column.dataIndex === 'progress'">
                  {{ record.progress + '%' }}
                </template>
                <template v-if="column.dataIndex === 'status'">
                  <a-tag :color="record.progress === 100 ? 'success' : 'processing'">
                    <template v-if="record.progress < 100" #icon>
                      <sync-outlined :spin="true" />
                    </template>
                    {{ record.status }}
                  </a-tag>
                </template>
              </template>
            </a-table>
          </a-card>
        </div>
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="8" :xl="8">
        <a-card
          :bodyStyle="{ padding: '0 10px' }"
          :headStyle="{ padding: '0 10px' }"
          size="small"
          title="消息列表"
        >
          <a-list item-layout="horizontal" :data-source="messageList">
            <template #renderItem="{ item }">
              <a-list-item>
                <a-list-item-meta :description="item.content">
                  <template #title>
                    <a>{{ item.title }}</a>
                  </template>
                  <template #avatar>
                    <a-badge dot>
                      <a-avatar
                        src="https://zos.alipayobjects.com/rmsportal/ODTLcjxAfvqbxHnVXCYX.png"
                      />
                    </a-badge>
                  </template>
                </a-list-item-meta>
              </a-list-item>
            </template>
          </a-list>
        </a-card>
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
      const store = useStore()
      const avatar = computed(() => store.state.user.avatar)
      const tempWaitingItems = reactive([] as Array<any>)
      const showWatingMode = ref(false)
      const router = useRouter()
      const fastActionClick = ({ path = '/' }) => {
        router.push(path)
      }
      const messageList = [
        {
          title: 'Betty Jackson',
          content: '明天下午带着吃饭的家伙来总经理办公室开会',
        },
        {
          title: 'Cynthia Thomas',
          content: '继续加油，做的不错',
        },
        {
          title: '王宝',
          content: '还有几天就要放假了，这几天要天天996',
        },
        {
          title: '朱风堂',
          content: '算了，想说点什么，但不知道要说什么',
        },
        {
          title: '张根',
          content: '恭喜，下个月加薪10000',
        },
        {
          title: '铁子',
          content: '晚上一起去泡澡啊~~',
        },
      ]
      const dataSource = [
        {
          key: '1',
          projectName: 'Arco Admin 开发',
          beginTime: '2021-12-01',
          endTime: '2021-12-31',
          progress: 100,
          status: '完成',
        },
        {
          key: '2',
          projectName: '官网开发',
          beginTime: '2021-12-01',
          endTime: '2021-12-31',
          progress: 90,
          status: '进行中',
        },
        {
          key: '3',
          projectName: '文档编写',
          beginTime: '2021-12-01',
          endTime: '2021-12-31',
          progress: 80,
          status: '进行中',
        },
        {
          key: '4',
          projectName: '各版本升级工作',
          beginTime: '2021-12-01',
          endTime: '2025-12-31',
          progress: 50,
          status: '进行中',
        },
      ]
      return {
        tempWaitingItems,
        avatar,
        currentDate: date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate(),
        dataItems: [
          {
            title: 'Vue Admin Work A',
            target: 'http://qingqingxuan.gitee.io/vue-admin-work-a',
          },
          {
            title: 'Vue Admin Work P',
            target: 'http://qingqingxuan.gitee.io/vue-admin-work-P',
          },
          {
            title: 'Arco Admin',
            target: 'http://qingqingxuan.gitee.io/arco-admin',
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
        messageList,
        columns: [
          {
            title: '项目名',
            dataIndex: 'projectName',
          },
          {
            title: '开始时间',
            dataIndex: 'beginTime',
          },
          {
            title: '结束时间',
            dataIndex: 'endTime',
          },
          {
            title: '进度',
            dataIndex: 'progress',
          },
          {
            title: '状态',
            dataIndex: 'status',
          },
        ],
        dataSource,
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
    height: 100px;
    .anticon {
      font-size: 20px;
    }
  }
  .fast-item-wrapper:hover {
    cursor: pointer;
    box-shadow: 0px 0px 10px #ddd;
  }
</style>
