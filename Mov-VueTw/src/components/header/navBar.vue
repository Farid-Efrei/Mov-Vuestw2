<template>
  <div class="container flex">
    <div class="flex justify-between items-center py-auto">
      <div>
        <img
          src="../../assets/ds.jpg"
          alt="DS Logo"
          class="opacity-65 h-24 w-auto"
          @click="handleClick"
          @dblclick="handleDoubleClick"
        />
        <button @click="toggleMenu" class="ml-6 md:hidden">
          <svg class="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M4 6h16M4 12h16m-16 6h16"
            ></path>
          </svg>
        </button>
      </div>
      <ul
        :class="{ hidden: !menuOpen, flex: menuOpen }"
        class="md:flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-6 md:mt-0"
      >
        <li>
          <router-link
            to="/"
            class="ml-6 md:text-3xl text-xl md:hover:bg-yellow-300 rounded-xl px-7 py-5 hover:text-green-900 md:hover:text-4xl hover:text-2xl"
            >Home</router-link
          >
        </li>
        <li>
          <router-link
            :to="{ name: 'films', params: { magicRoute: 'films' } }"
            class="ml-6 md:text-3xl text-xl md:hover:bg-yellow-300 rounded-xl px-7 py-5 hover:text-green-900 md:hover:text-4xl hover:text-2xl"
            >Films</router-link
          >
        </li>
        <li>
          <router-link
            to="/series"
            class="ml-6 md:text-3xl text-xl md:hover:bg-yellow-300 rounded-xl px-7 py-5 hover:text-green-900 md:hover:text-4xl hover:text-2xl md:hover:rounded-lg"
            >Séries</router-link
          >
        </li>
        <li>
          <router-link
            to="/animations"
            class="ml-6 md:text-3xl text-xl md:hover:bg-yellow-300 rounded-xl px-7 py-5 hover:text-green-900 md:hover:text-4xl hover:text-2xl"
            >Animations</router-link
          >
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      clickTimeout: null,
      films: [],
      menuOpen: false // Contrôle l'état du menu burger.
    }
  },

  methods: {
    toggleMenu() {
      this.menuOpen = !this.menuOpen
      console.log('menu ouvert')
    },
    handleClick() {
      // Annuler le délai si déjà défini
      if (this.clickTimeout) {
        clearTimeout(this.clickTimeout)
        this.clickTimeout = null
      }
      // Définir un nouveau délai :
      this.clickTimeout = setTimeout(() => {
        this.$router.push('/')
        this.clickTimeout = null
      }, 300) // délai inférieur à celui du double clic typique.
    },

    handleDoubleClick() {
      clearTimeout(this.clickTimeout)
      this.clickTimeout = null
      console.log('KORRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR')
      this.$router.push('/k-films')
    }
  }
}
</script>

<style lang="scss" scoped></style>
