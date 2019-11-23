// 文档地址
// https://router.vuejs.org/zh-cn/
import Vue from 'vue';
import Router from 'vue-router';
import Index from '@/page/index/index';

// 组件懒加载写法
// const Index = () => import('@/page/Index');

// 组件切片名称
// webpack 会将A、B、C三个组件打包到 group-word 文件中
// const A = () => import(/* webpackChunkName: "group-word" */ '@/page/A.vue');
// const B = () => import(/* webpackChunkName: "group-word" */ '@/page/B.vue');
// const C = () => import(/* webpackChunkName: "group-word" */ '@/page/C.vue');

Vue.use(Router);

// 保留访问页面的位置
const scrollBehavior = (to, from, savedPosition) => {
  if (savedPosition) {
    // savedPosition 用于 popstate 导航
    return savedPosition;
  } else {
    const position = {};
    // 通过锚点返回位置
    if (to.hash) {
      position.selector = to.hash;
    }
    // 根据meta判断是不是回到页面的顶部
    if (to.matched.some(m => m.meta.scrollToTop)) {
      position.x = 0;
      position.y = 0;
    }
    // 如果返回为空,保留原位置
    return position;
  }
};

export default new Router({
  mode: 'hash',
  scrollBehavior,
  routes: [
    /* 如果meta设置了keepAlive为true，则改组件会被缓存下来 */
    { path: '/', name: 'index', component: Index, meta: { title: '首页', keepAlive: true } },
  ],
});
