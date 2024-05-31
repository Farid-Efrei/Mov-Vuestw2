<template>
    <div >
        <h1 class=" uppercase text-center font-semibold  text-yellow-500 text-3xl underline m-16 animate-pulse">Section
            Films Coréens </h1>
        <div class="grid sm:grid-cols-3 md: grid-cols-4
        lg:grid-cols-5 gap-8 ">
            <FilmItems
            class="text-pretty text-center text-lg"
            v-for="kfilm in kfilms" 
            :key="kfilm.id" 
            :video="kfilm" 
            :genres="genres" 
            />
            
        </div>
    
    </div>
</template>
<script>

import FilmItems from '@/components/items/FilmItems.vue';
import requete from '@/service/api';

export default {
    name: 'k-films',
    components: {
        FilmItems
    },
    props: {
        magicRoute : String,
        
    },
    data() {
        return {
            kfilms: [],
            genre: [],
            
            
        }
    },
    mounted() {
        // l'ordre a une importance !!! 
        this.fetchGenres();
        this.popKorMovie();
    },
    methods: {
        async popKorMovie(){
            try {
               
                const response = await requete.get('/discover/movie',{ params: {
                    // sort_by: 'release_date.desc',
                    // language: 'ko', // Langue coréenne
                    region: 'KR' ,// Région Corée du Sud ,
                    include_adult: 'false',
    include_video: 'false',
    page: '1',
    sort_by: 'popularity.desc',
    with_original_language: 'ko'
                }
            });
                this.kfilms = response.data.results;
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
   
}
</script>
<style lang="">

</style>