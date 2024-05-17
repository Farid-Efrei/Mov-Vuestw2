<template>
    <div class="container flex ">
        <router-link to="/" ><img src="../../assets/ds.jpg" alt="DS Logo" class=" opacity-65 h-24 w-auto">
        </router-link>
        <ul class="flex mt-7 ">
            <li><router-link to="/" class="ml-5  text-3xl hover:bg-yellow-300 rounded-xl px-7 py-5  hover:text-green-900 hover:text-4xl " >Home</router-link></li>
            <li><router-link :to="{ name: 'films', params : {magicRoute : 'films'}}" class="ml-6 text-3xl hover:bg-yellow-300 rounded-xl px-7 py-6  hover:text-green-900 hover:text-4xl " >Films</router-link></li>
            <li><router-link  to="/series" class="ml-6 text-3xl hover:bg-yellow-300 rounded-xl px-7 py-6  hover:text-green-900 hover:text-4xl ">Séries</router-link></li>
            <li><router-link to="/animations" class="ml-6 text-3xl hover:bg-yellow-300 rounded-xl px-7 py-6  hover:text-green-900 hover:text-4xl hover:border-b-8 border-sky-300" >Animations</router-link></li>
        </ul>

    </div>
</template>

<script setup>

</script>

<style lang="scss" scoped>


</style>