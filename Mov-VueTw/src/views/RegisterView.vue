<template>
    <div class="flex justify-center items-center min-h-screen sm:px-6 lg:px-8">
        <form @submit.prevent="register" 
        class="w-full max-w-md shadow-md rounded-lg bg-green-800 bg-opacity-45 space-y-8 p-4 border-green-200 border flex-1"
        >
            <h1 class="text-3xl font-extrabold mb-6 text-center text-orange-400">Inscription</h1>
            <div>
                <label for="email"
                class="block text-sm font-bold  text-orange-300">
                    Adresse Email :
                </label>

                <input type="email" class=" mt-1 appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight sm:text-sm focus:border-indigo-500 focus:ring-indigo-500  "
                placeholder="Email" required
                v-model="email">
                {{ email }}
            </div>
            <div class="mb-6">
                <!-- <input type="text" class="text-black"
                 placeholder="Username" v-model="username"> -->
                 <label for="password"
                 class="block font-bold text-sm text-orange-300">
                Password :
                 </label>
                <input type="password" required class="text-black mt-1 shadow appearance-none border rounded-md w-full py-2 px-3 leading-tight sm:text-sm"
                placeholder="Password" v-model="password">
                {{ password }}
            </div>
            <div class="flex items-center justify-center">
                <button 
               type="submit"
                class="flex  justify-center border border-transparent bg-indigo-600 hover:bg-blue-700 font-semibold py-2 px-4 w-full rounded-md focus:ring-offset-2">
                Valider
                </button>
               
            </div>
             <router-link to="/login"
            class="hover:text-orange-400">
                    <p class="my-4 text-sm">Déjà un Compte ? Connecte-toi ici !</p>
                </router-link>
        </form>
        

        <p v-if="error"> {{ error }}</p>
    </div>
</template>
<script>
// import { useFacticeUserStore } from '@/stores/facticeUserStore';
import { useUserStore } from '@/stores/user';

export default {
    data() {
        return {
            email : "",
            //username : "",
            password : "",
            error: null
        };
    },    
    methods : {
        async register() {
            //const userStore = useFacticeUserStore();
            const userStore = useUserStore();
            try {
                await userStore.register({
                    email: this.email,
                    //username: this.username,
                    password: this.password
                });
                this.$router.push({name: 'profile'})
                console.log("ok");
            } catch (error) {
                alert('Inscription échouée')
                this.error = error.message;
            }
        }
    }
}
</script>
<style lang="">
    
</style>