import { check } from '@/utils/auth'

interface IOptions {
  name: string
}

function install(Vue, options: IOptions = { name: 'auth' }): void {
  Vue.directive(options.name || 'auth', {
    inserted(el, binding) {
      if (!check(binding.value)) {
        el.parentNode && el.parentNode.removeChild(el)
      }
    }
  })
}

export default { install }
