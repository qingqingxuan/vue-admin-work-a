<template>
  <a-cascader
    :default-value="defaultValue"
    :fieldNames="{ label: 'name', value: 'code', children: 'children' }"
    :options="dataOptions"
    :placeholder="placeholder"
    allowClear
    filterable
    @change="onValueChange"
  />
</template>

<script lang="ts" setup>
  import Provinces from '../assets/data/provinces.json'
  import Cities from '../assets/data/cities.json'
  import Araes from '../assets/data/areas.json'
  import PC from '../assets/data/pc-code.json'
  import PCA from '../assets/data/pca-code.json'
  import PCAS from '../assets/data/pcas-code.json'
  import { computed } from 'vue'
  import type { PropType } from 'vue'
  const emits = defineEmits(['onChange'])
  const props = defineProps({
    defaultValue: {
      type: Array,
      default: null,
    },
    dataType: {
      type: String as PropType<'province' | 'city' | 'area' | 'pc' | 'pca' | 'pcas'>,
      default: 'Province',
    },
  })
  const dataOptions = computed(() => {
    if (props.dataType === 'province') {
      return Provinces
    } else if (props.dataType === 'city') {
      return Cities
    } else if (props.dataType === 'area') {
      return Araes
    } else if (props.dataType === 'pc') {
      return PC
    } else if (props.dataType === 'pca') {
      return PCA
    }
    return PCAS
  })
  const placeholder = computed(() => {
    if (props.dataType === 'province') {
      return '请选择省份'
    } else if (props.dataType === 'city') {
      return '请选择城市'
    } else if (props.dataType === 'area') {
      return '请选择地区'
    } else if (props.dataType === 'pc') {
      return '请选择省市'
    } else if (props.dataType === 'pca') {
      return '请选择省市区'
    }
    return '请选择省市区、街道'
  })
  function onValueChange(value: Array<string>, option: Array<string>) {
    emits('onChange', {
      value,
      option,
    })
  }
</script>
