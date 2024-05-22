<template>
    <div >
        <h1 class=" uppercase text-center font-semibold  text-yellow-500 text-3xl underline m-16 animate-pulse">Section
            Films</h1>
        <div class="grid sm:grid-cols-3 md: grid-cols-4
        lg:grid-cols-5 gap-8 ">
            <FilmItems 
            class="text-pretty text-center text-lg -z-0"
            v-for="film in films" 
            :key="film.id" 
            :video="film" 
            :genres="genres" 
            />
            
        </div>
        <ul class="grid grid-cols-3   border">
            <li v-for="movie in movies" :key="movie.id" class="flex-1 text-lg font-semibold border text-center m-5 bg-green-300 text-red-500 shadow-md">
                <router-link :to="{name:'filmDetailsFactice', params: {id:movie.id, magicRoute:'films'}}">{{ movie.title }}</router-link>
                {{ movie.comments }}

            </li>
        </ul>
    </div>
</template>
<script>

import FilmItems from '@/components/items/FilmItems.vue';
import requete from '@/service/api';
import { useFacticeUserStore } from '@/stores/facticeUserStore';
export default {
    components: {
        FilmItems
    },
    props: {
        magicRoute : String,
    },
    data() {
        return {
            films: [],
            genre: [],
            
        }
    },
    mounted() {
        // l'ordre a une importance !!! 
        this.fetchGenres();
        this.getPopMovie();

        const userStore = useFacticeUserStore();
        userStore.fetchFavorites();
        userStore.fetchComments();
        userStore.fetchRatings();
        
        
    },
    methods: {
        async getPopMovie() {
            try {
                //const response = await requete.get('movie/popular');
                // const response = await requete.get('movie/top_rated');
                // const response = await requete.get('movie/upcoming');
                const response = await requete.get('movie/now_playing');
                this.films = response.data.results;
            } catch (error) {
                console.error('echec de la récupération de la liste des films populaires ', error);
            }
        },
        async fetchGenres() {
            try {
                const response = await requete.get('/genre/movie/list');
                this.genres = response.data.genres;
            } catch (error) {
                console.error('Échec de la récupération des genres de films', error);
            }
        }

    },
    computed: {
        // magicRoute() {
        //     return this.$route.meta.category;
        // },

        // magicRoute() {

        //     if (this.$route.name === 'films') {
        //         return 'films';
                
        //     } else {
        //         return 'series';
        //     }
        // }

        movies(){
            const userStore = useFacticeUserStore();
            return userStore.movies;
        }
    }
}
</script>
<style lang="">

</style>