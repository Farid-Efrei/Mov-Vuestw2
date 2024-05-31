import { defineStore } from "pinia";

export const useFacticeUserStore = defineStore('facticeUser', {
    state: () => ({
        users: [
            { id: 1, email: 'user1@example.com', username: 'Fairytale', password: 'password1' },
            { id: 2, email: 'user2@example.com', username: 'user2', password: 'password2' },
            { id: 3, email: 'user3@example.com', username: 'user3', password: 'password3' },
        ],
        currentUser: null,
        userProfileImage: '',
        movies: [
            { id: 1, title: "Inception", image:'../assets/Inception.jpg' },
            { id: 2, title: "Interstellar", image:'../assets/insterstellar.jpg' },
            { id: 3, title: "J'ai rencontré le diable", image:'../assets/I_Saw_Dev.jpeg' },
            {id: 4, title: "Akira", image:'../assets/Akira.jpg' },
            { id: 5, title: "Joker", image:'../assets/Joker.jpg' },
            { id: 6, title: "l'auberge Okko", image:'../assets/wakaokami_wa_shougakusei.webp' },
        ],
        favorites: [
            { userId: 1, movieId: 3 },
            { userId: 2, movieId: 1 },
            { userId: 1, movieId: 2 },
            {userId:1, movieId:6},
            {userId:1, movieId:5},
           { userId:2, movieId:4},
           { userId:3, movieId:4},
           { userId:3, movieId:6},
           { userId:3, movieId:3}
        ],
        comments: [
            { userId: 1, movieId: 3, content: "Magistral !!!", id: 1 },
            { userId: 2, movieId: 3, content: "Flippant et Stressant", id: 2 },
            { userId: 1, movieId: 1, content: "Une référence !", id: 3 },
            { userId: 2, movieId: 2, content: "Un voyage intersidéral", id: 4 },
            {userId:3, movieId:6, content: "Trop émouvant et plein de moralités, à découvrir d'urgence en Famille", id: 5 },
            {userId:1, movieId:5, content: "Intense et puissant, on est partagé dans ce film du début à la fin", id: 6 },
            {userId: 1, movieId:6, content: "entrainant", id: 7 },
            {userId: 3, movieId:4, content:"Masterclass malgré les années, impitoyable et la moto... tout est parfait ! a voir et revoir", id: 8}
        ],
        ratings: [
            { userId: 1, movieId: 3, rating: 5, id: 1 },
            { userId: 2, movieId: 1, rating: 1, id: 2 },
            { userId: 1, movieId: 1, rating: 4.5, id: 3 },
            { userId: 2, movieId: 2, rating: 3, id: 4 },
            { userId: 3, movieId: 3, rating: 4.5, id: 5 },
            {userId:1, movieId: 6, rating:4, id: 6 },
            { userId:2, movieId: 4, rating: 2, id: 7 },
            {userId:3, movieId:4, rating: 5, id:8},
            { userId:3, movieId: 6, rating:5}
        ]
    }),
    getters: {
        userFavorites: state => {
            return state.favorites.filter(fav => fav.userId === state.currentUser?.id).map(fav => {
                return state.movies.find(movie => movie.id === fav.movieId);
            });
        },
        movieComments: state => {
            return state.comments.filter(comment => comment.userId === state.currentUser?.id).map(comment => {
                const movie = state.movies.find(movie => movie.id === comment.movieId);
                return { ...comment, movieTitle: movie.title };
            });
        },
        userRatings: state => {
            return state.ratings.filter(rating => rating.userId === state.currentUser?.id).map(rating => {
                const movie = state.movies.find(movie => movie.id === rating.movieId);
                return { ...rating, movieTitle: movie.title }
            });
        },
        userProfile: state => {
            return state.currentUser;
        }
    },
    actions: {
        //user connecté depuis le stockage de session:
        loadSession(){
            const user = sessionStorage.getItem('currentUser');
            if (user) {
                this.currentUser = JSON.parse(user);
            }
        },

        async login(credentials) {
            const user = this.users.find(user => user.email === credentials.email && user.password === credentials.password);
            if (user) {
                this.currentUser = user;
                //en utilisant le session storage mais facultatif:
                sessionStorage.setItem('currentUser', JSON.stringify(user));
                return true;
            } else {
                throw new Error('Credentials invalides');
            }
        },
        async register(credentials) {
            const id = this.users.length + 1;
            const newUser = { id, ...credentials };
            this.users.push(newUser);
            this.currentUser = newUser;
            sessionStorage.setItem('currentUser', JSON.stringify(newUser));
        },
        async forgotPassword(email){
            const user = this.users.find(user => user.email === email);
            if(user){
                //alert (`Un email de réinitialisation a été envoyé à ${email}.`)
                console.log(`Un email de réinitialisation a été envoyé à ${email}.`);
                //Simuler l'envoi d'un mail.
                return true;
            } else{
                throw new Error('Aucun compte associé à cet email');
            }
        },

        async fetchProfile() {
            // Pas besoin d'appel HTTP, les données factices sont déjà dans le state
        },
        async updateProfile(profileData) {
            if (this.currentUser) {
                this.currentUser = { ...this.currentUser, ...profileData };
                sessionStorage.setItem('currentUser', JSON.stringify(this.currentUser));
            }
        },
        async deleteAccount() {
            this.users = this.users.filter(user => user.id !== this.currentUser?.id);
            this.logout();
        },
        async logout() {
            this.currentUser = null;
            sessionStorage.removeItem('currentUser');
        },
        async fetchFavorites() {
            // Pas besoin d'appel HTTP, les données factices sont déjà dans le state
        },
        async fetchComments() {
            // Pas besoin d'appel HTTP, les données factices sont déjà dans le state
        },
        async fetchRatings() {
            // Pas besoin d'appel HTTP, les données factices sont déjà dans le state
        },
        async addFavorite(movieId) {
            if (this.currentUser) {
                const id = this.favorites.length + 1;
                this.favorites.push({ userId: this.currentUser.id, movieId, id });
            }
        },
        async removeFavorite(favoriteId) {
            this.favorites = this.favorites.filter(fav => fav.id !== favoriteId);
        },
        async addComment({ movieId, content }) {
            if (this.currentUser) {
                const id = this.comments.length + 1;
                this.comments.push({ userId: this.currentUser.id, movieId, content, id });
            }
        },
        async updateComment({ commentId, content }) {
            const index = this.comments.findIndex(c => c.id === commentId);
            if (index !== -1) {
                this.comments[index].content = content;
            }
        },
        async removeComment(commentId) {
            this.comments = this.comments.filter(comment => comment.id !== commentId);
        },
        async addRating({ movieId, rating }) {
            if (this.currentUser) {
                const id = this.ratings.length + 1;
                this.ratings.push({ userId: this.currentUser.id, movieId, rating, id });
            }
        },
        async updateRating({ ratingId, rating }) {
            const index = this.ratings.findIndex(r => r.id === ratingId);
            if (index !== -1) {
                this.ratings[index].rating = rating;
            }
        },
        async removeRating(ratingId) {
            this.ratings = this.ratings.filter(rating => rating.id !== ratingId);
        }
    }
})