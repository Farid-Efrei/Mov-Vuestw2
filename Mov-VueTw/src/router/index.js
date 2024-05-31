import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LesFilms from '@/views/LesFilms.vue'
import FilmDetails from '@/components/films/FilmDetails.vue'
import LesSeries from '@/views/LesSeries.vue'
import LesAnims from '@/views/LesAnims.vue'
import LoginView from '@/views/LoginView.vue'
import RegisterView from '@/views/RegisterView.vue'
import UserProfile from '@/views/UserProfile.vue'
import {authGuard} from '../service/guards/authGuard'
import FilmDetailsFactice from '@/components/films/FilmDetailsFactice.vue'
import ForgotPassword from '@/views/ForgotPassword.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', name: 'home', component: HomeView },
    {path: '/about', name: 'about', component: () => import('../views/AboutView.vue')},
    {path: '/films', name: 'films', component: LesFilms },
    {path: '/series',name: 'series',component: LesSeries},
    {path: '/animations', name: 'animations', component: LesAnims },
    {path: '/:magicRoute/:id', name: 'filmDetails', component: FilmDetails, meta: {requiresAuth: false}},
    {path:'/login', name: 'login', component: LoginView},
    {path:'/register', name: 'register', component: RegisterView},
    {path:'/profile', name: 'profile', component: UserProfile,
      meta: { requiresAuth : true}
    },
     {path:'/factice/:id', name:'filmDetailsFactice', component: FilmDetailsFactice},
     {path:'/forgot-password', name:'forgotPassword', component: ForgotPassword}
    // { path: '/:magicRoute/:id', name: 'filmDetailsFactice', component: FilmDetailsFactice, meta: { requiresAuth: false } }

    
    // {
      //   path:'/films/:id',
      //   name: 'filmDetails',
      //   component: FilmDetails,
      //   //props: { magicRoute: 'films' },
      //   props: true,
      //   //meta: {category : 'films'}
      
      
      // },
      // {
        //   path:'/series/:id',
        //   name: 'filmDetails',
        //   component: FilmDetails,
        //   //props: { magicRoute: 'series' },
        //   props:true,
        //   //meta :{category : 'series'}

        
        // },
        // {
          //   path: '/animations/:id',
          //   name: 'filmDetails',
          //   component: FilmDetails,
          
          // },
        ]
      });
      // Guard pour protéger la route du profil:
      router.beforeEach(authGuard)

export default router
