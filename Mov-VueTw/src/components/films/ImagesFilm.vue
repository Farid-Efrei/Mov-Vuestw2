<template>
    <div class="container mx-auto border-b-2 border-green-300 pb-4 ">
        <h2 class=" m-7 text-4xl font-semibold underline">
            Images du Film :
        </h2>
            
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3">
            <div class="mr-2">

                <img src="../../assets/Darkness.jpg" alt="Joaquim Phoenix"
                class="hover:opacity-80 transition ease-in-out duration-150">
                <span class="text-lg">Arthur Fleck / Joker</span>
            </div>
            <div class="mr-2">

                <img src="../../assets/desease.jpg" alt="Joaquim Phoenix"
                class="hover:opacity-80 transition ease-in-out duration-150">
                <span class="text-lg">Arthur Fleck / Joker</span>
            </div>
            <div class="mr-2">
                

                <img src="../../assets/sadness.jpg" alt="Joaquim Phoenix"
                class="hover:opacity-80 transition ease-in-out duration-150">
                <span class="text-lg">Arthur Fleck / Joker</span>
            </div>
            <div class="mr-2">
                

                <img src="../../assets/putonahappyface.jpg" alt="Joaquim Phoenix"
                class="hover:opacity-80 transition ease-in-out duration-150">
                <span class="text-lg">Arthur Fleck / Joker</span>
            </div>
            <div class="mr-2" v-for="image in imagesVideo.backdrops" :key="image.image_id">
                

                <img :src="videoImages(image)" alt="images de la vidéo" class="hover:opacity-80 transition ease-in-out duration-150">
                
                
                <span class="text-lg">Arthur Fleck / Joker</span>
            </div>
            
        </div>       
        
    </div>

</template>


<script>
export default {
    props:{
        imagesVideo:{
            type: Array,
            required:true,
        }
    },
    methods:{
        videoImages(image){
            if(image.file_path){
                return "https://image.tmdb.org/t/p/w300/" + image.file_path
            } else {
                return "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
            }
        }
    }
    
}
</script>
<style lang="">
    
</style>