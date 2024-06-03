<template>
  <div class="container mx-auto my-10 p-5 bg-yellow-200 rounded-lg shadow-md text-black">
    <div class="flex flex-col items-center">
      <h1 class="text-2xl font-bold mb-5">Profil Utilisateur de {{ profile.nom }}</h1>
      <div v-if="profile" class="w-full max-w-3xl bg-green-300 rounded-lg shadow-md p-6">
        <div class="mb-6">
          <h2 class="text-xl font-semibold underline">Informations de base :</h2>
          <p class="mt-2"><strong>Email :</strong> {{ profile.email }}</p>
          <p class="mt-2"><strong>Username :</strong> {{ profile.nom }}</p>
        </div>

        <div class="mb-6">
          <h2 class="text-xl font-semibold">Favoris :</h2>
          <ul class="list-disc list-inside mt-2">
            <li v-for="favorite in favorites" :key="favorite.id">{{ favorite.Video.titre }}</li>
          </ul>
        </div>

        <div class="mb-6">
          <h2 class="text-xl font-semibold">Commentaires :</h2>
          <ul class="list-disc list-inside mt-2">
            <li v-for="comment in userComments" :key="comment.id">
              {{ comment.content }} sur <strong>{{ comment.movieTitle }}</strong>
            </li>
          </ul>
        </div>
        <div class="mb-6">
          <h2 class="text-xl font-semibold">Notes :</h2>
          <ul class="list-disc list-inside mt-2">
            <li v-for="rating in userRatings" :key="rating.id">
              {{ rating.rating }} étoiles pour <strong>{{ rating.movieTitle }}</strong>
            </li>
          </ul>
        </div>

        <button
          @click="toggleEditProfile"
          class="w-full bg-orange-400 px-4 py-2 rounded-md mb-4 hover:bg-orange-600"
        >
          Editer Profil
        </button>

        <transition name="fade">
          <div v-show="showEditProfile">
            <div class="mb-6">
              <h2 class="text-xl font-semibold">Mise à Jour du Profil :</h2>
              <form @submit.prevent="updateProfile" class="mt-4 space-y-4">
                <label for="email">Adresse Email : </label>
                <input
                  type="email"
                  placeholder="Email"
                  v-model="profile.email"
                  class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200"
                />
                <label for="email">Username : </label>
                <input
                  type="text"
                  placeholder="Username"
                  v-model="profile.username"
                  class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200"
                />
                <button
                  type="submit"
                  class="w-full px-4 py-2 bg-orange-400 hover:bg-orange-500 rounded-md"
                >
                  Mettre A jour le Profil
                </button>
              </form>
            </div>
            <div class="mb-6">
              <h2 class="text-xl font-semibold">Changer Password :</h2>
              <form @submit.prevent="changePassword" class="mt-4 space-y-4">
                <input
                  type="password"
                  placeholder="Ancien Password"
                  v-model="password.oldPassword"
                  class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200"
                />
                <input
                  type="password"
                  placeholder="Nouveau Password"
                  v-model="password.newPassword"
                  class="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-orange-200"
                />
                <button type="submit" class="w-full px-4 py-2 bg-orange-400 hover:bg-orange-500">
                  Changer Password
                </button>
              </form>
            </div>

            <button
              @click="deleteAccount"
              class="w-full bg-red-600 px-4 py-2 text-white rounded-md hover:bg-red-700"
            >
              Supprimer le compte
            </button>
          </div></transition
        >
      </div>
    </div>
  </div>
</template>
<script>
import { useUserStore } from '@/stores/user'

// import { useFacticeUserStore } from '@/stores/facticeUserStore'

export default {
  data() {
    return {
      profile: {},
      favorites: {},
      comments: {},
      ratings: {},
      password: {
        oldPassword: '',
        newPassword: ''
      },
      showEditProfile: false
    }
  },

  methods: {
    async updateProfile() {
      // const userStore = useFacticeUserStore()
      // await userStore.updateProfile(this.profile)
    },
    async changePassword() {
      // Pour simuler, pas besoin de réelle action.
      console.log('Password changend', this.password)
    },
    async deleteAccount() {
      // const userStore = useFacticeUserStore()
      // await userStore.deleteAccount()
      // alert('compte supprimé')
      // this.$router.push({ name: 'home' })
    },
    toggleEditProfile() {
      this.showEditProfile = !this.showEditProfile
    }
  },

  async mounted() {
    // const userStore = useFacticeUserStore()
    const userStore = useUserStore()
    // await userStore.fetchProfile()
    await userStore.fetchFavorites()
    // await userStore.fetchComments() // Passer les paramètres appropriés si nécessaire
    // await userStore.fetchRatings() // Passer les paramètres appropriés si nécessaire
    this.profile = userStore.userProfile
    console.log('Profil chargé: ' + this.profile)
    this.favorites = await userStore.fetchFavorites() //
    console.log('favoris : ', this.favorites)
    // this.comments = userStore.userComments
    // this.ratings = userStore.userRatings
  }
}
</script>
<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
