<template>
  <exception type="403" />
</template>

<script>
import { Exception } from '@/components/'
import { Vue, Component } from 'vue-property-decorator'
@Component({
  components: {
    Exception
  }
})
export default class Exception403 extends Vue {}
</script>
