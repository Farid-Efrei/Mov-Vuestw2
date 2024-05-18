import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LesFilms from '@/views/LesFilms.vue'
import FilmDetails from '@/components/films/FilmDetails.vue'
import LesSeries from '@/views/LesSeries.vue'
import LesAnims from '@/views/LesAnims.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {path: '/', name: 'home', component: HomeView },
    {path: '/about', name: 'about', component: () => import('../views/AboutView.vue')},
    {path: '/films', name: 'films', component: LesFilms },
    {path: '/series',name: 'series',component: LesSeries},
    {path: '/animations', name: 'animations', component: LesAnims },
    {path: '/:magicRoute/:id', name: 'filmDetails', component: FilmDetails }
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
})

export default router
