import Vue from 'vue'
import {
  Row,
  Col,
  Button,
  Layout,
  Icon,
  Drawer,
  Radio,
  Menu,
  Form,
  Input,
  Dropdown,
  DatePicker,
  Divider,
  Tooltip,
  Tag,
  Popover,
  Spin,
  List,
  Avatar,
  Tabs,
  Badge,
  Checkbox,
  Select,
  Progress,
  Modal,
  Breadcrumb,
  notification,
  message,
  Card,
  Steps,
  LocaleProvider
} from 'ant-design-vue'

Vue.use(Row)
Vue.use(Col)
Vue.use(Button)
Vue.use(Layout)
Vue.use(Icon)
Vue.use(Drawer)
Vue.use(Radio)
Vue.use(Menu)
Vue.use(Form)
Vue.use(Input)
Vue.use(Dropdown)
Vue.use(DatePicker)
Vue.use(Divider)
Vue.use(Tooltip)
Vue.use(Tag)
Vue.use(Popover)
Vue.use(Spin)
Vue.use(List)
Vue.use(Avatar)
Vue.use(Tabs)
Vue.use(Badge)
Vue.use(Checkbox)
Vue.use(Select)
Vue.use(Card)
Vue.use(Progress)
Vue.use(Breadcrumb)
Vue.use(Steps)
Vue.use(LocaleProvider)

Vue.prototype.$message = message
Vue.prototype.$notification = notification
Vue.prototype.$info = Modal.info
Vue.prototype.$success = Modal.success
Vue.prototype.$error = Modal.error
Vue.prototype.$warning = Modal.warning
Vue.prototype.$confirm = Modal.confirm
