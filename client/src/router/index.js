import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Register from '@/components/Register'
import Login from '@/components/Login'
import Songs from '@/components/Songs'
import CreateSong from '@/components/CreateSong'
import ViewSong from '@/components/ViewSong'
import EditSong from '@/components/EditSong'
import store from '@/store/store'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home
    },
    {
      path: '/register',
      name: 'register',
      component: Register
    },
    {
      path: '/login',
      name: 'login',
      component: Login
    },
    {
      path: '/songs',
      name: 'songs',
      component: Songs
    },
    {
      path: '/songs/:songId',
      name: 'view-song',
      component: ViewSong
    },
    {
      path: '/songs/create',
      name: 'songs-create',
      component: CreateSong,
      beforeEnter: (to, from, next) => {
        if (store.state.isUserLoggedIn === false) {
          next('/login')
        } else {
          next()
        }
      }
    },
    {
      path: '/songs/:songId/edit',
      name: 'edit-song',
      component: EditSong,
      beforeEnter: (to, from, next) => {
        if (store.state.isUserLoggedIn === false) {
          next('/login')
        } else {
          next()
        }
      }
    },
    {
      path: '*',
      redirect: 'home'
    }
  ]
})
