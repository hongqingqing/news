import Vue from 'vue'
import App from './App.vue'
import 'lib-flexible'
// 导入通用的样式文件
import './styles/base.css'
// 导入字体图标文件
import './styles/iconfont.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
