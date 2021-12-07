<template>
  <a-sub-menu :key="menuInfo.key">
    <template #icon><component :is="menuInfo.icon || 'MenuOutlined'" /></template>
    <template #title>{{ menuInfo.label }}</template>
    <template v-for="item in menuInfo.children" :key="item.key">
      <template v-if="!item.children">
        <a-menu-item :key="item.key">
          <template #icon>
            <component :is="item.icon" />
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

  export default defineComponent({
    name: 'SubMenu',
    props: {
      menuInfo: {
        type: Object,
        default: () => ({}),
      },
    },
  })
</script>
