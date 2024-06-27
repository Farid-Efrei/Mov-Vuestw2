<template>
  <div class="flex justify-center items-center min-h-screen sm:px-6 lg:px-8">
    <form
      @submit.prevent="register"
      class="w-full max-w-md shadow-md rounded-lg bg-green-800 bg-opacity-45 space-y-8 p-4 border-green-200 border flex-1"
    >
      <h1 class="text-3xl font-extrabold mb-6 text-center text-orange-400">Inscription</h1>
      <div>
        <label for="email" class="block text-sm font-bold text-orange-300"> Adresse Email : </label>

        <input
          type="email"
          class="mt-1 appearance-none border rounded-md w-full py-2 px-3 text-gray-700 leading-tight sm:text-sm focus:border-indigo-500 focus:ring-indigo-500"
          placeholder="Email"
          required
          v-model="email"
        />
        {{ email }}
      </div>
      <div class="mb-6">
        <label for="password" class="block font-bold text-sm text-orange-300"> Password : </label>
        <input
          type="password"
          required
          class="text-black mt-1 shadow appearance-none border rounded-md w-full py-2 px-3 leading-tight sm:text-sm"
          placeholder="Password"
          v-model="password"
        />
        {{ password }}
      </div>
      <div>
        <label for="confirmPassword" class="block font-bold text-sm text-orange-300">
          Confirmez le Password :
        </label>
        <input
          type="password"
          required
          class="text-black mt-1 shadow appearance-none border rounded-md w-full py-2 px-3 leading-tight sm:text-sm"
          placeholder="Confirmez le Password"
          v-model="confirmPassword"
        />
      </div>
      <div class="flex items-center justify-center">
        <button
          type="submit"
          class="flex justify-center border border-transparent bg-indigo-600 hover:bg-blue-700 font-semibold py-2 px-4 w-full rounded-md focus:ring-offset-2"
        >
          Valider
        </button>
      </div>
      <router-link to="/login" class="hover:text-orange-400">
        <p class="my-4 text-sm">Déjà un Compte ? Connecte-toi ici !</p>
      </router-link>
      <p v-if="error" class="text-red-500 text-center text-lg">{{ error }}</p>
    </form>
    <!-- <div>
      <button @click="notify">Notify !</button>
    </div> -->
  </div>
</template>
<script>
import { useUserStore } from '@/stores/user'
import { toast } from 'vue3-toastify'

export default {
  data() {
    return {
      email: '',
      //username : "",
      password: '',
      confirmPassword: '',
      error: null
    }
  },
  methods: {
    async register() {
      const userStore = useUserStore()
      if (this.password !== this.confirmPassword) {
        this.error = 'Les mots de passe ne correspondent pas.'
        return
      }
      try {
        await userStore.register({
          email: this.email,
          //username: this.username,
          password: this.password
        })
        toast.success('Inscription réussie. Veuillez maintenant vous connecter.', {
          autoClose: 3000,
          position: toast.POSITION.TOP_RIGHT
        })
        // alert('enregistrement ok')
        this.$router.push({ name: 'login' })
        console.log('ok')
      } catch (error) {
        // alert('Inscription échouée')
        this.error = error.response?.data.message || error.message
        toast.error(this.error)
      }
    },
    notify() {
      toast.error('Test de Toast !', {
        autoClose: 1000,
        position: toast.POSITION.BOTTOM_RIGHT
      })
    }
  }
}
</script>
<style lang=""></style>
