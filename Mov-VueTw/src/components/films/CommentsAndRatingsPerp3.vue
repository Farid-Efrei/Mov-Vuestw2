<template>
  <div class="comments-ratings-container">
    <h3>Commentaires et Notes</h3>
    <div v-if="appreciations.length > 0 || appreciations">
      <div v-for="appreciation in appreciations" :key="appreciation.id" class="appreciation">
        <p><strong>{{ appreciation.utilisateur.name }}</strong> - Note: {{ appreciation.note }}/5</p>
        <p>{{ appreciation.commentaire }}</p>
        <button @click="editAppreciation(appreciation)">Modifier</button>
        <button @click="deleteAppreciation(appreciation.id)">Supprimer</button>
      </div>
    </div>
    <div v-if="isAuthenticated">
      <textarea v-model="newComment" placeholder="Votre commentaire" class="text-black"></textarea>
      <input type="number" v-model="newRating" min="1" max="5" placeholder="Note (1-5)" class="text-black" />
      <button @click="addOrUpdateAppreciation">Ajouter / Modifier</button>
    </div>
    <button @click="toggleFavorite">{{ isFavorite ? 'Retirer des Favoris' : 'Ajouter aux Favoris' }}</button>
  </div>
</template>

<script>
import { useMovieStore } from '@/stores/movieStore';
import { useUserStore } from '@/stores/userStore';

export default {
  name: 'CommentsAndRatings3',
  props: {
    videoId: {
      type: Number,
      required: true
    }
  },
  data() {
    return {
      appreciations: [],
      newComment: '',
      newRating: 0,
      currentAppreciationId: null
    };
  },
  computed: {
    isAuthenticated() {
      return true;
    },
    isFavorite() {
      return this.userStore.favorites.includes(this.videoId);
    },
    userStore() {
      return useUserStore();
    },
    movieStore() {
      return useMovieStore();
    }
  },
  methods: {
    fetchAppreciations() {
      this.movieStore.fetchAppreciationsByMovieId(this.videoId)
        .then(data => {
          this.appreciations = data;
        });
    },
    addOrUpdateAppreciation() {
      const appreciationData = {
        Id_Video: this.videoId,
        Id_Utilisateur: this.userStore.user.id,
        commentaire: this.newComment,
        note: this.newRating
      };
      if (this.currentAppreciationId) {
        this.movieStore.updateAppreciation(this.currentAppreciationId, appreciationData);
      } else {
        this.movieStore.addAppreciation(appreciationData);
      }
      this.resetForm();
      this.fetchAppreciations();
    },
    editAppreciation(appreciation) {
      this.newComment = appreciation.commentaire;
      this.newRating = appreciation.note;
      this.currentAppreciationId = appreciation.id;
    },
    deleteAppreciation(appreciationId) {
      this.movieStore.deleteAppreciation(appreciationId);
      this.fetchAppreciations();
    },
    toggleFavorite() {
      this.movieStore.toggleFavorite(this.videoId);
    },
    resetForm() {
      this.newComment = '';
      this.newRating = 0;
      this.currentAppreciationId = null;
    }
  },
  created() {
    this.fetchAppreciations();
  }
}
</script>

<style scoped>
/* Your styles here */
</style>
