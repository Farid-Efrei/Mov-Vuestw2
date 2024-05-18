<template>
    <div>
        <h2 class="uppercase text-3xl font-semibold text-yellow-500 underline animate-pulse text-center m-16">
            Films et Séries d'Animation (et surtout Animés)
        </h2>
        <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <FilmItems
            v-for="animation in animations" :key="animation.id"
            :video="animation"
            
            />

        </div>
    </div>
</template>
<script>
import FilmItems from '@/components/items/FilmItems.vue';
import requete from '@/service/api';

export default {
    components: {
    FilmItems
    },
    data() {
        return {
            animations: [],
            genres: []
    }
    },
    async mounted() {
        this.getAnimationVideos();
    
    },
    methods: {
        async getAnimationVideos() {
            try {
                
                // le genre_id correspondant à l'Animation pour films & series est le 16.
                const [moviesResponse, seriesResponse] = await Promise.all([
                    requete.get('/discover/movie', { params: { with_genres: '16' } }),
                    requete.get('discover/tv', { params: { with_genres: '16' } })
                ]);
                
                // Je combine les 2 résultats pour n'avoir qu'une reponse et une liste finale:
                const animationFilms = moviesResponse.data.results;
                const animationSeries = seriesResponse.data.results;
                this.animations =  [...animationFilms, ...animationSeries]
            } catch (error) {
             console.error("Erreur lors de la récupération des vidéos d'Animations", error);   
            }
            }
        }

}
</script>
<style lang="">

</style>