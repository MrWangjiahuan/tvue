<template>
  <exception type="404" />
</template>

<script>
import { Exception } from '@/components/'
import { Vue, Component } from 'vue-property-decorator'
@Component({
  components: {
    Exception
  }
})
export default class Exception404 extends Vue {}
</script>
