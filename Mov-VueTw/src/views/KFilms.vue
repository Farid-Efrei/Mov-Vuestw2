<template>
  <div>
    <h1
      class="uppercase text-center font-semibold text-yellow-500 text-3xl underline m-16 animate-pulse"
    >
      Section Films Coréens
    </h1>
    <div class="grid sm:grid-cols-3 md: grid-cols-4 lg:grid-cols-5 gap-8">
      <FilmItems
        class="text-pretty text-center text-lg"
        v-for="kfilm in kfilms"
        :key="kfilm.id"
        :video="kfilm"
        :genres="genres"
      />
    </div>
    <div class="flex py-8 px-8 justify-around">
      <button
        @click="prevPage"
        @disabled="currentPage <= 1"
        :class="{ 'opacity-50 cursor-not-allowed': currentPage <= 1 }"
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-l"
      >
        Précédent
      </button>
      <span class="font-bold text-xl">{{ currentPage }}</span>
      <button
        @click="nextPage"
        :disabled="currentPage >= totalPages"
        :class="{ 'opacity-50 cursor-not-allowed': currentPage >= totalPages }"
        class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded-r"
      >
        Suivant
      </button>
    </div>
  </div>
</template>
<script>
import FilmItems from '@/components/items/FilmItems.vue'
import requete from '@/service/api'

export default {
  name: 'k-films',
  components: {
    FilmItems
  },
  props: {
    magicRoute: String
  },
  data() {
    return {
      kfilms: [],
      genre: [],
      currentPage: 1,
      totalPages: null
    }
  },
  mounted() {
    // l'ordre a une importance !!!
    this.fetchGenres()
    this.popKorMovie()
  },
  methods: {
    async popKorMovie() {
      try {
        const response = await requete.get('/discover/movie', {
          params: {
            // sort_by: 'release_date.desc',
            // language: 'ko', // Langue coréenne
            region: 'KR', // Région Corée du Sud ,
            include_adult: 'false',
            include_video: 'false',
            page: this.currentPage,
            sort_by: 'primary_release_date.desc',
            with_original_language: 'ko'
          }
        })
        this.kfilms = response.data.results
        this.totalPages = response.data.total_pages
      } catch (error) {
        console.error('echec de la récupération de la liste des films populaires ', error)
      }
    },
    async fetchGenres() {
      try {
        const response = await requete.get('/genre/movie/list')
        this.genres = response.data.genres
      } catch (error) {
        console.error('Échec de la récupération des genres de films', error)
      }
    },
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++
        this.popKorMovie()
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--
        this.popKorMovie()
      }
    }
  }
}
</script>
<style lang=""></style>
