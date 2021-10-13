import Vue from 'vue'
import App from './App'
import HttpRequest from './common/httpRequest'
import queue from './common/queue'
import uView from "uview-ui";

Vue.use(uView);
Vue.config.productionTip = false

App.mpType = 'app'
Vue.prototype.$Request = HttpRequest;
Vue.prototype.$queue = queue;
const app = new Vue({
    ...App
})
app.$mount()
