<template>
    <div>
        <h2 class="uppercase text-3xl font-semibold text-yellow-500 underline m-16 animate-pulse text-center">
            Vidéos Populaires en ce moment !!!
        </h2>

        <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            <FilmItems v-for="video in videos" :key="video.id" :video="video" :genres="genres" :genre_ids="video.genre_ids" />
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
        this.fetchAllGenres();
        try {
            const response = await requete.get('trending/all/week')
            //console.log(response.data.results);
            this.videos = response.data.results
           // console.log(this.videos);
        } catch (erreur) {
            console.log(erreur)
        }
    },
    methods:{
        // pour trouver le genre, on doit fetcher :
        /* async fetcherGenres(){
            try{
                const response = await requete.get('/genre/movie/list')
                this.genres = response.data
                //console.log(this.genres);
            } catch (erreur) {
                console.log(erreur)
        }
    }, */ // plutôt que d'avoir deux requêtes, une pour la liste des genres films et l'autre pour les séries, sachant que les ids sont communes, (action vaut 18 pour tv comme pour movie), je vais tenter de regrouper les 2 dans une seule liste de genres à afficher dans la vue enfant. En utilisant Promise.all() pour attendre que toutes les requêtes se terminent avant de continuer.
    async fetchAllGenres(){
        try{
            // Faire les 2 requêtes simultanément:
            const [filmGenresReponse, tvGenresReponse] = await Promise.all([
                requete.get('/genre/movie/list'),
                requete.get('/genre/tv/list')
            ]);
            // Je récupère les données de chaque réponse à part:
            const filmGenres = filmGenresReponse.data.genres;
            const tvGenres = tvGenresReponse.data.genres;

            // Je tente de regrouper les 2 listes de genres obtenues en une seule:
            const listeGenres = [...filmGenres, ...tvGenres];

            this.genres = listeGenres;
        } catch (erreur){
            console.error('Erreur lors de la récupération des données des genres', erreur);
        }
    }
} 
}
</script>

<style lang="scss" scoped>
.poster {}
</style>
