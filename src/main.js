import Vue from 'vue'
import App from './App.vue'
import router from './router'
// 导入封装的vant组件导入库
import './utils/vantUtils.js'

// 将文字列表封装成全局组件
import articleItem from '@/components/articleItem.vue'
Vue.component('articleItem', articleItem)
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
