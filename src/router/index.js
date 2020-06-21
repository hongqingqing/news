import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '../pages/Login.vue'
import Register from '../pages/Register.vue'
import Profile from '../pages/Profile.vue'
import EditProfile from '../pages/EditProfile.vue'
import Focus from '../pages/Focus.vue'
import Comment from '../pages/Comment.vue'
import MyCollect from '../pages/MyCollect.vue'
import Home from '../pages/Home.vue'
import NewsDetails from '../pages/NewsDetails.vue'

Vue.use(VueRouter)
const router = new VueRouter({
  routes: [
    { path: '/', redirect: '/home' },
    { path: '/login', component: Login, name: 'login' },
    { path: '/register', component: Register, name: 'register' },
    { path: '/profile', component: Profile, name: 'profile' },
    { path: '/edit-profile', component: EditProfile, name: 'edit-profile' },
    { path: '/focus', component: Focus, name: 'focus' },
    { path: '/comment', component: Comment, name: 'comment' },
    { path: '/my-collect', component: MyCollect, name: 'my-collect' },
    { path: '/home', component: Home, name: 'home' },
    { path: '/news-details/:id', component: NewsDetails, name: 'news-details' }

  ]
})

const AuthUrls = [
  '/profile',
  '/edit-profile',
  '/focus',
  '/comment',
  '/my-collect'
]
router.beforeEach(function (to, from, next) {
  console.log('to', to)
  const token = localStorage.getItem('token')
  if (AuthUrls.includes(to.path)) {
    if (token) {
      next()
    } else {
      // next('/login')
      router.push('/login')
    }
  } else {
    next()
  }
})
export default router
