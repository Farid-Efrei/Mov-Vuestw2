<template>
    <div v-if="movie">
      <h1>{{ movie.title }}</h1>
      <h2>Comments</h2>
      <ul>
        <li v-for="comment in movieComments" :key="comment.id">{{ comment.content }}</li>
      </ul>
      <h2>Ratings</h2>
      <ul>
        <li v-for="rating in movieRatings" :key="rating.id">{{ rating.rating }} stars</li>
      </ul>
      <div v-if="isLoggedIn">
        <form @submit.prevent="addNewComment">
          <input v-model="newComment" placeholder="Add a comment">
          <button type="submit">Add Comment</button>
        </form>
        <form @submit.prevent="addNewRating">
          <input v-model.number="newRating" type="number" min="1" max="5" placeholder="Rate (1-5)">
          <button type="submit">Add Rating</button>
        </form>
        <button @click="addToFavorites">Add to Favorites</button>
      </div>
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
      movieRatings() {
        const userStore = useFacticeUserStore();
        return userStore.ratings.filter(rating => rating.movieId === parseInt(this.$route.params.id));
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
  