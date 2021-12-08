<template>
  <a-space style="width: 100%" direction="vertical">
    <a-card :header-style="{ padding: '10px' }" title="单选某个选项">
      <div class="flex justify-evenly">
        <CitySelector data-type="province" @onChange="onSelectItem1" />
        <CitySelector data-type="city" @onChange="onSelectItem1" />
        <CitySelector data-type="area" @onChange="onSelectItem1" />
      </div>
    </a-card>
    <a-card :header-style="{ padding: '10px' }" title="级联选择">
      <div class="flex justify-evenly">
        <CitySelector data-type="pc" @onChange="onSelectItem2" />
        <CitySelector data-type="pca" style="margin: 0 2%" @onChange="onSelectItem2" />
        <CitySelector data-type="pcas" check-strategy="child" @onChange="onSelectItem2" />
      </div>
    </a-card>
    <a-card :header-style="{ padding: '10px' }" title="默认值">
      <div class="flex justify-evenly">
        <CitySelector
          :default-value="provinceValue"
          data-type="province"
          @onChange="onSelectItem3"
        />
        <CitySelector
          :default-value="pcaValue"
          data-type="pca"
          style="margin: 0 2%"
          @onChange="onSelectItem3"
        />
        <CitySelector
          :default-value="pcasValue"
          data-type="pcas"
          check-strategy="child"
          @onChange="onSelectItem3"
        />
      </div>
    </a-card>
    <a-card title="提示：城市列表所需要的数据源在 src/assets/data/ 文件夹下面：">
      <ul>
        <li> src/assets/data/provinces.json：单独的省份列表 </li>
        <li> src/assets/data/cities.json：单独的城市列表</li>
        <li> src/assets/data/areas.json：单独的地区列表</li>
        <li> src/assets/data/pc-code.json：级联的省市列表</li>
        <li> src/assets/data/pca-code.json：级联的省市区列表</li>
        <li> src/assets/data/pcas-code.json：级联的省市区、街道列表</li>
      </ul>
    </a-card>
  </a-space>
</template>

<script lang="ts" setup>
  import { message } from 'ant-design-vue'
  import { ref } from 'vue'
  const provinceValue = ref(['11'])
  const pcaValue = ref(['11', '1101', '110101'])
  const pcasValue = ref(['11', '1101', '110101', '110101001'])
  function onSelectItem1(item: any) {
    message.success('您已选择：' + JSON.stringify(item))
  }
  function onSelectItem2(item: any) {
    message.success('您已选择：' + JSON.stringify(item))
  }
  function onSelectItem3(item: any) {
    message.success('您已选择：' + JSON.stringify(item))
  }
</script>
