<template>
    <div class="container flex ">
        <img src="../../assets/ds.jpg" alt="DS Logo" class=" opacity-65 h-24 w-auto" @click="handleClick" @dblclick="handleDoubleClick" >
        
        <ul class="flex mt-7 ">
            <li><router-link to="/" class="ml-5  text-3xl hover:bg-yellow-300 rounded-xl px-7 py-5  hover:text-green-900 hover:text-4xl " >Home</router-link></li>
            <li><router-link :to="{ name: 'films', params : {magicRoute : 'films'}}" class="ml-6 text-3xl hover:bg-yellow-300 rounded-xl px-7 py-6  hover:text-green-900 hover:text-4xl " >Films</router-link></li>
            <li><router-link  to="/series" class="ml-6 text-3xl hover:bg-yellow-300 rounded-xl px-7 py-6  hover:text-green-900 hover:text-4xl ">Séries</router-link></li>
            <li><router-link to="/animations" class="ml-6 text-3xl hover:bg-yellow-300 rounded-xl px-7 py-6  hover:text-green-900 hover:text-4xl hover:border-b-8 border-sky-300" >Animations</router-link></li>
        </ul>

    </div>
</template>

<script>

export default{
    data() {
        return {
            clickTimeout:null,
            films:[],
        }
    },


methods: {
    handleClick(){
        // Annuler le délai si déjà défini
        if (this.clickTimeout){
            clearTimeout(this.clickTimeout);
            this.clickTimeout = null;
        }
        // Définir un nouveau délai :
    this.clickTimeout = setTimeout(() => {
        this.$router.push('/');
        this.clickTimeout = null;
    },300); // délai inférieur à celui du double clic typique.
    },

    handleDoubleClick(){
        clearTimeout(this.clickTimeout);
        this.clickTimeout = null;
        console.log("KORRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRRR");
        this.$router.push('/k-films')
    }
    
    
},

}

</script>

<style lang="scss" scoped>


</style>