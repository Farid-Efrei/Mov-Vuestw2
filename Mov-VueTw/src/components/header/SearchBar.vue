<template>
    <div class="mt-3 size-fit  flex relative" >
        <input 
            type="text" 
            placeholder="Rechercher un Film, un acteur,une série..."
            class="rounded-full bg-green-800 focus:shadow w-96 pl-7"
            @input="debouncingSearch"
            >
            <div class="absolute top-5 ">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" class="w-7 h-7 text-yellow-200 ">
                    <path strokeLinecap="round" strokeLinejoin="round" d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z" />
                </svg>
            </div>

            <div v-if="searchResult" class="absolute mt-16 ml-3 bg-green-800 rounded w-72">
                <ul class="mt-3">
                    <li 
                    v-for="(multi, index) in searchResult" :key="index"
                    class="flex items-center border-b-2 border-yellow-300 p-1"
                    >
                        <img 
                            src="" 
                            alt=""
                            class="w-28 p-1">
                            <span class="font-serif text-lg text-center">
                                {{multi.title}}
                            </span>
                    </li>
                   
                </ul>
            </div>


        <img src="../../assets/Goku-Dragon.webp" alt="avatar de profil" class="size-16 rounded-full mr-1 ml-12">
    </div>
</template>

<script>
import requete from '../../service/api';

export default{

    data(){
        return{

            searchResult : [],
        }
    },
    
    methods: {
        // pour optimiser les perf en ne déclenchant la rech que lorsque l'user a terminé de saisir (réduit dc le nb de req ou traitements inutiles), on utilise le débouncing search.(en mettant un tps avant de rech pr éviter les rech à cq saisie).
        debouncingSearch(event){
            clearTimeout(this.debounce)
            this.debounce = setTimeout(() => {
                this.fetchSearch(event.target.value);

            }, 600)
        },

        async fetchSearch(term){
            try{

                const response = await requete("/search/movie?query=" + term);
                this.searchResult = response.data.results;
                console.log(this.searchResult);
            }catch(error){
                console.log(error);
            }
        }
    }
}

</script>

<style lang="scss" scoped>


</style>