<template>
  <div class="login-container">
    <div class="login-bg-wrapper"> </div>
    <div class="form-container">
      <div class="form-wrapper">
        <div class="header flex justify-center items-center">
          <div class="img-wrapper">
            <img :src="ImageBg1" />
          </div>
          <div class="content-wrapper">
            <div class="logo-wrapper">
              <img src="../../assets/logo.png" />
            </div>
            <div class="title">Vue Admin Work A</div>
            <div class="sub-title"> Vue3 + Vite2 + Typescript + Antd </div>
          </div>
        </div>
        <div class="login-wrapper">
          <div class="change">
            <PlusOutlined @click="onChange(false)" v-if="loginMode" class="icon" />
            <ArrowLeftOutlined @click="onChange(true)" v-else class="icon" />
          </div>
          <div class="login" v-show="loginMode">
            <div class="title">账号登录</div>
            <a-input v-model:value="username" placeholder="请输入用户名/手机号" clearable>
              <template #prefix>
                <PhoneIcon />
              </template>
            </a-input>
            <div class="mt-6">
              <a-input-password
                v-model:value="password"
                placeholder="请输入密码"
                type="password"
                clearable
              >
                <template #prefix>
                  <PasswordIcon />
                </template>
              </a-input-password>
            </div>
            <div class="mt-8">
              <a-button type="primary" block :loading="loading" @click="onLogin"> 登录 </a-button>
            </div>
            <div class="mt-4">
              <div class="flex justify-between">
                <a-checkbox v-model:checked="autoLogin">自动登录</a-checkbox>
                <a>忘记密码？</a>
              </div>
            </div>
            <a-divider>第三方登录</a-divider>
            <div class="text-center mb-4 text-xl" style="color: #007cff">
              <a-space size="large">
                <AlipayOutlined />
                <GithubOutlined />
                <WechatOutlined />
              </a-space>
            </div>
          </div>
          <div class="register" v-show="!loginMode">
            <div class="title">注册账号</div>
            <a-input v-model:value="registerPhone" placeholder="请输入手机号" clearable>
              <template #prefix>
                <PhoneIcon />
              </template>
            </a-input>
            <div class="mt-4 flex">
              <div class="mr-4 flex-1">
                <a-input v-model:value="registerCode" placeholder="请输入验证码" clearable>
                  <template #prefix>
                    <PropertySafetyOutlined />
                  </template>
                </a-input>
              </div>
              <a-button @click="onSendCode">{{ sendCodeTip }}</a-button>
            </div>
            <div class="mt-4">
              <a-input-password
                v-model:value="registerPwd"
                placeholder="请输入密码"
                type="password"
                clearable
              >
                <template #prefix>
                  <PasswordIcon />
                </template>
              </a-input-password>
            </div>
            <div class="mt-4">
              <a-input-password
                v-model:value="registerConfirmPwd"
                placeholder="请再次输入密码"
                type="password"
                clearable
              >
                <template #prefix>
                  <PasswordIcon />
                </template>
              </a-input-password>
            </div>
            <div class="mt-8 mb-8">
              <a-button type="primary" block :loading="loading" @click="onRegister">
                注册
              </a-button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import ImageBg1 from '@/assets/img_login_bg_01.jpg'
  import { post, Response } from '@/api/http'
  import { login } from '@/api/url'
  import { UserState } from '@/store/types'
  import { useStore } from '@/store/store'
  import { message } from 'ant-design-vue'
  import {
    MobileOutlined as PhoneIcon,
    LockOutlined as PasswordIcon,
    GithubOutlined,
    AlipayOutlined,
    WechatOutlined,
    PlusOutlined,
    ArrowLeftOutlined,
    PropertySafetyOutlined,
  } from '@ant-design/icons-vue'
  import { useInterval, useIntervalFn } from '@vueuse/core'
  export default defineComponent({
    name: 'Login',
    components: {
      PhoneIcon,
      PasswordIcon,
      GithubOutlined,
      AlipayOutlined,
      WechatOutlined,
      PlusOutlined,
      ArrowLeftOutlined,
      PropertySafetyOutlined,
    },
    setup() {
      const username = ref('admin')
      const password = ref('123456')
      const autoLogin = ref(true)
      const loading = ref(false)
      const router = useRouter()
      const route = useRoute()
      const store = useStore()
      const loginMode = ref(true)
      const registerPhone = ref('')
      const registerCode = ref('')
      const registerPwd = ref('')
      const registerConfirmPwd = ref('')
      const sendCodeTip = ref('发送验证码')
      let maxCount = 60
      const onLogin = () => {
        loading.value = true
        post({
          url: login,
          data: {
            username: username.value,
            password: password.value,
          },
        })
          .then(({ data }: Response) => {
            store.dispatch('user/saveUser', data as UserState).then(() => {
              router
                .replace({
                  path: route.query.redirect ? (route.query.redirect as string) : '/',
                })
                .then(() => {
                  loading.value = false
                  message.success('登录成功，欢迎：' + data.nickName)
                })
            })
          })
          .catch((error) => {
            loading.value = false
            message.error(error.message)
          })
      }
      const onRegister = () => {}
      function onChange(mode: boolean) {
        loginMode.value = mode
      }
      function onSendCode() {
        if (!registerPhone.value) {
          message.error('请输入手机号')
          return
        }
        maxCount = 60
        const interval = useIntervalFn(() => {
          if (maxCount === 0) {
            interval.pause()
            sendCodeTip.value = '重新发送'
            return
          }
          maxCount--
          sendCodeTip.value = maxCount + 's'
        }, 1000)
      }
      return {
        username,
        password,
        autoLogin,
        loading,
        onLogin,
        ImageBg1,
        loginMode,
        onChange,
        registerPhone,
        registerCode,
        registerPwd,
        registerConfirmPwd,
        onRegister,
        onSendCode,
        sendCodeTip,
      }
    },
  })
</script>

<style lang="less" scoped>
  .login-container {
    position: relative;
    overflow: hidden;
    height: 100vh;
    width: 100%;
    .login-bg-wrapper {
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background-color: #1890ff;
      &::after {
        content: '';
        position: absolute;
        left: 0;
        top: 0;
        right: 0;
        bottom: 0;
        z-index: 2;
        background-color: rgba(0, 0, 0, 0.3);
      }
    }
    .form-container {
      position: absolute;
      width: 100%;
      top: 0;
      left: 0;
      display: flex;
      z-index: 9;
      justify-content: center;
      .form-wrapper {
        @media screen and (max-width: 996px) {
          width: 90%;
          margin-top: 5vh;
        }
        @media screen and (min-width: 996px) {
          width: 45%;
          margin-top: 20vh;
        }
        max-height: 80%;
        border-radius: 10px;
        background-color: #ffffff;
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
        .header {
          position: relative;
          border-radius: 10px 10px 0 0;
          overflow: hidden;
          padding-bottom: 10px;
          .img-wrapper {
            border-radius: 10px 10px 0 0;
            position: absolute;
            width: 100%;
            top: 0;
            left: 0;
            height: 120px;
            overflow: hidden;
            z-index: 1;
            &::after {
              position: absolute;
              content: '';
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              background-color: rgba(0, 0, 0, 0.3);
            }
          }
          .content-wrapper {
            position: relative;
            display: flex;
            z-index: 2;
            flex-direction: column;
            align-items: center;
            margin-top: 10px;
            .logo-wrapper {
              width: 40px;
              height: 40px;
            }
            .title {
              font-size: 24px;
              font-weight: bold;
              color: #ffffff;
              text-shadow: 5px 5px 5px #1890ff;
            }
            .sub-title {
              font-size: 12px;
              color: #ffffff;
            }
          }
        }
        .login-wrapper {
          position: relative;
          overflow: hidden;
          .change {
            position: absolute;
            top: 0;
            right: 0;
            width: 150px;
            height: 150px;
            &::after {
              position: absolute;
              top: 0;
              left: 0;
              right: 0;
              bottom: 0;
              content: '';
              background-color: rgba(16, 54, 87, 0.5);
              border-radius: 50%;
              transform: translate(50%, -50%);
              z-index: 1;
            }
            .icon {
              position: relative;
              color: #fff;
              font-size: 40px;
              font-weight: bold;
              transform: translate(100px, 10px);
              z-index: 2;
            }
          }
          .wrapper-width {
            @media screen and (max-width: 996px) {
              width: 90%;
            }
            @media screen and (min-width: 996px) {
              width: 60%;
            }
          }
          .login {
            .wrapper-width();
            margin: 0 auto;
            margin-top: 2rem;
            .title {
              font-size: 24px;
              font-weight: bold;
              color: #333333;
              margin-bottom: 1rem;
            }
          }
          .register {
            .wrapper-width();
            margin: 0 auto;
            margin-top: 2rem;
            .title {
              font-size: 24px;
              font-weight: bold;
              color: #333333;
              margin-bottom: 1rem;
            }
          }
        }
      }
    }
  }
</style>
