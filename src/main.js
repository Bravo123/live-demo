// 文档地址
// https://vuefe.cn/
import Vue from 'vue';
import App from './App';
import router from './router';
import store from './store/index';
import './css/base.scss';
import VueZToast from 'vue-z-toast';
import 'vue-z-toast/dist/index.min.css';
import Scroll from './components/scroll/index';
import { wechatShare } from './sdk/wechat';
import { setWechatTitle } from './lib/utils';

Vue.config.productionTip = false;

// 全局路钩子
// router.beforeEach((to, from, next) => {
// 	// ...
// 	next();
// });
router.afterEach(route => {
  if (route.meta.title) {
    setWechatTitle(route.meta.title);
  }
  // ...
});

// 全局插件 组件
Vue.use(VueZToast);
Vue.component('scroll', Scroll);

Vue.prototype.$wechatShare = wechatShare;

// event bus
/**
 * 使用方法
 * this.$bus.$emit('func', args);
 * this.$bus.$on('func', args => {
 * 	console.log(args);
 * });
 */
const EventBus = new Vue();
Object.defineProperties(Vue.prototype, {
  $bus: {
    get() {
      return EventBus;
    },
  },
});

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  components: { App },
});
