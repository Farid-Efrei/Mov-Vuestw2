<template>
  <div class="container mx-auto my-10 p-5 bg-yellow-200 rounded-lg shadow-md text-black">
    <div class="flex flex-col items-center">
      <h1 class="text-2xl font-bold mb-5">Profil Utilisateur de {{ this.profile.nom }}</h1>
      <div v-if="profile" class="w-full max-w-3xl bg-green-300 rounded-lg shadow-md p-6">
        <div class="mb-6">
          <h2 class="text-xl font-semibold underline">Informations de base :</h2>
          <p class="mt-2"><strong>Email :</strong> {{ this.profile.email }}</p>
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
          <ul
            class="list-disc list-inside mt-1"
            v-for="appreciation in appreciations"
            :key="appreciation.id"
          >
            <li v-if="isNotEmptyComment(appreciation.commentaire)">
              <span>
                "{{ appreciation.commentaire }}" sur <strong>{{ appreciation.Video.titre }}</strong>
                <span> le {{ formatDate(appreciation.updatedAt) }}</span>
              </span>
            </li>
          </ul>
        </div>
        <div class="mb-6">
          <h2 class="text-xl font-semibold">Notes :</h2>
          <ul
            class="list-disc list-inside mt-1"
            v-for="appreciation in appreciations"
            :key="appreciation.id"
          >
            <li v-if="appreciation.note !== null">
              {{ appreciation.note }} étoiles pour
              <strong>{{ appreciation.Video.titre }}</strong>
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
                  v-model="profile.nom"
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
import { format } from 'date-fns'
import { fr } from 'date-fns/locale'
import Swal from 'sweetalert2'

export default {
  data() {
    return {
      profile: {},
      favorites: {},
      password: {
        oldPassword: '',
        newPassword: ''
      },
      showEditProfile: false,
      appreciations: {}
    }
  },

  methods: {
    formatDate(date) {
      return format(new Date(date), 'dd/MM/yyyy HH:mm', { locale: fr })
    },
    async updateProfile() {
      const userStore = useUserStore()
      // const userStore = useFacticeUserStore()
      try {
        await userStore.updateProfile(this.profile)
        Swal.fire('Succès', 'Profil mis à jour avec succès', 'success')
      } catch (error) {
        Swal.fire('Erreur', 'Erreur lors de la mise à jour du profil', 'error')
      }
    },
    async changePassword() {
      const userStore = useUserStore()
      try {
        await userStore.changePassword(this.password.oldPassword, this.password.newPassword)
        Swal.fire('Succès', 'Mot de passe mis à jour avec succès', 'success')
      } catch (error) {
        Swal.fire('Erreur', 'Erreur lors du changement de mot de passe', 'error')
      }
      console.log('Password changend', this.password)
    },
    async confirmDeleteAccount() {
      const result = await Swal.fire({
        title: 'Êtes-vous sûr(e) ?',
        text: 'Cette action est irréversible !',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#d33',
        cancelButtonColor: '#3085d6',
        confirmButtonText: 'Oui, supprimer !'
      })
      if (result.isConfirmed) {
        this.deleteAccount()
      }
    },

    async deleteAccount() {
      const userStore = useUserStore()
      try {
        await userStore.deleteAccount()
        Swal.fire('Supprimé !', 'Votre compte a été supprimé.', 'success')
        this.$router.push({ name: 'home' })
      } catch (error) {
        Swal.fire('Erreur', 'Erreur lors de la suppression du compte', 'error')
      }
    },
    toggleEditProfile() {
      this.showEditProfile = !this.showEditProfile
    },

    isNotEmptyComment(comment) {
      return comment && comment.trim().length > 0
    }
  },

  async mounted() {
    const userStore = useUserStore()
    await userStore.fetchProfile()
    await userStore.fetchFavorites()

    await userStore.fetchAppreciationsByUser(userStore.user.id)

    this.profile = userStore.userProfile
    console.log('Profil chargé: ' + this.profile)
    this.favorites = await userStore.fetchFavorites()
    console.log('favoris : ', this.favorites)
    this.appreciations = userStore.appreciations

    console.log('appreciations : ', this.appreciations)
  }
}
</script>
<style scoped></style>
