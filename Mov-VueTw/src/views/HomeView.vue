<template>

  <div>
    <div class="container mx-auto flex justify-between bg-green-400 h-15 border-4 border-yellow-200">
      <NavBar/>
      <SearchBar/>
    
    
    </div>
    <films-populaires/>
  </div>
</template>

<script>
import FilmsPopulaires from '../components/FilmsPopulaires.vue'
import FilmsPopulairesVue from '../components/FilmsPopulaires.vue'
 import NavBar from '../components/header/NavBar.vue'
 import SearchBar from '../components/header/SearchBar.vue'

export default{
  
  components:{
    NavBar, 
    SearchBar,
    FilmsPopulaires,
  },

}

</script>

<style lang="scss" scoped>


</style>
