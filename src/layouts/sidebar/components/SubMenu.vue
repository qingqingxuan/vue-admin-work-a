<template>
  <a-sub-menu :key="menuInfo.key">
    <template #icon><MailOutlined /></template>
    <template #title>{{ menuInfo.label }}</template>
    <template v-for="item in menuInfo.children" :key="item.key">
      <template v-if="!item.children">
        <a-menu-item :key="item.key">
          <template #icon>
            <PieChartOutlined />
          </template>
          {{ item.label }}
        </a-menu-item>
      </template>
      <template v-else>
        <SubMenu :menu-info="item" :key="item.key" />
      </template>
    </template>
  </a-sub-menu>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'
  import { MailOutlined, PieChartOutlined } from '@ant-design/icons-vue'

  export default defineComponent({
    name: 'SubMenu',
    components: { MailOutlined, PieChartOutlined },
    props: {
      menuInfo: {
        type: Object,
        default: () => ({}),
      },
    },
  })
</script>
