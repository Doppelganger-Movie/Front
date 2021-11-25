import Vue from 'vue'
import VueRouter from 'vue-router'
import Main from '../views/movies/Main.vue'
import Profile from '../views/Profile/Profile.vue'
import ArticleList from '../views/community/ArticleList.vue'
import ArticleDetail from '../views/community/ArticleDetail.vue'
import CreateArticle from '../views/community/CreateArticle.vue'
import UpdateArticle from '../views/community/UpdateArticle.vue'
import Signup from '@/views/accounts/Signup.vue'
import Login from '@/views/accounts/Login.vue'
import MovieDetail from '@/views/movies/MovieDetail.vue'
import Doppleganger from '@/views/Doppleganger/Doppleganger.vue'
// import DirectorMovieList from '@/views/movies/DirectorMovieList.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Main',
    component: Main
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile
  },
  {
    path: '/community',
    name: 'ArticleList',
    component: ArticleList
  },
  {
    path: '/create-article',
    name: 'CreateArticle',
    component: CreateArticle
  },
  {
    path: '/community/:article_num',
    name: 'ArticleDetail',
    component: ArticleDetail
  },
  {
    path: '/community/:article_num/update',
    name: 'UpdateArticle',
    component: UpdateArticle
  },
  {
    path: '/accounts/signup',
    name: 'Signup',
    component: Signup,
  },
  {
    path: '/accounts/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/movies/:movie_num',
    name: 'MovieDetail',
    component: MovieDetail,
  },
  {
    path: '/doppleganger',
    name: 'Doppleganger',
    component: Doppleganger,
  },
  // {
  //   path: '/movies/director_movie',
  //   name: 'DirectorMovieList',
  //   component: DirectorMovieList,
  // }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
