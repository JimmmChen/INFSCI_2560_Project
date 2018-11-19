import Vue from 'vue'
import Router from 'vue-router'
import GoodsList from './../views/GoodsList'
import Cart from './../views/Cart'
import Address from './../views/Address'
import OrderConfirm from './../views/OrderConfirm'
import OrderSuccess from './../views/OrderSuccess'

import AdminLogin from './../views/admin/login'

Vue.use(Router)

const router = new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      component: GoodsList,
      beforeEnter: (to, from, next) => {
        next()
      }
    },
    {
      path: '/cart',
      component: Cart,
      beforeEnter: (to, from, next) => {
        if (sessionStorage.getItem('isLogin')) {
          next()
        } else {
          alert('Need for Login')
          router.push({
            path: '/'
          })
        }
      }
    },
    {
      path: '/address',
      component: Address,
      beforeEnter: (to, from, next) => {
        if (sessionStorage.getItem('isLogin')) {
          next()
        } else {
          alert('Need for Login')
          router.push({
            path: '/'
          })
        }
      }
    },
    {
      path: '/orderConfirm',
      component: OrderConfirm,
      beforeEnter: (to, from, next) => {
        if (sessionStorage.getItem('isLogin')) {
          next()
        } else {
          alert('Need for Login')
          router.push({
            path: '/'
          })
        }
      }
    },
    {
      path: '/orderSuccess',
      component: OrderSuccess,
      beforeEnter: (to, from, next) => {
        if (sessionStorage.getItem('isLogin')) {
          next()
        } else {
          alert('Need for Login')
          router.push({
            path: '/'
          })
        }
      }
    },
    {
      path: '/AdminLogin',
      component: AdminLogin,
      beforeEnter: (to, from, next) => {
        if (sessionStorage.getItem('isAdmin')) {
          router.push({
            path: '/AdminDashboard'
          })
        } else {
          next()
        }
      }
    }
  ]
})

export default router
