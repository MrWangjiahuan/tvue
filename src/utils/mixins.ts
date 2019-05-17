import { Vue, Component } from 'vue-property-decorator'
import { State, Mutation } from 'vuex-class'
import { deviceEnquire, DEVICE_TYPE } from '@/utils/device'
import { AppModule } from '@/store/modules/app'

@Component
class Mixin extends Vue {
  public AppModule = AppModule
  public isTopMenu() {
    return AppModule.layoutMode === 'topmenu'
  }
  public isSideMenu() {
    return !this.isTopMenu()
  }
}

@Component
class DeviceMixin extends Vue {
  public isMobile(): boolean {
    return AppModule.device === DEVICE_TYPE.MOBILE
  }
  public isDesktop(): boolean {
    return AppModule.device === DEVICE_TYPE.DESKTOP
  }
  public isTablet(): boolean {
    return AppModule.device === DEVICE_TYPE.TABLET
  }
}

@Component
class AppDeviceEnquireMixin extends Vue {
  mounted() {
    deviceEnquire(deviceType => {
      switch (deviceType) {
        case DEVICE_TYPE.DESKTOP:
          AppModule.TOGGLE_DEVICE(DEVICE_TYPE.DESKTOP)
          AppModule.SetSidebar(true)
          break
        case DEVICE_TYPE.TABLET:
          AppModule.TOGGLE_DEVICE(DEVICE_TYPE.TABLET)
          AppModule.SetSidebar(false)
          break
        case DEVICE_TYPE.MOBILE:
        default:
          AppModule.TOGGLE_DEVICE(DEVICE_TYPE.MOBILE)
          AppModule.SetSidebar(true)
          break
      }
    })
  }
}

export { Mixin, DeviceMixin, AppDeviceEnquireMixin }
