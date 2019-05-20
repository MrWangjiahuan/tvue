<template>
  <div>
    <a-form :layout="formLayout">
      <a-form-item
        label="Form Layout"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-radio-group
          default-value="horizontal"
          @change="handleFormLayoutChange"
        >
          <a-radio-button value="horizontal">Horizontal</a-radio-button>
          <a-radio-button value="vertical">Vertical</a-radio-button>
          <a-radio-button value="inline">Inline</a-radio-button>
        </a-radio-group>
      </a-form-item>
      <a-form-item
        label="Field A"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
        :validateStatus="fieldAStatus"
        :help="fieldAHelp"
      >
        <a-input v-model="fieldA" placeholder="input placeholder" />
      </a-form-item>
      <a-form-item
        label="Field B"
        :help="fieldAHelp"
        :validateStatus="fieldBStatus"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input v-model="fieldB" placeholder="input placeholder" />
      </a-form-item>
      <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
        <a-button type="primary" @click="handleSubmit">Submit</a-button>
      </a-form-item>
    </a-form>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator'
@Component
export default class BasicForm extends Vue {
  private formLayout: string = 'horizontal'
  private fieldA: string = ''
  private fieldB: string = ''
  private fieldAStatus: string = ''
  private fieldBStatus: string = ''
  private fieldAHelp: string = ''
  private fieldBHelp: string = ''

  get formItemLayout() {
    const { formLayout } = this
    return formLayout === 'horizontal'
      ? {
          labelCol: { span: 4 },
          wrapperCol: { span: 14 }
        }
      : {}
  }
  get buttonItemLayout() {
    const { formLayout } = this
    return formLayout === 'horizontal'
      ? {
          wrapperCol: { span: 14, offset: 4 }
        }
      : {}
  }
  private handleFormLayoutChange(e) {
    this.formLayout = e.target.value
  }
  private handleSubmit() {
    if (this.fieldA.length <= 5) {
      this.fieldAStatus = 'error'
      this.fieldAHelp = '必须大于5个字符'
    } else {
      console.log('校验通过')
    }
  }
  @Watch('fieldA')
  fieldAChange(val) {
    if (val.length <= 5) {
      this.fieldAStatus = 'error'
      this.fieldAHelp = '必须大于5个字符'
    } else {
      this.fieldAStatus = ''
      this.fieldAHelp = ''
    }
  }
}
</script>
<style lang="less" scoped></style>
