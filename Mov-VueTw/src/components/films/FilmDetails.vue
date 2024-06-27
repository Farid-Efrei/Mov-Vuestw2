<template>
  <div class="container mx-auto mt-20 px-4">
    <div class="container flex border-b-2 border-green-200 pb-4">
      <img
        :src="imageUrl"
        :alt="video.title || video.name"
        class="size-full max-w-[50%] object-cover"
      />

      <div class="ml-24">
        <div class="flex justify-between items-center">
          <h1 class="text-5xl font-semibold">{{ this.video.title || video.name }}</h1>
          <img
            src="../../assets/filmIcone.webp"
            alt="icone-film"
            class="size-20"
            v-if="magicRoute === 'film'"
          />
          <img
            src="../../assets/tvseries.webp"
            alt="icone-serie"
            class="size-20"
            v-if="magicRoute === 'serie'"
          />
        </div>

        <span class="text-green-200 text-xl flex mt-4 border flex-col pl-2 pb-2 m-2">
          <div class="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-8 mr-3 text-yellow-400"
            >
              <path
                fill-rule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                clip-rule="evenodd"
              />
            </svg>
            {{ (video.vote_average * 10).toFixed(2) }}% | Date de sortie:
            {{ video.release_date || video.first_air_date }} |
          </div>
          <div class="flex-inline">
            <span v-if="video && video.last_episode_to_air">
              <u>Durée approximative :</u>
              {{ video.last_episode_to_air.runtime }}
              min
            </span>
            <span v-if="video && video.runtime">
              <u>Durée approximative :</u>
              {{ video.runtime }}min
            </span>
            <div class="">
              Type : {{ $route.params.magicRoute }}<br />

              <div v-if="magicRoute && video && video.last_episode_to_air && video.networks">
                Nombre de Saison(s): {{ video.number_of_seasons }}<br />
                Nombre d'épisodes (prévus): {{ video.number_of_episodes }}<br />
                Origine: {{ video.origin_country }}<br />
                Dernier épisode diffusé:
                {{ video.last_episode_to_air.episode_number }} - {{ video.last_episode_to_air.name
                }}<br />
                Statut de la série : {{ video.status }} <br />
                Produit par : {{ video.networks[0].name }} <br />
              </div>
            </div>
          </div>
          <div>
            <br />
            <b><u>Genres:</u></b>
            <p v-for="(genre, index) in video.genres" :key="index" class=" ">
              {{ '| ' + genre.name }}
              <span v-if="index !== video.genres.length - 1">, </span>
            </p>
          </div>
        </span>
        <b><u>Sypnosis:</u></b>
        <p class="mt-2 text-justify shadow-2xl">
          {{ video.overview }}
          <br /><br />

          <span class="font-semibold text-red-300 text-lg"> "{{ video.tagline }}" </span>
        </p>
        <div class="mt-7">
          <h3 class="text-xl font-semibold">Realisation / Production Cast</h3>
          <br />

          <div class="flex justify-around">
            <div
              class="flex flex-col place-items-center"
              v-for="(crew, index) in creditsData.crew"
              :key="index"
            >
              <span v-if="index < 6" class="mr-5"> {{ crew.name }}</span>
              <span class="text-green-300 mr-5" v-if="index < 6">{{ crewJobs[index] }}</span>
            </div>
          </div>
          <br />
          <div class="mt-10 flex items-center">
            <button
              @click="openTrailer"
              class="bg-red-500 px-6 py-6 rounded-lg text-xl font-semibold mr-10 inline-flex"
              target="_blank"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6 mr-5 mt-1"
              >
                <path
                  fill-rule="evenodd"
                  d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm14.024-.983a1.125 1.125 0 0 1 0 1.966l-5.603 3.113A1.125 1.125 0 0 1 9 15.113V8.887c0-.857.921-1.4 1.671-.983l5.603 3.113Z"
                  clip-rule="evenodd"
                />
              </svg>
              Bande-Annonce
            </button>
            <a
              href="#"
              class="bg-green-500 px-5 py-6 text-xl font-semibold rounded-lg inline-flex mr-10"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
                class="w-6 h-6 mr-5 mt-1"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                />
              </svg>
              Ajouter aux Favoris
            </a>
          </div>
        </div>
        <CommentsAndRatingsPerp3 :magicRoute="magicRoute" />
      </div>
    </div>
    <CastFilm :casting="creditsData.cast" />
    <ImagesFilm :imagesVideo="imagesScenes.backdrops" @mediaSelected="openModal" />
    <ModalMedia
      v-if="showModal"
      :showModal="showModal"
      :mediaSrc="selectedMediaSrc"
      :mediaAlt="selectedMediaAlt"
      :mediaType="selectedMediaType"
      @close="showModal = false"
    />
  </div>
</template>

<script>
import CastFilm from '@/components/films/CastFilm.vue'
import ImagesFilm from '@/components/films/ImagesFilm.vue'
import requete from '../../service/api'

import Toktok from '../../service/tok'
//const toktok = process.env.TMDB_API_TOKTOK;
import ModalMedia from '@/components/items/ModalMedia.vue'
import CommentsAndRatingsPerp3 from '@/components/films/CommentsAndRatingsPerp3.vue'

import { useUserStore } from '@/stores/user'

export default {
  name: 'filmDetails',
  components: {
    CastFilm,
    ImagesFilm,
    ModalMedia,
    CommentsAndRatingsPerp3
  },
  data() {
    return {
      video: {},
      last_episode_to_air: '',
      creditsData: {},
      videosData: {},
      imagesScenes: {},
      showModal: false,
      selectedMediaSrc: '',
      selectedMediaAlt: '',
      selectedMediaType: ''
    }
  },
  mounted() {
    this.fetchDatas()
  },
  watch: {
    '$route.params': {
      immediate: true,
      handler() {
        this.fetchDatas()
      }
    }
  },
  methods: {
    async toggleFavorite() {
      const userStore = useUserStore()
      const movieId = this.$route.params.id
      const magicRoute = this.$route.params.magicRoute
      await userStore.toggleFavorite(movieId, magicRoute)
    },

    async fetchSerieOrFilmV2(videoId) {
      try {
        const magicRoute = this.$route.params.magicRoute

        if (magicRoute === 'films') {
          const [response, responseCredits, responseVideos] = await Promise.all([
            requete(`/movie/${videoId}`),
            requete(`/movie/${videoId}/credits`),
            requete(`/movie/${videoId}/videos`)
          ])

          this.video = response.data
          this.creditsData = responseCredits.data
          this.videosData = responseVideos.data
        } else {
          const [response, responseCredits, responseVideos] = await Promise.all([
            requete(`/tv/${videoId}`),
            requete(`/tv/${videoId}/credits`),
            requete(`/tv/${videoId}/videos`)
          ])

          this.video = response.data
          this.creditsData = responseCredits.data
          this.videosData = responseVideos.data
        }

        console.log('creditsData vaut : ', this.creditsData.cast)
        console.log('videosData vaut : ', this.videosData.results)
      } catch (erreur) {
        console.log("Une erreur s'est produite dans la récupération des infos de la video", erreur)
      }
    },

    async fetchDatas() {
      const { magicRoute, id } = this.$route.params
      if (magicRoute && id) {
        await this.fetchSerieOrFilmV2(id)
        await this.fetchBackdrops(id)
      }
    },

    fetchBackdrops(videoId) {
      //TODO: Provisoirement le token est stoké dans les services en attendant le côté serveur pour le stocker et faire des appels !

      const options = {
        method: 'GET',
        headers: {
          accept: 'application/json',
          Authorization: 'Bearer ' + Toktok
        }
      }
      const magicRoute = this.$route.params.magicRoute
      if (magicRoute === 'films') {
        fetch(`https://api.themoviedb.org/3/movie/${videoId}/images`, options)
          .then((response) => response.json())
          .then((data) => {
            this.imagesScenes = data
            console.log(this.imagesScenes)
          })
          .catch((err) => console.error(err))
      } else {
        fetch(`https://api.themoviedb.org/3/tv/${videoId}/images`, options)
          .then((response) => response.json())
          .then((data) => {
            this.imagesScenes = data
            console.log(this.imagesScenes)
          })
          .catch((err) => console.error(err))
      }
    },

    showTrailer() {
      const trailerUrl = this.youtubeVideo()
      if (trailerUrl) {
        this.mediaUrl = trailerUrl
        this.mediaType = 'video'
        this.modalTitle = 'Trailer'
        this.showModal = true
      } else {
        alert('Bande-Annonce non disponible pour cette vidéo')
      }
    },

    getImageUrl(path) {
      return 'https://image.tmdb.org/t/p/original/' + path
    },

    openModal(media) {
      this.selectedMediaSrc = media.mediaSrc
      this.selectedMediaAlt = media.mediaAlt
      this.selectedMediaType = media.mediaType
      this.showModal = true
    },
    openTrailer() {
      console.log('videoData.results :', this.videosData.results)

      const trailer = this.videosData.results.find(
        (video) => video.type === 'Trailer' && video.site === 'YouTube'
      )

      if (trailer) {
        const youtubeUrl = trailer.key
        const embedUrl = `https://www.youtube.com/embed/${youtubeUrl}`
        console.log('Trailer ' + embedUrl)
        this.openModal({
          mediaSrc: embedUrl,
          mediaAlt: 'Trailer Video',
          mediaType: 'video'
        })
      } else {
        alert('Bande-annonce non disponible pour cette vidéo.')
      }
    }
  },

  computed: {
    imageUrl() {
      return this.video.poster_path
        ? `https://image.tmdb.org/t/p/original${this.video.poster_path}`
        : "pas d'image disponible"
    },

    magicRoute() {
      const magicRoute = this.$route.params.magicRoute
      return magicRoute === 'series' ? 'serie' : 'film'
    },

    crewJobs() {
      if (!this.creditsData.crew || !Array.isArray(this.creditsData.crew)) {
        return []
      }

      return this.creditsData.crew.map((member) => {
        switch (member.job) {
          case 'Director':
            return 'Réalisation'
          case 'Novel':
            return 'Adapté du Roman de'
          case 'Screenplay':
            return 'Scénario'
          case 'Producer':
            return 'Producteur'
          case 'Executive Producer':
            return 'Producteur exécutif'
          case 'Writer':
            return 'Scénariste'
          case 'Editor':
            return 'Editeur'
          case 'Director of Photography':
            return 'Directeur visuel'
          case 'Original Music Composer':
            return 'Compositeur de la bande originale'
          case 'Orginal Film Writer':
            return 'Scénariste du film original'
          case 'Co-Director':
            return 'Co-réalisation'
          case 'Associate Editor':
            return 'Editeur associé'
          case 'Co-Executive Producer':
            return 'Producteur exécutif associé'
          case 'Other':
            return 'Autre rôle'
          default:
            return 'Non spécifié'
        }
      })
    }
  }
}
</script>

<style lang=""></style>
