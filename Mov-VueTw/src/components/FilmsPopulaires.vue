<template>
    <div>
    <h2 class="uppercase  text-lg font-semibold mt-6 ml-3 text-yellow-500">
        Films Populaires en ce moment !!!
    </h2>
    
    <div class="grid grid-cols-1 sm:grid-cols-3 md:cols-4 lg:cols-5">
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