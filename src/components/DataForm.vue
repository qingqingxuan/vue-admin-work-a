<script lang="ts">
  import type { FormItem as MyFormItemType } from '@/types/components'
  import { FormProps, Form, message, FormItem } from 'ant-design-vue'
  import { computed, defineComponent, h, PropType, ref, toRef } from 'vue'
  import 'ant-design-vue/lib/form/style/index.css'
  export default defineComponent({
    name: 'DataForm',
    props: {
      formConfig: {
        type: Object as PropType<FormProps>,
        default: () => ({}),
      },
      options: {
        type: Array as PropType<Array<MyFormItemType>>,
        require: true,
      },
    },
    setup(props) {
      const dataForm = ref<typeof Form | null>(null)
      const options = toRef(props, 'options')
      const __formConfig = computed(() => props.formConfig)
      function reset() {
        if (!options.value) return
        options.value.forEach((it: MyFormItemType) => {
          if (it.reset) {
            it.reset(it)
          } else {
            it.value.value = null
          }
        })
      }
      function generatorParams() {
        if (!options.value) return
        return options.value.reduce((pre: any, cur: MyFormItemType) => {
          pre[cur.key] = cur.value.value
          return pre
        }, {})
      }
      function validator() {
        if (!options.value) return
        return options.value.every((it: MyFormItemType) => {
          if (it.required) {
            if (it.validator) {
              return it.validator(it, message)
            }
            if (it.value.value) {
              return true
            }
            message.error(it.label + '不能为空')
            return false
          }
          return true
        })
      }
      return () =>
        h(
          Form,
          { ...__formConfig.value, ref: dataForm },
          {
            default: () =>
              props.options?.map((formItem: MyFormItemType) => {
                return h(
                  FormItem,
                  {
                    label: formItem.label,
                    required: !!formItem.required,
                    name: formItem.key,
                    wrapperCol: { span: 18 },
                  },
                  {
                    default: () => formItem.render && formItem.render(formItem),
                  }
                )
              }),
          }
        )
    },
  })
</script>
