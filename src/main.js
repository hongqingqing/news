import Vue from 'vue'
import App from './App.vue'
import router from './router/index'
import 'lib-flexible'
// 导入通用的样式文件
import './styles/base.css'
// 导入字体图标文件
import './styles/iconfont.css'

// import Vant from 'vant'
// import 'vant/lib/index.css'
import NewsInput from './components/NewsInput.vue'
import { Button, Toast } from 'vant'

Vue.use(Button)
Vue.use(Toast)
Vue.component('news-input', NewsInput)

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
