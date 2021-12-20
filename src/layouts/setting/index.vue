<template>
  <a-drawer
    :visible="opened"
    placement="right"
    title="系统设置"
    closable
    :width="state.device === 'mobile' ? '75%' : '280px'"
    @close="onCloseDrawer"
  >
    <Scrollbar>
      <div class="wrapper">
        <a-divider dashed>主题设置</a-divider>
        <div class="flex justify-around pb-8">
          <div v-for="(item, index) of themeList" :key="index" class="example-wrapper">
            <StyleExample
              :checked="item.checked"
              :left-bg="item.leftBg"
              :right-top-bg="item.rightTopBg"
              :right-bottom-bg="item.rightBottomBg"
              :tip-text="item.tipText"
              @click="themeClick(item)"
            />
          </div>
        </div>
        <a-divider dashed>侧边栏样式</a-divider>
        <div class="flex justify-around pb-8">
          <div
            v-for="(item, index) of sideExampleList"
            :key="index"
            :span="6"
            class="example-wrapper"
          >
            <StyleExample
              :checked="item.checked"
              :left-bg="item.leftBg"
              :right-top-bg="item.rightTopBg"
              :right-bottom-bg="item.rightBottomBg"
              @click="exampleClick(item)"
            />
          </div>
        </div>
        <a-divider dashed>布局模式</a-divider>
        <div class="flex justify-around pb-8">
          <div v-for="(item, index) of layoutExampleList" :key="index" class="example-wrapper">
            <StyleExample
              :checked="item.checked"
              :left-bg="item.leftBg"
              :right-top-bg="item.rightTopBg"
              :right-bottom-bg="item.rightBottomBg"
              :class="[item.class || '']"
              :tip-text="item.tipText"
              @click="layoutExampleClick(item)"
            />
          </div>
        </div>
        <a-divider dashed>页签显示</a-divider>
        <div class="setting-item-wrapper">
          <span>显示页签</span>
          <a-switch v-model:checked="state.isShowTabbar" @change="onShowTabbar" />
        </div>
        <div style="height: 20px"></div>
        <a-divider dashed>菜单设置</a-divider>
        <div class="setting-item-wrapper">
          <span style="width: 100px">菜单宽度</span>
          <a-input-number v-model:value="menuWidth" size="small" :min="200" :max="400" :step="10">
            <template #suffix>px</template>
          </a-input-number>
        </div>
        <a-divider dashed>页面切换动画</a-divider>
        <div class="setting-item-wrapper">
          <span style="width: 100px">动画效果</span>
          <a-select v-model:value="state.pageAnim" :options="animOptions" @select="onAnimUpdate" />
        </div>
        <a-divider dashed>按钮显示</a-divider>
        <div class="setting-item-wrapper">
          <span>固定顶部导航</span>
          <a-switch v-model:checked="state.isFixedNavBar" :disabled="state.layoutMode === 'ttb'" />
        </div>
        <div class="setting-item-wrapper">
          <span>搜索</span>
          <a-switch v-model:checked="state.actionItem.showSearch" />
        </div>
        <div class="setting-item-wrapper">
          <span>消息</span>
          <a-switch v-model:checked="state.actionItem.showMessage" />
        </div>
        <div class="setting-item-wrapper">
          <span>刷新</span>
          <a-switch v-model:checked="state.actionItem.showRefresh" />
        </div>
        <div class="setting-item-wrapper">
          <span>全屏</span>
          <a-switch v-model:checked="state.actionItem.showFullScreen" />
        </div>
        <a-divider dashed>水印功能</a-divider>
        <div class="setting-item-wrapper">
          <span>开启水印</span>
          <a-switch v-model:checked="state.isOpenWaterMark" @change="isOpenWater" />
        </div>
        <div class="p-2">
          <div>水印内容</div>
          <a-input class="mt-1" size="small" v-model:value="state.waterMark" />
        </div>
        <a-divider dashed>颜色模式</a-divider>
        <div class="setting-item-wrapper">
          <span>灰色模式</span>
          <a-switch v-model:checked="state.isGray" @change="onIsGray" />
        </div>
        <a-divider />
      </div>
    </Scrollbar>
  </a-drawer>
</template>

<script lang="ts">
  import { defineComponent, onMounted, reactive, ref, watch } from 'vue'
  import { useLayoutStore } from '../index'
  import { message } from 'ant-design-vue'
  import { useChangeMenuWidth, useMenuWidth } from '@/hooks/useMenuWidth'
  import LeftBg from '@/assets/bg_img.webp'
  import useTheme from '@/hooks/useTheme'
  export default defineComponent({
    name: 'Setting',
    setup() {
      const container = document.querySelector('.vaw-layout-container')
      const opened = ref(false)
      const store = useLayoutStore()
      const state = store?.state
      const menuWidth = ref(useMenuWidth())
      const themeList = reactive([
        {
          leftBg: '#ffffff',
          rightTopBg: '#ffffff',
          rightBottomBg: '#f5f5f5',
          checked: false,
          themeId: 'light',
          tipText: '明亮',
        },
        {
          leftBg: '#000000',
          rightTopBg: '#000000',
          rightBottomBg: '#333333',
          checked: false,
          themeId: 'dark',
          tipText: '暗黑',
        },
      ])
      const sideExampleList = reactive([
        {
          leftBg: '#000000',
          rightTopBg: '#ffffff',
          rightBottomBg: '#f5f5f5',
          checked: false,
          themeId: 'dark',
        },
        {
          leftBg: '#ffffff',
          rightTopBg: '#ffffff',
          rightBottomBg: '#f5f5f5',
          checked: false,
          themeId: 'white',
        },
        {
          leftBg: `url(${LeftBg})`,
          rightTopBg: '#ffffff',
          rightBottomBg: '#f5f5f5',
          checked: false,
          themeId: 'image',
        },
      ])
      const layoutExampleList = reactive([
        {
          leftBg: '#000000',
          rightTopBg: '#d4d4d4',
          rightBottomBg: '#d4d4d4',
          checked: true,
          layoutId: 'ltr',
          tipText: '左右',
        },
        {
          leftBg: '#d4d4d4',
          rightTopBg: '#ffffff',
          rightBottomBg: '#d4d4d4',
          checked: false,
          layoutId: 'ttb',
          class: 'extra-class',
          tipText: '上下',
        },
        {
          leftBg: '#000000',
          rightTopBg: '#d4d4d4',
          rightBottomBg: '#d4d4d4',
          checked: false,
          layoutId: 'lcr',
          class: 'extra-class-1',
          tipText: '分栏',
        },
      ])
      const animOptions = reactive([
        {
          label: '渐隐渐现',
          value: 'opacity',
        },
        {
          label: '左右滑动',
          value: 'fade',
        },
        {
          label: '上下滑动',
          value: 'down',
        },
        {
          label: '缩放效果',
          value: 'scale',
        },
      ])
      onMounted(() => {
        themeList.forEach((it) => {
          it.checked = state?.theme === it.themeId
        })
        sideExampleList.forEach((it) => {
          it.checked = state?.sideBarBgColor === it.themeId
        })
        layoutExampleList.forEach((it) => {
          it.checked = state?.layoutMode === it.layoutId
        })
      })
      function openDrawer() {
        opened.value = true
      }
      function onCloseDrawer() {
        opened.value = false
      }
      function themeClick(item: any) {
        themeList.forEach((it) => {
          it.checked = it === item
        })
        const root = document.documentElement
        if (item.themeId === 'dark') {
          exampleClick(sideExampleList[0])
          import('../../styles/theme/antd.dark.min.css').then(() => {
            useTheme(root, 'dark')
          })
        } else {
          import('../../styles/theme/antd.min.css').then(() => {
            useTheme(root, 'light')
          })
        }
        store.changeTheme(item.themeId)
      }
      function exampleClick(item: any) {
        if (store?.state.theme === 'dark') {
          message.error('深色模式下不能更改侧边栏颜色')
          return
        }
        sideExampleList.forEach((it) => {
          it.checked = it === item
        })
        store.changeSideBarBgColor(item.themeId)
      }
      function layoutExampleClick(item: any) {
        layoutExampleList.forEach((it) => {
          it.checked = it === item
        })
        store.changeLayoutMode(item.layoutId)
      }
      function isOpenWater(val: boolean) {
        store.changeOpenWaterMark(val)
      }
      function onIsGray(val: boolean) {
        store.changeGray(val)
      }
      function onShowTabbar(val: boolean) {
        store.changeShowTabbar(val)
      }
      function onWaterMarkChange(val: string) {
        store.setWaterMark(val)
      }
      function onAnimUpdate(val: any) {
        store.changePageAnim(val as string)
      }
      watch(
        () => menuWidth.value,
        (newVal) => {
          useChangeMenuWidth(newVal)
        }
      )
      return {
        container,
        opened,
        themeList,
        sideExampleList,
        layoutExampleList,
        state,
        openDrawer,
        onCloseDrawer,
        themeClick,
        exampleClick,
        isOpenWater,
        onShowTabbar,
        onWaterMarkChange,
        layoutExampleClick,
        onAnimUpdate,
        animOptions,
        menuWidth,
        onIsGray,
      }
    },
  })
</script>

<style lang="less" scoped>
  @width: 60px;
  .wrapper {
    margin-top: -16px;
    .close-wrapper {
      text-align: right;
      font-size: 20px;
    }
    .colors-wrapper {
      display: flex;
      align-items: center;
      flex-wrap: wrap;
      .color-wrapper {
        width: 20px;
        height: 20px;
        border-radius: 5px;
        border: 1px solid #c1c1c1;
        margin-bottom: 20px;
        box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
      }
      .circle::after {
        content: '';
        display: block;
        margin: 0 auto;
        margin-top: 25px;
        width: 8px;
        height: 8px;
        border-radius: 50%;
        background-color: rgb(3, 190, 50);
        text-align: center;
      }
    }
    .setting-item-wrapper {
      display: flex;
      justify-content: space-between;
      align-items: center;
      padding: 10px;
      font-size: 14px;
    }
  }
</style>
