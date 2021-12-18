<template>
  <div>
    <div class="login-container">
      <div class="login-bg-wrapper">
        <img :src="ImageBg1" />
      </div>
      <div class="form-container">
        <div class="form-wrapper">
          <div class="flex justify-center items-center">
            <div class="logo-wrapper">
              <img src="../../assets/logo.png" />
            </div>
            <div class="title">Vue Admin Work A</div>
          </div>
          <div class="mt-8">
            <div class="item-wrapper">
              <a-input v-model:value="username" placeholder="请输入用户名/手机号" clearable>
                <template #prefix>
                  <PhoneIcon />
                </template>
              </a-input>
            </div>
            <div class="mt-6 item-wrapper">
              <a-input v-model:value="password" placeholder="请输入密码" type="password" clearable>
                <template #prefix>
                  <PasswordIcon />
                </template>
              </a-input>
            </div>
            <div class="mt-6">
              <a-button type="primary" block class="login" :loading="loading" @click="onLogin">
                登录
              </a-button>
            </div>
          </div>
          <div class="mt-4">
            <div class="flex justify-between">
              <a-checkbox v-model:checked="autoLogin" style="color: #fff">自动登录</a-checkbox>
              <a style="color: #fff">忘记密码？</a>
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
  import ImageBg1 from '@/assets/img_login_bg_01.png'
  import { post, Response } from '@/api/http'
  import { login } from '@/api/url'
  import { UserState } from '@/store/types'
  import { useStore } from '@/store/store'
  import { message } from 'ant-design-vue'
  import { useLayoutStore } from '@/layouts'
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
      const layoutStore = useLayoutStore()
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
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      display: flex;
      align-items: center;
      z-index: 9;
      transition: justify-content 0.5s linear;
      @media screen and (min-width: 966px) {
        justify-content: flex-end;
      }
      @media screen and (max-width: 966px) {
        justify-content: center;
      }
      .form-wrapper {
        width: 30%;
        transition: margin-left 0.5s linear;
        @media screen and (min-width: 966px) {
          min-width: 350px;
          margin-right: 15%;
        }
        @media screen and (max-width: 966px) {
          min-width: 300px;
          margin-right: 0;
        }
        border-radius: 5px;
        border: 2px solid rgba(255, 255, 255, 0.5);
        background-color: rgba(255, 255, 255, 0.2);
        padding: 20px 3%;
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
    }
  }
</style>
