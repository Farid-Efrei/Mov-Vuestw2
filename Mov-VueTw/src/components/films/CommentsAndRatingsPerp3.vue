<template>
  <div class="bg-green-950 text-white p-6 rounded-lg shadow-lg">
    <h2 class="text-2xl font-bold mb-4">Commentaires et Notes :</h2>
    <div v-if="isAuthenticated">
      <div class="mb-6">
        <h3 class="text-lg font-semibold mb-2">Ajouter un commentaire ou une note :</h3>
        <div class="flex items-center">
          <input
            type="text"
            v-model="newComment"
            placeholder="Votre commentaire..."
            class="flex-1 mr-2 py-3 px-8 rounded-lg bg-green-800 text-green-100 focus:outline-none focus:ring-2 focus:ring-green-500"
          />
          <div class="flex items-center mr-2">
            <span class="mr-2"> Votre note : </span>
            <div v-for="rating in 5" :key="rating" class="cursor-pointer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6 text-yellow-500"
                :class="{ 'text-gray-400': newRating < rating }"
                @click="newRating = rating"
              >
                <path
                  fill-rule="evenodd"
                  d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                  clip-rule="evenodd"
                />
              </svg>
            </div>
          </div>
          <button
            @click="addOrUpdateCommentOrRating"
            class="bg-green-600 text-white py-2 px-5 rounded-lg hover:bg-green-700 transition-colors duration-300"
          >
            Envoyer
          </button>
        </div>
      </div>
      <div class="mb-6">
        <h3 class="text-lg font-semibold mb-2">Gérer vos Favoris :</h3>
        <button
          @click="toggleFavorite"
          :class="isFavorite ? 'bg-yellow-400' : 'bg-green-600'"
          class="bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-yellow-400 transition-colors duration-300 flex items-center"
        >
          <svg
            v-if="isFavorite"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6 mr-2"
          >
            <path
              fill-rule="evenodd"
              d="M6.32 2.577a49.255 49.255 0 0111.36 0c1.497.174 2.57 1.46 2.57 2.93V21a.75.75 0 01-1.085.67L12 18.089l-7.165 3.583A.75.75 0 013.75 21V5.507c0-1.47 1.073-2.756 2.57-2.93z"
              clip-rule="evenodd"
            />
          </svg>
          <svg
            v-else
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
            class="w-6 h-6 mr-2"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z"
            />
          </svg>
          <span>{{ isFavorite ? 'Retirer des favoris' : 'Ajouter aux favoris' }}</span>
        </button>
      </div>
    </div>

    <div class="mb-6" v-if="comments.length > 0">
      <h3 class="text-lg font-semibold mb-2">Commentaires :</h3>
      <div
        class="bg-green-800 rounded-lg p-4 mb-2 shadow"
        v-for="comment in comments"
        :key="comment.Id_Appreciation"
      >
        <p class="text-gray-300">{{ comment.commentaire }} commentaires boucles</p>
        <div class="flex justify-between items-center mt-2">
          <p class="text-sm text-yellow-400">Par {{ comment.Utilisateur.nom || 'Anonyme' }}</p>

          <div
            class="flex items-center"
            v-if="isAuthenticated && comment.Id_Utilisateur === userStore.currentUser.id"
          >
            <button @click="editComment(comment)" class="text-green-400 hover:text-green-600 mr-2">
              Editer
            </button>
            <button
              @click="deleteComment(comment.Id_Appreciation)"
              class="text-red-500 hover:text-red-700"
            >
              Supprimer
            </button>
          </div>
        </div>
      </div>
    </div>

    <div v-if="ratings.length > 0">
      <h3 class="text-lg font-semibold mb-2">Notes:</h3>
      <div
        v-for="rating in ratings"
        :key="rating.Id_Appreciation"
        class="bg-green-800 rounded-lg p-4 mb-2 shadow flex items-center"
      >
        <div class="flex items-center mr-4">
          <svg
            v-for="star in Math.ceil(rating.note)"
            :key="star"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="currentColor"
            class="w-6 h-6 text-yellow-200"
          >
            <path
              fill-rule="evenodd"
              d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
              clip-rule="evenodd"
            />
          </svg>
        </div>
        <p class="text-gray-300">Note anonyme</p>
      </div>
    </div>

    <div v-if="!comments.length && !ratings.length" class="text-gray-400">
      Aucun commentaire ni note pour le moment.
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user'
import { useMovieAppStore } from '@/stores/movieStoreAppreciations'
import axios from 'axios'

export default {
  props: {
    magicRoute: {
      type: String,
      required: true
    }
  },
  data() {
    return {
      newComment: '',
      newRating: 0,
      editingAppreciation: null,
      isFavorite: false
    }
  },
  computed: {
    userStore() {
      return useUserStore()
    },
    movieStore() {
      return useMovieAppStore()
    },
    isAuthenticated() {
      return this.userStore.isAuthenticated
    },
    comments() {
      return this.movieStore.appreciations.filter((app) => app.commentaire)
    },
    ratings() {
      return this.movieStore.appreciations.filter((app) => app.note)
    }
    // isFavorite() {
    //   return this.userStore.userFavorites.some((fav) => fav.Id_Video === this.$route.params.id)
    // }
  },
  watch: {
    'userStore.userFavorites': {
      handler(newFavorites, oldFavorites) {
        console.log('Favorites changed from', oldFavorites, 'to', newFavorites)
        this.isFavorite = newFavorites.some(
          (fav) => fav.Id_Video === parseInt(this.$route.params.id)
        )
        console.log('isFavorite is now:', this.isFavorite)
      },
      deep: true,
      immediate: true // Run at start
    }
  },
  methods: {
    async fetchCommentsAndRatings(videoId) {
      try {
        // await this.movieStore.fetchAppreciationsByVideo(videoId)
        const response = await axios.get(`/api/appreciations/${videoId}?type=${this.magicRoute}`, {
          headers: {
            Authorization: `Bearer ${this.userStore.token}`
          }
        })
        this.comments = response.data.comments
        this.ratings = response.data.ratings

        // // Vérifiez la structure des favoris reçus:
        // console.log('User favorites fetched: ', this.userStore.userFavorites)

        // // Vérif si la vidéo est en favoris:
        // this.isFavorite = this.userStore.userFavorites.some((fav) => {
        //   console.log('Favori:', fav) // Ajoutez ce log pour vérifier chaque favorifav.Id_Video === videoId)
        //   return fav.Id_Video === parseInt(videoId)
        // })
        // console.log('isFAVO : ' + this.isFavorite)
        // // console.log('favIDVID : ' + this.fav.Id_Video)
        // console.log('videoIDVID : ' + this.videoId)
        this.isFavorite = this.userStore.userFavorites.some(
          (fav) => fav.Id_Video === parseInt(videoId)
        )
      } catch (error) {
        console.error('Erreur lors de la récupération des commentaires et des notes :', error)
      }
    },

    // async addCommentOrRating() {
    //   if (this.newComment || this.newRating) {
    //     await this.movieStore.addOrUpdateAppreciation(this.$route.params.id, {
    //       // movieId: this.movieId,
    //       // movieId: this.$route.params.id,
    //       commentaire: this.newComment,
    //       note: this.newRating,
    //       magicRoute: this.magicRoute
    //     })
    //     this.newComment = ''
    //     this.newRating = 0
    //   }
    // },
    async addOrUpdateCommentOrRating() {
      try {
        await this.movieStore.addOrUpdateAppreciation2({
          movieId: this.$route.params.id,
          comment: this.newComment,
          rating: this.newRating,
          magicRoute: this.magicRoute,
          appreciationId: this.editingAppreciation ? this.editingAppreciation.Id_Appreciation : null
        })
        this.newComment = ''
        this.newRating = this.editingAppreciation = null
      } catch (error) {
        console.error(
          "Erreur lors de l'ajout ou de la mise à jour du commentaire ou de la note",
          error
        )
      }
    },

    async toggleFavorite() {
      console.log('UserStore:', this.userStore.user) // Vérifiez l'utilisateur ici
      console.log('Video ID:', this.$route.params.id) // Vérifiez l'ID de la vidéo ici
      await this.userStore.toggleFavorite3(this.$route.params.id, this.magicRoute)
      // this.isFavorite = !this.isFavorite //MAJ de l'état local des fav.
      // console.log('Après toggle:', this.userStore.userFavorites)
      // this.$nextTick(() => {
      //   this.isFavorite = this.userStore.userFavorites.some(
      //     (fav) => fav.Id_Video === parseInt(this.$route.params.id)
      //   )
      // })
      // console.log('isFavorite après toggle:', this.isFavorite)

      // console.log('videoIDVID : ' + this.videoId)
      // await this.userStore.fetchUserFavorites()
    },

    editComment(comment) {
      this.editingAppreciation = comment
      this.newComment = comment.commentaire
      this.newRating = comment.note
    },
    // async updateComment() {
    //   if (this.editingAppreciation) {
    //     await this.movieStore.addOrUpdateAppreciation(this.editingAppreciation.Id_Video, {
    //       commentaire: this.newComment,
    //       note: this.newRating,
    //       magicRoute: this.magicRoute
    //     })
    //     this.editingAppreciation = null
    //     this.newComment = ''
    //     this.newRating = 0
    //   }
    // },
    async deleteComment(appreciationId) {
      try {
        await this.movieStore.deleteAppreciation(appreciationId)
      } catch (error) {
        console.error('Erreur lors de la suppression du commentaire', error)
      }
    }
  },
  async created() {
    const videoId = this.$route.params.id // puisque l'ID de la vidéo est passé dnas l'url
    // this.videoId = videoId
    console.log(this.videoId)
    console.log(this.movieId)
    console.log(this.video_Id)
    // await this.userStore.fetchUserFavorites() // Pour m'assurer que les fav sont chargés qd je créé le compo.
    this.fetchCommentsAndRatings(videoId)
  }
}
</script>

<style scoped></style>
