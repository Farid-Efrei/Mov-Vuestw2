<template>
  <div class="mt-5 size-fit flex relative"
  @click.stop>
    <input
      type="text"
      placeholder="Rechercher un Film, une série..."
      class="rounded-full bg-green-800 focus:shadow w-96 pl-7"
      @input="debouncingSearch"
      v-model="searchTerm"
      @blur="handleBlur"
      
    />

    <div class="absolute top-5">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth="{1.5}"
        stroke="currentColor"
        class="w-7 h-7 text-yellow-200"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
        />
      </svg>
    </div>

    <div 
    class="absolute mt-16 ml-3 bg-green-800 rounded w-9/12"
    v-if="showSearchResults"
    @mousedown="prevent"
    >
      <ul class="mt-3" v-if="searchResult.length !==0">
        <li
          v-for="(multi, index) in searchResult"
          :key="index"
          class="flex items-center border-b-2 border-yellow-300 p-1"
        >
        <!-- <RouterLink :to="{name:'filmDetails', params: {id:multi.id, magicRoute:multi.media_type}}"> -->
        <router-link :to="getDetailsRoute(multi)">
          
          <img
          :src="videoImages(multi.poster_path)"
          :alt="multi.title || multi.original_name"
          class="w-28 p-1"
          />
          <span class="font-serif text-lg text-center">
            {{ multi.title || multi.original_name }}
          </span>
        </router-link>
        </li>
      </ul>
      <!-- si pas pas de résultat : -->
      <ul class="px-3">
        <li v-if="noResultFound">no result found for {{ searchTerm }}</li>
      </ul>
    </div>

    <img
      src="../../assets/Goku-Dragon.webp"
      alt="avatar de profil"
      class="size-16 rounded-full mr-1 ml-12"
    />
  </div>
</template>

<script>
import requete from '../../service/api'

export default {
  data() {
    return {
      searchResult: [],
      noResultFound: false,
      searchTerm: "",
      showSearchResults:false,
    }
  },

  methods: {
    // pour optimiser les perf en ne déclenchant la rech que lorsque l'user a terminé de saisir (réduit dc le nb de req ou traitements inutiles), on utilise le débouncing search.(en mettant un tps avant de rech pr éviter les rech à cq saisie).
    debouncingSearch(event) {
      clearTimeout(this.debounce)
      this.debounce = setTimeout(() => {
        //on veut que la recherche se lance à partir de 3 caractères:
        if (event.target.value.length > 2) {
          this.fetchSearch(event.target.value)
          this.showSearchResults = true
        } else {
          this.searchResult = []
          this.noResultFound = false
          this.showSearchResults = false
        }
      }, 600)
    },

    async fetchSearch(term) {
      try {
        const response = await requete('/search/multi?query=' + term)
        this.searchResult = response.data.results
        // noResultFound est faux de base car retourne aucun result, si searchResult est ok alors il devient true, sinon false.
        //this.noResultFound = response.data.results ? true : false
        this.noResultFound = response.data.results.length === 0
        //console.log(this.searchResult)
      } catch (error) {
        console.log(error)
      }
    },

    videoImages(poster_path) {
      if (poster_path) {
        console.log(poster_path)
        return 'https://image.tmdb.org/t/p/original/' + poster_path
      } else {
        console.log(poster_path)
        return 'https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg'
      }
    },
    closeSearch() {
      this.showSearchResults = false
    },

    handleBlur() {
      setTimeout(() => {
        this.closeSearch()
      }, 300)
    },
    getDetailsRoute(multi) {
      const mediaType = multi.media_type;
      const id = multi.id;
      console.log(mediaType)

      if (mediaType === 'tv') {
        return {name: 'filmDetails', params: {magicRoute: 'series', id } }
        } else if (mediaType === 'movie') {
        return {name:'filmDetails', params: {magicRoute:'films', id}}
        } else {
        // pour gérer les futurs autres videos ou documentaires
        return {name:'filmDetails', params:{magicRoute:'other', id}}
      }
      
    }
  }
}
</script>

<style lang="scss" scoped></style>
