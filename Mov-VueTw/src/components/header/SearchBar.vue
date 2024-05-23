<template>

  <div class="mt-5 size-fit flex relative z-50"
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
        <router-link :to="getDetailsRoute(multi)" class="">
          
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

    <div class="relative flex items-center">

            
      <img
      src="../../assets/Goku-Dragon.webp"
      alt="avatar de profil"
      class="size-16 rounded-full mr-5 ml-12 cursor-pointer"
      @click="toggleMenu"
      />
<!-- gestion de l'état de connexion avec petite bille verte pour co et rouge pour déco -->
      <span class="w-3 h-3 rounded-full absolute right-0 mr-2 mt-10 animate-pulse"
      :class="{'bg-green-500':- isAuthenticated, 'bg-red-500': !isAuthenticated}"
      > 
      </span>
    </div>
      <div v-if="showMenu"
      class="absolute right-0 bg-white rounded shadow-lg py-2 w-48 mt-16"
      >
        <div v-if="isAuthenticated">
          <router-link to="/profile"
          class="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">
          <span class="flex items-center">
            <span class="mr-2">Profil</span>
            <span class="w-2 h-2 bg-green-500 rounded-full"></span>
          </span>
        </router-link>
        <button @click="logout"
        class="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100">
          Déconnexion
        </button>
        </div>
        <div v-else>
          <router-link to="/login"
          class="block w-full text-left px-4 py-2 text-gray-800 hover:bg-gray-100" >
            Connexion
          </router-link>
        </div>

      </div>
    </div>
  
</template>

<script>
import requete from '../../service/api'
import { useFacticeUserStore } from '@/stores/facticeUserStore'


export default {
  data() {
    return {
      searchResult: [],
      noResultFound: false,
      searchTerm: "",

      showSearchResults:false,
      showMenu: false,

    }
  },

  computed: {
    userStore() {
      return useFacticeUserStore();
    },
    isAuthenticated() {
      return this.userStore.currentUser !== null;
    },
    userProfilePicture() {
      return this.userStore.userProfilePicture || ('../../assets/Goku-Dragon.webp');
    },
  },
  // setup() {
  //   const userStore = useFacticeUserStore();
  //   const isAuthenticated = computed(() => userStore.currentUser !== null);
  //   const userProfilePicture = computed(() => userStore.userProfilePicture || '../../assets/Goku-Dragon.webp');

  //   return {
  //     isAuthenticated,
  //     userProfilePicture,
  //     userStore,
  //   };
  // },

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
      

    },

    toggleMenu(){
      this.showMenu = !this.showMenu;
    },
    logout(){
      const userStore = useFacticeUserStore();
      userStore.logout();
      this.$router.push({name:'home'});
    },
  },
};
</script>

<style lang="scss" scoped></style>
