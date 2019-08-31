<template>
  <div>
    <!-- <a-form :layout="formLayout" :form="form">
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
      >
        <a-input
          v-decorator="[
            'fieldA',
            {
              initialValue: fieldA,
              rules: [{ required: true, min: 6, message: '必须大于5个字符' }]
            }
          ]"
          placeholder="input placeholder"
        />
      </a-form-item>
      <a-form-item
        label="Field B"
        :label-col="formItemLayout.labelCol"
        :wrapper-col="formItemLayout.wrapperCol"
      >
        <a-input v-decorator="['fieldB']" placeholder="input placeholder" />
      </a-form-item>
      <a-form-item :wrapper-col="buttonItemLayout.wrapperCol">
        <a-button type="primary" @click="handleSubmit">Submit</a-button>
      </a-form-item>
    </a-form> -->
    <at :members="members" name-key="name">
      <template slot="item" slot-scope="s">
        <img :src="s.item.avatar" />
        <span v-text="s.item.name"></span>
      </template>
      <div class="editor" contenteditable v-html="html"></div>
    </at>
  </div>
</template>

<script lang="ts">
import At from 'vue-at'
import { Vue, Component, Watch } from 'vue-property-decorator'
@Component({
  components: {
    At
  }
})
export default class BasicForm extends Vue {
  private members = [
    {
      avatar: 'https://randomuser.me/api/portraits/men/2.jpg',
      name: 'myrtie.green'
    },
    {
      avatar: 'https://randomuser.me/api/portraits/men/8.jpg',
      name: '椿木'
    }
  ]
  private html = ''

  // private form
  // private formLayout: string = 'horizontal'
  // private fieldA: string = 'hello'
  // private fieldB: string = ''

  // private created() {
  //   this.form = this.$form.createForm(this)
  // }
  // private mounted() {
  //   setTimeout(() => {
  //     this.form.setFieldsValue({ fieldA: 'hello word' })
  //   }, 3000)
  // }
  // get formItemLayout() {
  //   const { formLayout } = this
  //   return formLayout === 'horizontal'
  //     ? {
  //         labelCol: { span: 4 },
  //         wrapperCol: { span: 14 }
  //       }
  //     : {}
  // }
  // get buttonItemLayout() {
  //   const { formLayout } = this
  //   return formLayout === 'horizontal'
  //     ? {
  //         wrapperCol: { span: 14, offset: 4 }
  //       }
  //     : {}
  // }
  // private handleFormLayoutChange(e) {
  //   this.formLayout = e.target.value
  // }
  // private handleSubmit() {
  //   this.form.validateFields((err, values) => {
  //     if (!err) {
  //       console.log(values)
  //       Object.assign(this, values)
  //     }
  //   })
  // if (this.fieldA.length <= 5) {
  //   this.fieldAStatus = 'error'
  //   this.fieldAHelp = '必须大于5个字符'
  // } else {
  //   console.log('校验通过')
  // }
  // }
}
</script>
<style lang="less" scoped></style>
