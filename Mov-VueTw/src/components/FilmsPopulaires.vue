<template>
    <div>
    <h2 class="uppercase  text-3xl font-semibold mt-6 ml-3 text-yellow-500 underline m-6">
        Films Populaires en ce moment !!!
    </h2>
    
    <div class="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
        <FilmItems/>
        <FilmItems/>
        <FilmItems/>
        <FilmItems/>
        <FilmItems/>
        <FilmItems/>
        <FilmItems/>
        <FilmItems/>
        <FilmItems/>
       
    </div>
    
    </div>
</template>

<script>
import FilmItems from '@/components/items/FilmItems.vue';
export default{
    components: {
        FilmItems
    }
}

</script>

<style lang="scss" scoped>
.poster{
    
}


</style>