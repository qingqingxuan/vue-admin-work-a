<template>
  <div class="main-container">
    <a-card title="行内表单（通过使用 useForm 函数进行校验）">
      <template #extra>
        <a-button type="primary" @click="onVerifyForm">校验</a-button>
      </template>
      <a-form layout="inline">
        <a-form-item label="输入框" style="width: 40%" v-bind="validateInfos.name">
          <a-input v-model:value="baseInfoModel.name" placeholder="请输入一定内容" />
        </a-form-item>
        <a-form-item label="单选组" style="width: 40%" v-bind="validateInfos.isOnLine">
          <a-radio-group v-model:value="baseInfoModel.isOnLine">
            <a-radio :value="0">线下</a-radio>
            <a-radio :value="1">线上</a-radio>
          </a-radio-group>
        </a-form-item>
        <a-form-item label="多选组" style="width: 40%" v-bind="validateInfos.joinType">
          <a-checkbox-group v-model:value="baseInfoModel.joinType">
            <a-space>
              <a-checkbox :value="1">普通</a-checkbox>
              <a-checkbox :value="2">独家</a-checkbox>
              <a-checkbox :value="3">代理</a-checkbox>
            </a-space>
          </a-checkbox-group>
        </a-form-item>
        <a-form-item label="多行输入" style="width: 40%" v-bind="validateInfos.address">
          <a-textarea placeholder="请输入多行输入" :auto-size="{ minRows: 2, maxRows: 5 }" />
        </a-form-item>
      </a-form>
    </a-card>
  </div>
</template>

<script lang="ts">
  import { message } from 'ant-design-vue'
  import useForm from 'ant-design-vue/es/form/useForm'
  import { defineComponent, reactive, ref, toRaw } from 'vue'

  export default defineComponent({
    name: 'AdvanceForm',
    setup() {
      const baseInfoModel = reactive({
        name: null,
        isOnLine: null,
        joinType: null,
        address: null,
      })
      const rules = reactive({
        name: [{ required: true, message: '请输入学校名称' }],
        isOnLine: [
          {
            required: true,
            message: '请选择线上线下',
          },
        ],
        joinType: [
          {
            required: true,
            message: '请选择加盟方式',
          },
        ],
        address: [
          {
            required: true,
            message: '请输入学校地址',
          },
        ],
      })
      const { validate, validateInfos } = useForm(baseInfoModel, rules)
      function onVerifyForm() {
        validate()
      }
      return {
        baseInfoModel,
        validateInfos,
        onVerifyForm,
      }
    },
  })
</script>

<style lang="less" scoped>
  .content-wrapper {
    overflow-y: auto;
    @media screen and (max-width: 768px) {
      .form-wrapper {
        margin-top: 2%;
        width: 98%;
        padding-left: 4%;
      }
    }
    @media screen and (min-width: 768px) {
      .form-wrapper {
        margin-top: 2%;
        width: 50%;
        padding-left: 4%;
      }
    }
  }
  .ant-form-item + .ant-form-item {
    margin-bottom: 20px;
  }
</style>
