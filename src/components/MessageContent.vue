<template>
  <a-tabs style="width: 280px" size="small">
    <a-tab-pane key="unread">
      <template #tab>
        <span>
          <mail-outlined />
          未读
        </span>
      </template>
      <a-list item-layout="horizontal" :data-source="data">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta description="各部门主管，下午三点在大会议室开会">
              <template #title>
                <a>{{ item.title }}</a>
              </template>
              <template #avatar>
                <a-avatar style="background-color: #ff4d4f" size="large">
                  <template #icon><UserOutlined /></template>
                </a-avatar>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </a-tab-pane>
    <a-tab-pane key="read">
      <template #tab>
        <span>
          <mail-outlined />
          已读
        </span>
      </template>
      <a-list item-layout="horizontal" :data-source="data">
        <template #renderItem="{ item }">
          <a-list-item>
            <a-list-item-meta description="各部门主管，下午三点在大会议室开会">
              <template #title>
                <a>{{ item.title }}</a>
              </template>
              <template #avatar>
                <a-avatar style="background-color: #87d068" size="large">
                  <template #icon><UserOutlined /></template>
                </a-avatar>
              </template>
            </a-list-item-meta>
          </a-list-item>
        </template>
      </a-list>
    </a-tab-pane>
    <template #rightExtra>
      <a-button type="text" danger size="small">清空</a-button>
      <a-button type="link" size="small">更多</a-button>
    </template>
  </a-tabs>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    setup() {
      const data = [
        {
          title: '下午三点大会议室开会',
        },
        {
          title: '下午三点大会议室开会',
        },
        {
          title: '下午三点大会议室开会',
        },
        {
          title: '下午三点大会议室开会',
        },
      ]
      return {
        data,
      }
    },
  })
</script>
