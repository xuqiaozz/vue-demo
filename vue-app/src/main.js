import Vue from 'vue'
import App from './App.vue'
import router from './router'


import "./utils/filters"
import "./styles/index.scss";



import Vant from "vant";
Vue.use(Vant); // 全局配置 



//导入 vue-resource  axios
import axios from "@/utils/axios.js";
Vue.prototype.$axios = axios;    // this==> Vue.prototype  this.$axios ==> axios ;

import VueResource from "vue-resource";
Vue.use(VueResource);  // this.$http    Vue.http 请求数据 





// 标记 是什么环境模式   开发测试模式     线上模式  
Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App),
}).$mount('#app')
