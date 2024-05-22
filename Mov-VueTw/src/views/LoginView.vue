<template>
    <div class="min-h-screen flex items-center justify-center sm:px-6 lg:px-8">
        <div class="max-w-md w-full space-y-8 border p-4 rounded-lg bg-green-800 bg-opacity-45 border-green-200">
            <div>
                <h1 class="mt-6 text-center text-3xl font-extrabold text-orange-400">Connexion</h1>
            </div>

            <form @submit.prevent="login" 
            class="mt-8 space-y-6">
            <div>
                <label for="email" class="block text-sm font-medium text-orange-300">Adresse Email :
                </label>

                <input type="email" required placeholder="Email"
                v-model="email"
                class="mt-1 focus:border-indigo-500 focus:ring-indigo-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md p-2 text-black">
            </div>
            <div class="mb-6">
                <label for="password"
                class="block text-sm font-medium text-orange-300">
                Password :
                </label>
                <input type="password" required placeholder="Password"
                v-model="password"
                class="mt-1 focus:ring-yellow-300 focus:border-yellow-300 text-black p-2 w-full shadow-sm sm:text-sm rounded-md border-yellow-300">
            </div>
            <div>

                <button type="submit"
                class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
                Connexion
            </button>
            <router-link to="/forgot-password" class="hover:text-orange-400" >
                <!-- // TODO:composant mot de passe oublié à gérer !!! -->
                <p class="text-sm my-4"> Mot de passe oublié ? </p>
            </router-link>
            
        </div>
        </form>
        <p v-if="error" 
        class="text-red-500 text-center"
        >
            {{ error }}
        </p>
        
    </div>
    </div>
</template>

<script>
import {useFacticeUserStore} from '@/stores/facticeUserStore'
import { useRouter } from 'vue-router';

export default {
    data() {
        return {
            email : '',
            password : '',
            error: null
        };
    },
    methods : {
        async login() {
            const userStore = useFacticeUserStore();
            try {
                await userStore.login({
                    email : this.email,
                    password : this.password
                });
                this.$router.push({name:'profile'});
                console.log(this.email, this.password);
            } catch (error) {
                alert('Identifiants de connexion invalides');
                this.error = error.message;
            }
        }
    },
    setup(){
        const userStore = useFacticeUserStore();
        const router = useRouter();
        return{userStore, router}
    }
}
</script>
<style lang="">
    
</style>