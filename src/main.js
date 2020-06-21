import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import axios from 'axios'
import moment from 'moment'
import 'lib-flexible'
// 导入通用的样式文件
import './styles/base.css'
// 导入字体图标文件
import './styles/iconfont.css'

// import Vant from 'vant'
// import 'vant/lib/index.css'
import NewsInput from './components/NewsInput.vue'
import CellNav from './components/CellNav'
import NewsHeader from './components/NewsHeader.vue'
import { Button, Toast, Dialog, Field, RadioGroup, Radio, Cell, CellGroup, Uploader, List, Tab, Tabs, PullRefresh } from 'vant'

Vue.component('news-input', NewsInput)
Vue.component('cell-nav', CellNav)
Vue.component('news-header', NewsHeader)
Vue.use(Button)
Vue.use(Toast)
Vue.use(Dialog)
Vue.use(Field)
Vue.use(Radio)
Vue.use(RadioGroup)
Vue.use(Cell)
Vue.use(CellGroup)
Vue.use(Uploader)
Vue.use(List)
Vue.use(Tab)
Vue.use(Tabs)
Vue.use(PullRefresh)

// 全局定义过滤器
Vue.filter('time', function (input, format = 'YYYY-MM-DD') {
  return moment(input).format(format)
})

Vue.prototype.$axios = axios
// 给axios设置默认的URL,会自动拼接url参数
axios.defaults.baseURL = 'http://localhost:3000'

// 添加请求拦截器
axios.interceptors.request.use(function (config) {
  // 在发送请求之前做些什么
  console.log('请求拦截器', config)
  // 判断浏览器是否有token,如果浏览器有token,就把token统一带上
  const token = localStorage.getItem('token')
  if (token) {
    config.headers.Authorization = token
  }
  return config
}, function (error) {
  // 对请求错误做些什么
  return Promise.reject(error)
})

// 添加响应拦截器
axios.interceptors.response.use(function (response) {
  // 对响应数据做点什么
  console.log('响应拦截器', response)
  if (response.data.statusCode === 401 && response.data.message === '用户信息验证失败') {
    router.push('/login')
    localStorage.removeItem('token')
    localStorage.removeItem('id')
    Toast.fail('用户信息验证失败')
  }
  return response
}, function (error) {
  // 对响应错误做点什么
  return Promise.reject(error)
})
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
