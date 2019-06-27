<template>
  <exception type="500" />
</template>

<script>
import { Exception } from '@/components/'
import { Vue, Component } from 'vue-property-decorator'
@Component({
  components: {
    Exception
  }
})
export default class Exception500 extends Vue {}
</script>
