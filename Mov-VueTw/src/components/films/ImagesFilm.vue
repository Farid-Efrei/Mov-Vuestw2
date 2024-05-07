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
            <div class="mr-2" v-for="image in imagesVideo" :key="image.id">
                

                <img :src="videoImages(image)" alt="images de la vidéo" class="hover:opacity-80 transition ease-in-out duration-150">
                
                
                <span class="text-lg">Arthur Fleck / Joker</span>
            </div>
            
        </div>
        
    </div>

</template>


<script>
import axios from 'axios';

export default {
    props:{
        imagesVideo:{
            required:true,
        }
    },
    methods:{
        videoImages(image){
            // if(image.file_path){
                return "https://image.tmdb.org/t/p/original/" + image.file_path
            // } else {
            //     return "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
            // }
        },
        fetchImage(){

            const options = {
                method: 'GET',
                headers: {
                    accept: 'application/json',
                    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDRhNjBhODQyOThmNTY0Mjc4OWYzYzMyNmFhYWM4MSIsInN1YiI6IjY1ZmMyNDg5MDQ3MzNmMDE0YWU2NDVkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N2hhb55mlVrjwrMp1hGYCOe0938vWTHKxmZlW4CB1t4'
                }
            };
            
            fetch('https://api.themoviedb.org/3/movie/693134/images?include_image_language=fr&language=fr', options)
            .then(response => response.json())
            .then(response => console.log(response))
            .catch(err => console.error(err));
        }
        },

        axiosImage(){

const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/movie/866398/images',
  params: {include_image_language: '', language: ''},
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDRhNjBhODQyOThmNTY0Mjc4OWYzYzMyNmFhYWM4MSIsInN1YiI6IjY1ZmMyNDg5MDQ3MzNmMDE0YWU2NDVkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N2hhb55mlVrjwrMp1hGYCOe0938vWTHKxmZlW4CB1t4'
  }
};
 try{

     axios
     .request(options)
     .then(function (response) {
         const imagee = response.data
         console.log(imagee);
        })
    } catch(error) {
    console.error(error);
  };




        },
    mounted () {
        //console.log(this.imagesVideo)
      this.axiosImage
        
    },
    
}
</script>


<style lang="">
    
</style>