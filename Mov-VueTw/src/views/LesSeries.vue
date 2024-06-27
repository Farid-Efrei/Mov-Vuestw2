<template>
  <div>
    <h1
      class="uppercase text-3xl font-semibold text-yellow-500 underline m-16 animate-pulse text-center"
    >
      Section Séries
    </h1>
    <div class="grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
      <FilmItems
        class="text-center"
        v-for="serie in series"
        :key="serie.id"
        :video="serie"
        :genres="genres"
      />
    </div>
  </div>
</template>
<script>
import FilmItems from '@/components/items/FilmItems.vue'
import requete from '@/service/api'
export default {
  components: {
    FilmItems
  },
  data() {
    return {
      series: [],
      genres: []
    }
  },

  mounted() {
    this.fetchGenres()
    this.getPopSeries()
  },

  methods: {
    async getPopSeries() {
      try {
        // const seriesResponse = await requete.get('/tv/on_the_air');
        const seriesResponse = await requete.get('/tv/top_rated')
        // const seriesResponse = await requete.get('/tv/popular');
        this.series = seriesResponse.data.results
      } catch (error) {
        console.error('Problème lors de la récupération  de la liste des séries populaire', error)
      }
    },
    async fetchGenres() {
      try {
        const response = await requete.get('/genre/tv/list')
        this.genres = response.data.genres
      } catch (error) {
        console.error('Échec de la récupération des genres de films', error)
      }
    }
  }
}
</script>

<style></style>
