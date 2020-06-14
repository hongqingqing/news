import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import 'lib-flexible'
// 导入通用的样式文件
import './styles/base.css'
// 导入字体图标文件
import './styles/iconfont.css'

var num = 20
console.log(num)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
