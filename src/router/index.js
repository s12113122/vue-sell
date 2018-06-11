import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import Goods from '@/components/Goods/Goods'
import Ratings from '@/components/Ratings/Ratings'
import Seller from '@/components/Seller/Seller'


Vue.use(Router)

export default new Router({
  linkActiveClass: 'active',
  mode: 'history',
  routes: [
    {
      path: '/',
      redirect: '/goods'
    },
    {
      path: '/goods',
      name: 'goods',
      component: Goods
    },
    {
      path: '/ratings',
      name: 'ratings',
      component: Ratings
    },
    {
      path: '/seller',
      name: 'seller',
      component: Seller
    }
  ]
})
