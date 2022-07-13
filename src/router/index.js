import Vue from 'vue'
import VueRouter from 'vue-router'

// 懒加载引入路由
const Layout = () => import('@/views/Layout')
const Home = () => import('@/views/Home')
const Find = () => import('@/views/Find')
const News = () => import('@/views/News')
const My = () => import('@/views/My')
const Login = () => import('@/views/Login')
const City = () => import('@/views/City')
const Rent = () => import('@/views/Rent')
const Add = () => import('@/views/Rent/add.vue')
const Search = () => import('@/views/Rent/search.vue')
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layout,
    redirect: '/layout',
    children: [
      { path: 'layout', component: Layout, redirect: '/home' },
      { path: 'home', component: Home },
      { path: 'find', component: Find },
      { path: 'news', component: News },
      {
        path: 'my',
        component: My
      }
    ]
  },
  { path: '/login', component: Login },
  // 城市页面
  { path: '/city', component: City },
  {
    path: '/rent',
    component: Rent,
    redirect: '/rent/add',
    children: [
      {
        path: 'add',
        component: Add
      },
      {
        path: 'search',
        component: Search
      }
    ]
  }
]

const router = new VueRouter({
  routes
})

export default router
