<template>
  <a-space direction="vertical">
    <a-card size="small">
      <div class="text-lg">
        当前版本号：{{ version }}
      </div>
    </a-card>
    <a-card title="构建依赖">
      <a-descriptions
        label-placement="top"
        bordered
        :column="4"
        :label-style="{ 'font-weight': 'bold', 'font-size': '16px' }"
      >
        <a-descriptions-item :label="item.label" v-for="item of dependenciesList" :key="item.label">
          {{ item.value }}
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
    <a-card title="开发依赖">
      <a-descriptions
        label-placement="top"
        bordered
        :column="4"
        :label-style="{ 'font-weight': 'bold', 'font-size': '16px' }"
      >
        <a-descriptions-item
          :label="item.label"
          v-for="item of devDependenciesList"
          :key="item.label"
        >
          {{ item.value }}
        </a-descriptions-item>
      </a-descriptions>
    </a-card>
  </a-space>
</template>

<script lang="ts" setup>
  import { useLayoutStore } from '@/layouts'
  import useAppInfo from '@/hooks/useAppInfo'
  import { onMounted, reactive, ref } from 'vue'
  const { version, dependencies, devDependencies } = useAppInfo()
  const showContact = ref(false)
  const state = useLayoutStore().state
  const dependenciesList = reactive<Record<string, string>[]>([])
  const devDependenciesList = reactive<Record<string, string>[]>([])
  onMounted(() => {
    const depValues = Object.values(dependencies)
    Object.keys(dependencies).map((it, index) => {
      dependenciesList.push({
        label: it,
        value: depValues[index],
      })
    })
    const devDepValues = Object.values(devDependencies)
    Object.keys(devDependencies).map((it, index) => {
      devDependenciesList.push({
        label: it,
        value: devDepValues[index],
      })
    })
  })
</script>
