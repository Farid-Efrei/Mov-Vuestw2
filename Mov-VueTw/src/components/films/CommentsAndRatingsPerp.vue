<template>
  <div class="mt-10 p-2">
    <h1 class="text-3xl font-bold mb-4 mt-8 text-center text-orange-400 border">
      Commentaires & Notes Composant Test :
    </h1>
    <div class="bg-gray-800 rounded-lg p-6">
      <div v-if="isAuthenticated" class="mb-6">
        <h3 class="text-lg font-semibold mb-2">Ajouter un Commentaire ou une note :</h3>
        <div class="flex items-center">
          <input
            type="text"
            placeholder="Votre commentaire..."
            v-model="newComment"
            class="flex-1 mr-2 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          />
          <select
            name=""
            id=""
            v-model="newRating"
            class="py-2 px-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-500 mr-2 text-black"
          >
            <option value="">Votre note :</option>
            <option :value="rating" v-for="rating in [1, 2, 3, 4, 5]" :key="rating">
              Note attribuée : {{ rating }} étoiles
            </option>
          </select>
          <button
            @click="addCommentOrRating"
            class="bg-orange-400 py-2 px-4 hover:bg-orange-500 transition-colors duration-300 rounded-lg"
          >
            Valider
          </button>
        </div>
      </div>
      <div v-if="comments.length > 0 || ratings.length > 0">
        <div v-if="comments.length > 0" class="mb-6">
          <h3 class="text-lg font-semibold mb-2">Commentaires</h3>
          <div
            v-for="comment in comments"
            :key="comment.id"
            class="bg-pink-100 rounded-lg p-4 mb-2 shadow"
          >
            <p class="text-gray-700">{{ comment.text }}</p>
            <p class="text-sm text-gray-500 mt-2">Par {{ comment.author || 'Anonyme' }}</p>
          </div>
        </div>
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
            <p class="text-gray-700">Note anonyme :</p>
          </div>
        </div>
      </div>
      <div v-else class="text-pink-100">Aucun commentaire ni note pour le moment.</div>
    </div>
  </div>
</template>

<script>
import { ref } from 'vue'

export default {
  name: 'CommentAndRatings',
  props: {
    isAuthenticated: {
      type: Boolean,
      required: true
    }
  },
  data() {
    return {
      newComment: ref(''),
      newRating: ref(''),
      comments: ref([
        // { id: 1, text: 'Un excellent film, à voir absolument !', author: 'John Doe' },
        // { id: 2, text: "J'ai adoré les performances des acteurs.", author: null }
      ]),
      ratings: ref([
        // { id: 1, value: 5 },
        // { id: 2, value: 4 },
        // { id: 3, value: 3 }
      ])
    }
  },
  methods: {
    addCommentOrRating() {
      if (n < this.newComment.value) {
        this.comments.value.push({
          id: this.comments.value.length + 1,
          text: this.newComment.value,
          author: null
        })
        this.newComment.value = ''
      }
      if (this.newRating.value) {
        this.ratings.value.push({
          id: this.ratings.value.length + 1,
          value: this.newRating.value
        })
        this.newRating.value = ''
      }
    }
  }
}
</script>

<style lang="scss" scoped></style>
