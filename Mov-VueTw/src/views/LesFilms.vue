<template>
    <div>
        <h1 class=" uppercase text-center font-semibold  text-yellow-500 text-3xl underline m-16 animate-pulse">Section Films</h1>
        <div class="grid grid-cols-1 sm:grid-cols-3 md: grid-cols-4
        lg:grid-cols-5 gap-8">
        <!-- <FilmItems /> -->

        </div>
    </div>
</template>
<script>

import FilmItems from '@/components/items/FilmItems.vue';

export default {
    components: {
        FilmItems
    },
    data() {
        return {
            films:[]
        }
    }
    
}
</script>
<style lang="">
    
</style>