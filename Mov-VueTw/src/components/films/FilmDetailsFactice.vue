<template>
    <div v-if="movie" class="p-6 max-w-lg mx-auto rounded-xl shadow-md space-y-4">
      <h1 class="text-3xl font-bold  text-orange-300">{{ movie.title }} </h1>
      <img :src="movie.image" :alt="movie.title" class="w-full h-auto">
      <h2 class="text-xl font-semibold text-orange-300">Commentaires :</h2>
      <ul class="list-disc pl-5">
        <li v-for="comment in movieCommentsWithAuthors" :key="comment.id" class="mt-2 text-lg">"{{ comment.content }}" de <span class="text-yellow-300">{{ comment.author }}</span></li>
      </ul>
      <h2 class="text-xl font-semibold text-orange-300" >Notes : </h2>
      <ul class="list-disc pl-5">
        <li v-for="rating in movieRatingsWithAuthors" :key="rating.id" class="mt-2 text-lg">{{ rating.rating }}/5 étoiles venant de <span class="text-yellow-300">{{ rating.author }}</span></li>
      </ul>

    <div v-if="isLoggedIn" class="mt-6 space-y-4">
      <form @submit.prevent="addNewComment" class="flex flex-col space-y-2">
        <input v-model="newComment" placeholder="Ajouter un commentaire" class="p-2 border rounded text-black">
        <button type="submit" class="p-2 bg-blue-500 text-white rounded">Ajouter un Commentaire</button>
      </form>
      
      <form @submit.prevent="addNewRating" class="flex flex-col space-y-2">
        <input v-model.number="newRating" type="number" min="1" max="5" placeholder="Noter (1-5)" class="p-2 border rounded text-black">
        <button type="submit" class="p-2 bg-blue-500 text-white rounded">Ajouter une Note</button>
      </form>
      
      <button @click="addToFavorites" class="p-2 bg-green-500 text-white rounded">Ajouter aux Favoris</button>
    </div>
  </div>
  <div v-else class="p-6 max-w-lg mx-auto bg-white rounded-xl shadow-md space-y-4">
    <p>Chargement...</p>
  </div>
</template>
  
  <script>
  import { useFacticeUserStore } from '@/stores/facticeUserStore';
  
  export default {
    data() {
      return {
        newComment: '',
        newRating: 0
      };
    },
    computed: {
      movie() {
        const userStore = useFacticeUserStore();
        return userStore.movies.find(movie => movie.id === parseInt(this.$route.params.id));
      },
      movieComments() {
        const userStore = useFacticeUserStore();
        return userStore.comments.filter(comment => comment.movieId === parseInt(this.$route.params.id));
      },
      movieCommentsWithAuthors(){
        const userStore = useFacticeUserStore();
        return userStore.comments.filter(comment => comment.movieId === parseInt(this.$route.params.id))
        .map(comment => {
          const user = userStore.users.find(user => user.id === comment.userId);
          return {...comment, author: user ? user.username : 'Inconnu'};
        });
      },
      movieRatings() {
        const userStore = useFacticeUserStore();
        return userStore.ratings.filter(rating => rating.movieId === parseInt(this.$route.params.id));
      },
      movieRatingsWithAuthors(){
        const userStore = useFacticeUserStore();
        return userStore.ratings.filter(rating => rating.movieId === parseInt(this.$route.params.id))
        .map(rating => {
          const user = userStore.users.find(user => user.id === rating.userId);
          return {...rating, author: user ? user.username : 'Inconnu'};
        });

      },
      isLoggedIn() {
        const userStore = useFacticeUserStore();
        return userStore.currentUser !== null;
      }
    },
    methods: {
      addToFavorites() {
        const userStore = useFacticeUserStore();
        userStore.addFavorite(this.movie.id);
      },
      addNewComment() {
        const userStore = useFacticeUserStore();
        userStore.addComment({ movieId: this.movie.id, content: this.newComment });
        this.newComment = '';
      },
      addNewRating() {
        const userStore = useFacticeUserStore();
        userStore.addRating({ movieId: this.movie.id, rating: this.newRating });
        this.newRating = 0;
      }
    }
  };
  </script>
  