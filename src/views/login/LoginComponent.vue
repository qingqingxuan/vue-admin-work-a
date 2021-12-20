<template>
  <div class="login-container">
    <div class="login-bg-wrapper"> </div>
    <div class="form-container">
      <div class="form-wrapper">
        <div class="header flex justify-center items-center">
          <div class="logo-wrapper">
            <img src="../../assets/logo.png" />
          </div>
          <div class="title">Vue Admin Work A</div>
        </div>
        <div class="login-wrapper">
          <div class="title">账号登录</div>
          <div class="item-wrapper">
            <a-input v-model:value="username" placeholder="请输入用户名/手机号" clearable>
              <template #prefix>
                <PhoneIcon />
              </template>
            </a-input>
          </div>
          <div class="mt-6 item-wrapper">
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
          <div class="mt-6">
            <a-button type="primary" block class="login" :loading="loading" @click="onLogin">
              登录
            </a-button>
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
      </div>
    </div>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import ImageBg1 from '@/assets/img_login_bg_01.png'
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
  } from '@ant-design/icons-vue'
  export default defineComponent({
    name: 'Login',
    components: { PhoneIcon, PasswordIcon, GithubOutlined, AlipayOutlined, WechatOutlined },
    setup() {
      const username = ref('admin')
      const password = ref('123456')
      const autoLogin = ref(true)
      const loading = ref(false)
      const router = useRouter()
      const route = useRoute()
      const store = useStore()
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
      return {
        username,
        password,
        autoLogin,
        loading,
        onLogin,
        ImageBg1,
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
      & > img {
        position: relative;
        width: 100%;
        height: 100%;
        z-index: 1;
        object-fit: cover;
      }
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
        margin-top: 10%;
        width: 30%;
        max-height: 80%;
        min-width: 50%;
        border-radius: 10px;
        background-color: #ffffff;
        box-shadow: 0px 0px 15px rgba(0, 0, 0, 0.3);
        .header {
          border-radius: 10px 10px 0 0;
          background-color: #f00;
          padding: 30px;
          .logo-wrapper {
            width: 60px;
            height: 60px;
          }
          .title {
            font-size: 24px;
            font-weight: bold;
            color: #ffffff;
            text-shadow: 5px 5px 5px #1890ff;
          }
        }
        .login-wrapper {
          width: 50%;
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
</style>
