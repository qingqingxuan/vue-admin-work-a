<template>
  <div>
    <a-card title="请填写会议基本信息">
      <div class="form-wrapper">
        <a-form>
          <a-form-item
            :class="[item.required ? 'form-item__require' : 'form-item__no_require']"
            v-for="item of formItems"
            :key="item.key"
            :label="item.label"
          >
            <template v-if="item.type === 'input'">
              <a-input :placeholder="item.placeholder" v-model:value="item.value.value"></a-input>
            </template>
            <template v-if="item.type === 'textarea'">
              <a-textarea
                :placeholder="item.placeholder"
                v-model:value="item.value.value"
                :auto-size="{ minRows: 2, maxRows: 5 }"
              />
            </template>
            <template v-if="item.type === 'switch'">
              <a-switch
                v-model:checked="item.value.value"
                checked-children="开"
                un-checked-children="关"
              />
            </template>
            <template v-if="item.type === 'select'">
              <a-select v-model:value="item.value.value" :placeholder="item.placeholder">
                <a-select-option
                  v-for="opt of item.optionItems"
                  :value="opt.value"
                  :key="opt.value"
                  >{{ opt.label }}</a-select-option
                >
              </a-select>
            </template>
            <template v-if="item.type === 'time'">
              <a-time-picker v-model:value="item.value.value" value-format="HH:mm:ss" />
            </template>
            <template v-if="item.type === 'date-range'">
              <a-range-picker v-model:value="item.value.value" />
            </template>
            <template v-if="item.type === 'checkbox-group'">
              <a-checkbox-group v-model:value="item.value.value" :options="item.optionItems" />
            </template>
          </a-form-item>
        </a-form>
        <div class="flex justify-center">
          <a-space>
            <a-button danger @click="submit"> 重置 </a-button>
            <a-button @click="submit"> 校验 </a-button>
            <a-button :loading="submitLoading" type="primary" @click="submit"> 提交 </a-button>
          </a-space>
        </div>
      </div>
    </a-card>
  </div>
</template>

<script lang="ts">
  import { DataFormType, FormItem } from '@/types/components'
  import { message } from 'ant-design-vue'
  import { defineComponent, ref } from 'vue'
  import type { Dayjs } from 'dayjs'
  export default defineComponent({
    name: 'BaseFormView',
    setup() {
      const dataForm = ref<DataFormType | null>(null)
      function submit() {
        // if (dataForm.value?.validator()) {
        //   submitLoading.value = true
        //   setTimeout(() => {
        //     submitLoading.value = false
        //     message.success(
        //       '提交成功，参数为：' + JSON.stringify(dataForm.value?.generatorParams())
        //     )
        //   }, 3000)
        // }
      }
      const formItems = [
        {
          label: '会议名称',
          key: 'name',
          required: true,
          type: 'input',
          value: ref(null),
          placeholder: '请输入会议名称',
          validator: function () {
            if (!this.value.value) {
              message.error(this.placeholder)
              return false
            }
            return true
          },
        },
        {
          label: '与会领导',
          key: 'leader',
          type: 'select',
          placeholder: '请选择与会领导',
          value: ref(undefined),
          optionItems: [
            {
              label: '张总',
              value: '张总',
            },
            {
              label: '王总',
              value: '王总',
            },
            {
              label: '各种总',
              value: '各种总',
            },
          ],
        },
        {
          label: '会议类型',
          key: 'meetType',
          required: true,
          type: 'select',
          placeholder: '请选择会议类型',
          value: ref(undefined),
          optionItems: [
            {
              label: '普通',
              value: '0',
            },
            {
              label: '紧急',
              value: '1',
            },
          ],
        },
        {
          label: '是否远程',
          key: 'remote',
          type: 'switch',
          value: ref(null),
        },
        {
          label: '所需设备',
          key: 'equipment',
          type: 'checkbox-group',
          value: ref(['tv']),
          optionItems: [
            {
              label: '电视',
              value: 'tv',
            },
            {
              label: '投影仪',
              value: 'tyy',
            },
            {
              label: '笔记本',
              value: 'note',
            },
          ],
        },
        {
          label: '会议内容',
          key: 'content',
          type: 'textarea',
          placeholder: '请输入会议内容',
          value: ref(null),
        },
        {
          label: '起止日期',
          key: 'startEndDate',
          type: 'date-range',
          value: ref<Dayjs[]>([]),
        },
        {
          label: '开始时间',
          key: 'startTime',
          type: 'time',
          value: ref(null),
        },
        {
          label: '会议地点',
          key: 'address',
          type: 'select',
          placeholder: '请选择会议地点',
          value: ref(undefined),
          optionItems: [
            {
              label: '会议一室',
              value: 1,
            },
            {
              label: '会议二室',
              value: 2,
            },
            {
              label: '会议三室',
              value: 3,
            },
            {
              label: '会议四室',
              value: 4,
            },
          ],
        },
        {
          label: '与会人员',
          key: 'joinMemeber',
          value: ref(undefined),
          placeholder: '请选择与会人员',
          type: 'select',
          optionItems: [
            {
              label: '张三',
              value: 1,
            },
            {
              label: '李四',
              value: 2,
            },
            {
              label: '王五',
              value: 3,
            },
            {
              label: '赵六',
              value: 4,
            },
          ],
        },
        {
          label: '会议备注',
          key: 'remark',
          placeholder: '请输入会议备注',
          type: 'textarea',
          value: ref(null),
        },
      ] as FormItem[]
      const submitLoading = ref(false)
      return {
        dataForm,
        formItems,
        submitLoading,
        submit,
      }
    },
  })
</script>
