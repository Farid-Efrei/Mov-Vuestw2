<template>
    <div>
        <h2 class="uppercase text-3xl font-semibold text-yellow-500 underline m-16 animate-pulse text-center">
            Vidéos Populaires en ce moment !!!
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <FilmItems v-for="video in videos" :key="video.id" :video="video" :genres="genres" />
        </div>
    </div>
</template>

<script>
import FilmItems from '@/components/items/FilmItems.vue'
import requete from '../service/api'
export default {
    components: {
        FilmItems
    },
    data() {
        return {
            videos: [],
            genres:[],
        }
    },
    async mounted() {
        // pour avoir la liste des genres, ne pas oublier d'appeler la fct dans le mounted.
        // l'appeler une fois surffit à avoir la liste, sinon on l'appelerait tout le tps pour chaque genre, et ce serait consommateur de ressources et inutile car ce sont des données constantes. 
       // this.fetcherGenres();
        try {
            const response = await requete.get('trending/all/week')
            //console.log(response.data.results);
            this.videos = response.data.results
           // console.log(this.videos);
        } catch (erreur) {
            console.log(erreur.message)
        }
    },
    methods:{
        // pour trouver le genre, on doit fetcher :
        async fetcherGenres(){
            try{
                const response = await requete.get('/genre/tv/list')
                this.genres = response.data
                console.log(this.genres);
            } catch (erreur) {
                console.log(erreur.message)
        }
    }
}
}
</script>

<style lang="scss" scoped>
.poster {}
</style>
