<template>
  <div>
    <div
      class="container mx-auto flex justify-between bg-green-400 h-15 border-4 border-yellow-200"
    >
      <NavBar />
    </div>

    <RouterView v-slot="{ Component }">
      <transition name="fade" mode="out-in">
        <component :is="Component" />
      </transition>
    </RouterView>
  </div>
</template>
<script>
// import { useFacticeUserStore } from './stores/facticeUserStore'
import NavBar from './components/header/navBar.vue'
import SearchBar from './components/header/SearchBar.vue'
import { useUserStore } from './stores/user'
export default {
  components: {
    NavBar,
    SearchBar
  },
  async created() {
    const userStore = useUserStore()
    if (userStore.isAuthenticated) {
      try {
        await userStore.fetchUserFavorites()
        console.log('chargement User Fav')
      } catch (error) {
        console.error('Erreur lors du chargement des favoris', error)
      }
    }
  },
  //   const userStore = useFacticeUserStore()
  //   userStore.loadSession()
  // }
  // Dans votre composant principal ou dans votre point d'entrée de l'application (main.js ou App.vue)
  mounted() {
    // const userStore = useUserStore()
    // userStore.initializeAuthState()
  }
}
</script>

<style scoped></style>
