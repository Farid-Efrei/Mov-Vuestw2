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
import { useFacticeUserStore } from './stores/facticeUserStore'
import NavBar from './components/header/navBar.vue'
import SearchBar from './components/header/SearchBar.vue'
export default {
  components: {
    NavBar,
    SearchBar
  },
  created() {
    const userStore = useFacticeUserStore()
    userStore.loadSession()
  }
}
</script>

<style scoped></style>
