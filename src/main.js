import Vue from "vue";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from "./App.vue";
import{Message} from 'element-ui'
Vue.use(ElementUI);
Vue.config.productionTip = false;
Vue.prototype.$message = Message
new Vue({
  render: h => h(App)
}).$mount("#app");
