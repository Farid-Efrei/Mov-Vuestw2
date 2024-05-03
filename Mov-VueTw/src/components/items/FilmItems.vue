
<template>
    <div class="relative container m-2 border border-green-200">
        <div class="absolute text-2xl text-green-300 bg-black opacity-55">
            {{ mediaType }}
        </div>
        <router-link :to="`/${magicRoute}/${video.id}` ">
            <img :src="imageUrl" 
            :alt="video.title || video.name"
            class="hover:opacity-80 transition ease-in-out duration-150" />
        </router-link>

        <div class="flex justify-between items-center m-2">
            <h2 class="text-xl">{{ video.title || video.name }}</h2>
            <img src="../../assets/tvseries.webp" alt="logo serie tv" class="size-12"
                v-if="video.media_type === 'tv'" />
            <img src="../../assets/filmIcone.webp" alt="logo film" class="size-12"
                v-if="video.media_type === 'movie'" />
        </div>
        <div class="flex">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                class="w-6 h-6 text-yellow-400 ml-2">
                <path fill-rule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clip-rule="evenodd" />
            </svg>
            <span class="ml-2 text-lg">
                {{ (video.vote_average * 10).toFixed(2) }}% |
                {{ video.release_date || video.first_air_date }} </span><br />
        </div>
        <span class="text-lg text-gray-400" >
            <span v-for="(genre, index) in video.genre_ids" :key="index">
                {{ getGenreNames(genre) }}
                <!-- genre_ids{{ video.genre_ids }} -->
                <!-- genre:{{ genre_ids}} -->
                <!-- {{ video.genre_ids(getGenreName) }} -->
            </span>
        </span>
    </div>
</template>
<script>
export default {
    props: {
        video: {
            required: true
        },
        genres: {
            required: true
        },
        genre_ids: {
            type: Array,
            required: true
        }
    },
    setup() { },

    computed: {
        imageUrl() {
            return 'https://image.tmdb.org/t/p/original/' + this.video.poster_path
        },
        mediaType() {
            if (this.video.media_type === 'movie') {
                return 'Film'
            } else {
                return 'Série'
            }
        },
        magicRoute(){
            if (this.video.media_type === 'movie') {
                // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                return this.magicRoute = 'films'
            } else {
                // eslint-disable-next-line vue/no-side-effects-in-computed-properties
                return this.magicRoute = 'series'
            }
        }
    },
    methods: {
     /*    getGenreName(id) {
            const genre = this.genre_ids.find((genre) => genre.id === id)
            return genre ? genre.name : 'Inconnus'
        }, */
       /*  getGenres(genre_ids) {
            const genres_ids = genres_ids.split(' ').map((id) => parseInt(id))
            return genre_ids.map((id) => this.getGenreNames(id).join(', '))
        }, */
        getGenreNames(genreId) {
            const genre = this.genres.find((genre) => genre.id === genreId)
            return genre ? (genre.name) : 'Nooooo'
        }
    },
    mounted() {
        // console.log(this.genres)
    }
}
</script>
<style lang=""></style>
