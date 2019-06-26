<template>
  <a-dropdown :overlayClassName="cls" v-bind="$attrs" v-on="$listeners">
    <slot />
  </a-dropdown>
</template>

<script lang="ts">
import { Vue, Component, Prop } from 'vue-property-decorator'
import _pickBy from 'lodash/pickBy'
import _keys from 'lodash/keys'

const prefixCls = 'header-dropdown'

@Component
export default class HeaderDropdown extends Vue {
  @Prop({ default: '' }) public overlayClassName!: string

  get cls() {
    return _keys(
      _pickBy(
        {
          [`${prefixCls}__container`]: true,
          [this.overlayClassName]: !!this.overlayClassName
        },
        n => n
      )
    ).join(' ')
  }
}
</script>

<style lang="less" src="./index.less"></style>
