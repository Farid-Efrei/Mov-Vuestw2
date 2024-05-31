<template>
    <div class="flex justify-center items-center min-h-screen">
        <form @submit.prevent="submitEmail" 
        class="w-full max-w-lg p-8 space-y-6 rounded-lg shadow-lg border border-green-200">
            <h2 class="text-2xl font-bold text-center text-orange-400">
                Réinitialisation du mot de passe :
            </h2>
            <div>
                <label for="email" class="block text-sm font-medium text-orange-400">
                    Adresse Email :
                </label>

                <input type="email" 
                placeholder="Votre email"
                v-model="email" required
                class="mt-1 w-full px-3 py-2 border border-yellow-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
                >
            </div>
            <div class="flex items-center justify-center">

                <button type="submit"
                class="w-full bg-indigo-600 rounded-md text-white font-medium text-sm px-4 py-2 hover:bg-indigo-700 focus:outline-none focus:ring-indigo-500 focus:ring-2 focus:ring-offset-2 ">
                    Envoyer le lien de réinitialisation
                </button>
            </div>
            <p v-if="message" :class="{'text-red-500' : isError, 'text-green-200' : !isError}"
            class="text-center text-sm font-medium">
                {{ message }}
            </p>
        </form>
    </div>
</template>

<script>
import { useFacticeUserStore } from '@/stores/facticeUserStore';

export default {
    name: 'forgotPassword',
    data() {
        return {
            email:'',
            message:'',
            isError:false
        };
    },
    methods: {
        async submitEmail(){
            const userStore = useFacticeUserStore();
            try {
                await userStore.forgotPassword(this.email);
                this.message = "Un email de réinitialisation a été envoyé. Veuillez vérifier votre boîte de réception.";
                this.isError = false;
            } catch (error) {
                this.message = error.message;
                this.isError = true;
            }
        }
    },

}
</script>


<style lang="">

</style>