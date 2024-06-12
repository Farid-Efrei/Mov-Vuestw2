<template>
  <div class="mt-10 p-3">
    <h1
      class="text-3xl font-bold mb-4 mt-8 text-center text-orange-400 border rounded-lg bg-green-900 shadow-lg"
    >
      Commentaires & Notes Composant Test :
    </h1>
    <div class="bg-gray-800 rounded-lg p-6">
      <!-- Formulaire pour ajouter un commentaire ou une note (visible uniquement pour les utilisateurs connectés) -->

      <div v-if="isAuthenticated" class="mb-6">
        <h3 class="text-lg font-semibold mb-2">Ajouter un Commentaire ou une note :</h3>
        <div class="flex items-center">
          <input
            type="text"
            placeholder="Votre commentaire..."
            v-model="newComment"
            class="flex-1 mr-2 py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 text-black"
          />
          <!-- <select
            name=""
            id=""
            v-model="newRating"
            class="py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 mr-2 text-black"
          >
            <option value="">Votre note :</option>
            <option :value="rating" v-for="rating in [1, 2, 3, 4, 5]" :key="rating">
              Note attribuée : {{ rating }} étoiles
            </option>
          </select> -->
          <div class="flex items-center mr-2">
            <span class="mr-2"> Votre Note : </span>
            <div
              v-for="rating in [0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4, 4.5, 5]"
              :key="rating.id"
              class="cursor-pointer"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="w-6 h-6 text-yellow-500"
                :class="{ 'text-gray-300': newRating < rating }"
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
            @click="addCommentOrRating2"
            class="bg-orange-400 py-2 px-4 hover:bg-orange-500 transition-colors duration-300 rounded-lg"
          >
            Valider
          </button>
        </div>
      </div>
      <!-- Affichage des commentaires existants -->

      <div v-if="comments.length > 0" class="mb-6">
        <h3 class="text-lg font-semibold mb-2">Commentaires</h3>
        <div
          v-for="comment in comments"
          :key="comment.id"
          class="bg-pink-100 rounded-lg p-4 mb-2 shadow"
        >
          <div class="flex justify-between items-center">
            <p class="text-gray-700">{{ comment.text }}</p>
            <!-- <p class="text-sm text-gray-500 mt-2">Par {{ comment.author || 'Anonyme' }}</p> -->
            <div class="flex items-center" v-if="isAuthenticated">
              <button @click="editComment(comment)" class="text-blue-500 hover:text-blue-700 mr-2">
                Editer
              </button>
              <button @click="deleteComment(comment.id)" class="text-red-500 hover:text-red-700">
                Supprimer
              </button>
            </div>
          </div>
          <p class="text-sm text-green-600">Par {{ comment.author || 'Anonyme' }}</p>
        </div>
      </div>

      <!-- Affichage des notes existantes -->
      <div v-if="ratings.length > 0">
        <h3 class="text-lg font-semibold mb-2">Notes :</h3>
        <div
          v-for="rating in ratings"
          :key="rating.id"
          class="bg-amber-100 rounded-lg p-4 mb-2 shadow flex items-center"
        >
          <div class="flex items-center mr-4">
            <svg
              v-for="star in rating.value"
              :key="star"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="currentColor"
              class="w-6 h-6 text-yellow-500"
            >
              <path
                fill-rule="evenodd"
                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z"
                clip-rule="evenodd"
              />
            </svg>
          </div>
          <p class="text-gray-700">Note anonyme</p>
        </div>
      </div>
      <!-- Message s'il n'y a pas de commentaire ni de note -->

      <div v-else class="text-pink-100">Aucun commentaire ni note pour le moment.</div>
    </div>
    <!-- Bouton pour ajouter/retirer des favoris (visible uniquement pour les utilisateurs connectés) -->
    <div>
      <button @click="toggleFavorite">
        <svg
          v-if="isMovieFavorite"
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
        <span> {{ isFavorite ? 'Retirer des Favoris' : 'Ajouter aux Favoris.' }} </span>
      </button>
    </div>
  </div>
</template>

<script>
import { useUserStore } from '@/stores/user'
import { useMovieAppStore } from '@/stores/movieStoreAppreciations'
export default {
  name: 'CommentAndRatings2',
  // props: {
  //   isAuthenticated: {
  //     type: Boolean,
  //     required: true
  //   },
  //   movieId: {
  //     type: Number,
  //     required: true
  //   }
  // },
  data() {
    return {
      newComment: '',
      newRating: 0
      // comments: [],
      // ratings: []
      // comments: [
      //   { id: 1, text: 'Un excellent film, à voir absolument !', author: 'John Doe' },
      //   { id: 2, text: "J'ai adoré les performances des acteurs.", author: null }
      // ]
      // ratings: [
      //   { id: 1, value: 5 },
      //   { id: 2, value: 4 },
      //   { id: 3, value: 3 }
      // ]
      // isFavorite: true
    }
  },
  computed: {
    isAuthenticated() {
      // return this.userStore.isAuthenticated
      return true
    },
    comments() {
      return this.movieStore.appreciations.filter((app) => app.commentaire)
    },
    ratings() {
      return this.movieStore.appreciations.filter((app) => app.note)
    }
    // comments() {
    //   return this.store.appreciations.map((app) => ({
    //     id: app.appreciationId,
    //     text: app.comment,
    //     author: 'Anonyme' // Utiliser un champ existant si nécessaire
    //   }))
    // },
    // ratings() {
    //   return this.store.appreciations.map((app) => ({
    //     id: app.appreciationId,
    //     value: app.note
    //   }))
    // },
    // isFavorite() {
    //   return this.store.isFavorite
    // }
  },
  created() {
    this.userStore = useUserStore()
    this.movieStore = useMovieAppStore()
    this.videoId = this.$route.params.id
    this.movieStore.fetchCommentsAndRatings(this.videoId)
    // this.comment = this.store.appreciations.map((app) => ({
    //   id: app.Id_Appreciation,
    //   comment: app.comment,
    //   author: 'Anonyme'
    // }))
    // this.ratings = this.store.appreciations.map((app) => ({
    //   id: app.Id_Appreciation,
    //   value: app.note
    // }))
    // this.isFavorite = this.store.isFavorite
  },

  methods: {
    addCommentOrRating() {
      if (this.newComment) {
        this.comments.push({
          id: this.comments.length + 1,
          text: this.newComment,
          author: null
        })
        this.newComment = ''
        console.log(this.comments)
      }
      if (this.newRating) {
        this.ratings.push({
          id: this.ratings.length + 1,
          value: this.newRating
        })
        this.newRating = ''
        console.log(this.newRating)
      }
    },
    // Assume userId is known or fetched from another store or context
    async addCommentOrRating2() {
      // Assurez-vous que soit un commentaire soit une note est fournie avant de faire l'appel.
      if (this.newComment.trim() || this.newRating !== null) {
        try {
          // Appel à l'action du store pour ajouter l'appréciation.
          await this.movieStore.addAppreciation(
            this.videoId,
            this.userStore.currentUser.id,
            this.newComment.trim(),
            this.newRating
          ) // Assume userId = 1 pour l'exemple
          // Réinitialisez les valeurs après l'ajout réussi pour préparer pour un nouveau commentaire ou note.
          this.newComment = ''
          this.newRating = null
          // Re-fetch the comments and ratings to update the list.
          this.fetchCommentsAndRatings()
        } catch (error) {
          console.error("Echec de l'ajout de l'appréciation", error)
          // Optionnel: affichez un message d'erreur à l'utilisateur ici.
        }
      } else {
        // Optionnel: Vous pouvez gérer le cas où ni un commentaire ni une note n'est fourni.
        console.log('Vous devez entrer soit un commentaire soit une note avant de soumettre.')
      }
    },
    fetchCommentsAndRatings() {
      this.movieStore.fetchAppreciations(this.videoId).then(() => {
        this.comments = this.store.appreciation.map((app) => ({
          id: app.id,
          text: app.comment,
          author: 'anonyme'
        }))
        this.ratings = this.store.appreciation.map((app) => ({
          id: app.id,
          value: app.rating
        }))
      })
    },
    editComment(appreciationId, newComment, newRating) {
      this.store.updateAppreciation(appreciationId, newComment, newRating)
      // Re-fetch the comments to update the list.
      this.fetchCommentsAndRatings()
    },
    deleteComment(appreciationId) {
      this.store.deleteAppreciation(appreciationId)
      // Re-fetch the comments to update the list.
      this.fetchCommentsAndRatings()
    },
    toggleFavorite() {
      this.store.toggleFavorite(this.movieId).then(() => {
        this.isFavorite = !this.isFavorite
      })
      alert('Favorite ok')
    }
  }
}
</script>

<style lang="scss" scoped></style>
