<template>
    <div class="">
        <img :src="imageUrl" :alt=" video.title || video.name "
            class="hover:opacity-80 transition ease-in-out duration-150">

        <h2 class="text-xl">{{ video.title || video.name }} </h2>
        <div class="flex">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor"
                class="w-6 h-6 text-yellow-400 ml-2">
                <path fill-rule="evenodd"
                    d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                    clip-rule="evenodd" />
            </svg>
            <span class="ml-2 text-lg">Note | Anne de sortie </span><br>
        </div>
        <span class="text-lg text-gray-400">Genres (Science Fiction, Thriller, Drama )</span>
    </div>
</template>
<script>

export default {
    props: {
        video: {
            required: true,
        },
    }, 
    computed:{
        imageUrl(){
            return 'https://image.tmdb.org/t/p/original/'+ this.video.poster_path
        }, 
        
    },
    } 
</script>
<style lang="">

</style>