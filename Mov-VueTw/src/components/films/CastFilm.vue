<template>
    <div class="container mx-auto border-b-2 border-green-300 pb-4 ">
        <h2 class=" m-7 text-4xl font-semibold underline">
            Casting :
        </h2>
            
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 ">
            <div class="mr-2" v-for="(person,index) in casting" :key="index" >

                <img :src="this.getCastingProfilImage(person)" :alt="person.name"
                class="hover:opacity-80 transition ease-in-out duration-150" >
                <span class="text-lg"> Acteur : {{ person.name }} /  {{person.character}}</span>
            </div>
            <!-- <div class="mr-2">

                <img src="../../assets/JP.webp" alt="Joaquim Phoenix"
                class="hover:opacity-80 transition ease-in-out duration-150">
                <span class="text-lg">Arthur Fleck / Joker</span>
            </div>
            <div class="mr-2">
                

                <img src="../../assets/JP.webp" alt="Joaquim Phoenix" class="hover:opacity-80 transition ease-in-out duration-150">
                
                <span class="text-lg">Arthur Fleck / Joker</span>
            </div> -->
            <!-- <div class="mr-2"> -->
                

                <!-- <img src="../../assets/JP.webp" alt="Joaquim Phoenix"
                class="hover:opacity-80 transition ease-in-out duration-150">
                <span class="text-lg">Arthur Fleck / Joker</span>
            </div>
            <div class="mr-2">
                

                <img src="../../assets/JP.webp" alt="Joaquim Phoenix"
                class="hover:opacity-80 transition ease-in-out duration-150">
                <span class="text-lg">Arthur Fleck / Joker</span>
            </div> -->
            
        </div>
    
        
        
    </div>

                
        
    
</template>


<script>
export default {
    props:{
        casting: {
            type: Array,
            required: true,
        }
    },
    mounted() {
        
    },
    data(){
        return{
        
        }
    },

    methods: {
        getCastingProfilImage(person){
            if(person.profile_path){
                return "https://image.tmdb.org/t/p/original" + person.profile_path;
            } else {
                return "https://static.vecteezy.com/system/resources/previews/005/337/799/original/icon-image-not-found-free-vector.jpg"
                
            }
        }, 
        
    }
    
}
</script>
<style lang="">
    
</style>