<template>
  <div>
    <a-row :gutter="[10, 10]">
      <a-col :span="12">
        <a-card
          title="警告信息alert"
          :body-style="{ padding: '10px' }"
          :header-style="{ padding: '10px' }"
        >
          <a-space direction="vertical" :size="12">
            <a-alert message="Info 类型" type="info" show-icon> </a-alert>
            <a-alert message="Success 类型" type="success" show-icon> </a-alert>
            <a-alert message="Warning 类型" type="warning" show-icon> </a-alert>
            <a-alert message="Error 类型" type="error" show-icon> </a-alert>
          </a-space>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card
          title="对话框Dialog"
          :body-style="{ padding: '10px' }"
          :header-style="{ padding: '10px' }"
        >
          <div class="padding">
            <a-space>
              <a-button size="small" type="primary" @click="openConfirm('warning')">警告</a-button>
              <a-button size="small" type="dashed" @click="openConfirm('success')">成功</a-button>
              <a-button size="small" type="ghost" @click="openConfirm('error')">错误</a-button>
            </a-space>
          </div>
        </a-card>
        <br />
        <a-card
          title="信息Message"
          :body-style="{ padding: '10px' }"
          :header-style="{ padding: '10px' }"
        >
          <a-space>
            <a-button type="info" @click="openMessage('info')"> 信息 </a-button>
            <a-button type="error" @click="openMessage('error')"> 错误 </a-button>
            <a-button type="warning" @click="openMessage('warning')"> 警告 </a-button>
            <a-button type="success" @click="openMessage('success')"> 成功 </a-button>
            <a-button type="primary" @click="openMessage('loading')"> 加载中 </a-button>
          </a-space>
        </a-card>
        <br />
        <a-card
          title="通知Notification"
          :content-style="{ padding: '10px' }"
          :header-style="{ padding: '10px' }"
        >
          <a-space>
            <a-button type="info" @click="openNotification('info')"> 信息 </a-button>
            <a-button type="error" @click="openNotification('error')"> 错误 </a-button>
            <a-button type="warning" @click="openNotification('warning')"> 警告 </a-button>
            <a-button type="success" @click="openNotification('success')"> 成功 </a-button>
          </a-space>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script lang="ts">
  import { message, Modal, notification } from 'ant-design-vue'
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'Badge',
    setup() {
      function openConfirm(type: string) {
        switch (type) {
          case 'warning':
            Modal.warning({
              title: '警告',
              content: '你确定要离开我？',
              okText: '确定',
              cancelText: '不确定',
              onOk: () => {
                message.success('确定')
              },
              onCancel: () => {
                message.error('不确定')
              },
            })
            break
          case 'success':
            Modal.success({
              title: '成功',
              content: '小哥哥你太棒了~~',
              okText: '哇哦~',
            })
            break
          case 'error':
            Modal.error({
              title: '错误',
              content: '知道错了吗，下次改了',
              okText: '快哭了',
              onOk: () => {
                message.success('我知道了')
              },
            })
            break
        }
      }
      function openMessage(type: string) {
        switch (type) {
          case 'info':
            message.info('在心碎中认清遗憾 生命漫长也短暂跳动心脏长出藤蔓')
            break
          case 'error':
            message.error('愿为险而战 跌入灰暗坠入深渊')
            break
          case 'warning':
            message.warning('沾满泥土的脸 没有神的光环')
            break
          case 'success':
            message.success('握紧手中的平凡 此心自称无憾生命的火已点燃')
            break
          case 'loading':
            message.loading('有一天也许会走远 也许还能再相见')
            break
        }
      }
      function openNotification(type: string) {
        switch (type) {
          case 'info':
            notification.info({
              description: '在心碎中认清遗憾 生命漫长也短暂跳动心脏长出藤蔓',
              message: '只要平凡',
            })
            break
          case 'error':
            notification.error({
              description: '愿为险而战 跌入灰暗坠入深渊',
              message: '只要平凡',
            })
            break
          case 'warning':
            notification.warning({
              description: '沾满泥土的脸 没有神的光环',
              message: '只要平凡',
            })
            break
          case 'success':
            notification.success({
              description: '握紧手中的平凡 此心自称无憾生命的火已点燃',
              message: '只要平凡',
            })
            break
        }
      }
      return {
        openConfirm,
        openMessage,
        openNotification,
      }
    },
  })
</script>
