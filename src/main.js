import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入vant
import Vant from 'vant'
// 全局引入vant组件
import 'vant/lib/index.less'
// import 'vant/lib/index.css'
// 引入flexible规则
import 'amfe-flexible'
import '@/style/index.less'
Vue.use(Vant)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
