<template>
    <div>

    
    <div class="container flex mt-20 mx-auto border-b-2 border-green-200 pb-4 ">
        <img :src="imageUrl" alt="Joker" width="100%">

        <div class="ml-24">
            <h1 class="text-5xl font-semibold"> {{video.title ||video.name}}</h1>
            <span class="text-green-200 text-xl flex mt-4">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-7 mr-3 text-yellow-400 ">
                <path fill-rule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z" clip-rule="evenodd" />
                </svg>
            {{video.vote_average * 10}}%  |  {{video.release_date}}  |  Durée approximative : {{video.runtime}} min | 
             
            <p v-for="(genre,index) in video.genres" :key="index" class="flex flex-1"> 
                {{ (" | ")  + genre.name }} <br>
                <span v-if="index !== video.genres.length -1"> |  

                </span>
            </p>
            </span>
            <p class="mt-7">
                {{ video.overview }}
                <br><br>


                <!-- En 1981, Arthur Fleck travaille dans une agence de clowns à Gotham City. Méprisé et incompris par ceux qui lui font face, il mène une morne vie en marge de la société et habite dans un immeuble miteux avec sa mère Penny. Un soir, il se fait agresser dans le métro par trois traders de Wayne Enterprises alcoolisés qui le brutalisent, le poussant à les tuer en retour. Son geste inspire à une partie de la population l'idée de s'en prendre eux aussi aux puissants. Dans cette société décadente, Arthur bascule peu à peu dans la folie et finit par devenir le Joker, un dangereux tueur psychopathe victime d'hallucinations et le plus grand criminel de Gotham City. -->
            </p>
            <div class="mt-10">
                
                <h3 class="text-xl font-semibold"> Realisation / Production Cast </h3><br>

                <div class="flex gap-10">

                    <div class="flex flex-col">
                        <span>Todd Philips</span>
                        <span class="text-green-300">Realisateur</span>
                    </div>
                    
                    <div class="flex flex-col" >
                        <span>Scott Silver</span>
                        <span class="text-green-300">Producteur</span>
                    </div>
                </div>
                <br>
                <div class="mt-10 flex items-center">
                    <a href="#" class="bg-red-500 px-6 py-6 rounded-lg text-xl font-semibold mr-10 inline-flex">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="w-6 h-6 mr-5 mt-1">
                        <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z" clip-rule="evenodd" />
                        </svg>
                    Bande-Annonce
                    </a>
                    <a href="#" class=" bg-green-500 px-5 py-6 text-xl font-semibold rounded-lg inline-flex mr-10">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 mr-5 mt-1">
                        <path stroke-linecap="round" stroke-linejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z" />
                        </svg>
                    Ajouter aux Favoris
                    </a>
                </div>
            </div>
        </div>
    </div>
    <CastFilm />
    <ImagesFilm />

    
    
    </div>
</template>


<script>
import CastFilm from '@/components/films/CastFilm.vue';
import ImagesFilm from '@/components/films/ImagesFilm.vue';
import requete from '../../service/api';
export default {
    components: {
        CastFilm,
        ImagesFilm,
    },
    data(){
        return{
            video:[],
            
            
        }
    },
    mounted(){
        // this.fetchFilm(this.$route.params.id)
        this.fetchSerieOrFilm(this.$route.params.id)
        console.log(this.imageUrl);
        
        // console.log('chemin : ' + this.$route.params.id);
        // console.log('le media type est : ' + this.$route.params.magicRoute, this.$route.params.id);
        
       /*  if (this.video.media_type == 'movie') {
            this.fetchSerie(this.$route.params.id)
        } else  {

            this.fetchFilm(this.$route.params.id)
        } */
    },
    methods:{

       /*  async fetchFilm(videoId){
                const response = await requete(
                "/movie/" + videoId
            )
            this.video = response.data
            },

        async fetchSerie(videoId){
            const response = await requete(
                "/tv/" + videoId
            )
            this.video = response.data
        }, */
        async fetchSerieOrFilm(videoId){
            try{
                const magicRoute = this.$route.params.magicRoute;
                if (magicRoute === 'films') {
                    const response = await requete(
                `/movie/${videoId}`
                )
                this.video = response.data
                } else {
                    const response = await requete (
                        '/tv/' + videoId
                    )
                    this.video = response.data
                }
                
               
            }catch (error){
                console.error("Une erreur s'est produite lros de la récupération de la video", error)
                const magicRoute = this.$route.params.magicRoute;

                console.log(`/${magicRoute}/${videoId}`);
            }

        },
       
        },
        computed : {
            imageUrl() {
                return 'https://image.tmdb.org/t/p/original/' + this.video.poster_path
            },
        }
       
    
    
    }
       
            
        
    
    
    

</script>
<style lang="">
    
</style>