<script>
import CastFilm from '@/components/films/CastFilm.vue'
import ImagesFilm from '@/components/films/ImagesFilm.vue'
import requete from '../../service/api'

// eslint-disable-next-line no-undef
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
      const movieId = this.$route.params.id // Supposons que l'ID de la vidéo est passé dans l'URL
      await userStore.toggleFavorite(movieId, this.magicRoute)
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
      // return this.$route.params.magicRoute;

      const magicRoute = this.$route.params.magicRoute
      if (magicRoute === 'series') {
        return true
      } else {
        return false
      }
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
