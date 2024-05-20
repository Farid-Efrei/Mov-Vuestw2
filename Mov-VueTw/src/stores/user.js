import { defineStore } from "pinia";
import axios from "axios";
import jwt_decode from 'jwt-decode'

export const useUserStore = defineStore('user', {
    // données que le store va gérer : state
    state: () => ({
        user: null, // stocke les infos de l'user actuellement connecté.
        token: null, // stocke le JWT de l'user co.
        favorites: [], // liste des videos favoris de l'user.
        comments:[] // une liste des commentaires de l'user.
    }),
    // Des fonctions pour obtenir des valeurs dérivées du state:
    getters: {
        // vérifie si l'user est auth en vérifiant la présence du token.
        isAuthenticated: state => !!state.token,
        // vérifie si l'user est un admin en regardant le rôle de l'user:
        isAdmin: state => state.user && state.user.role === 'admin',
        // retourne la liste des favoris de l'user:
        userFavorites: state => state.favorites,
        // retourne la liste des commentaires de l'user:
        userComments: state => state.comments
    },
    // fonctions qui effectuent des opérations asynchrones et modif le state:
    actions: {
        // login: envoie les "credentials" (mail + mdp) au back pour obtenir un token, puis décode le token pour obtenir les info de l'user:
        async login(credentials) {
            const response = await axios.post('http://localhost:3000/login', credentials);
            this.token = response.data.token;
            this.user = jwt_decode(this.token)
        },
        // register: envoie les "credentials"(nom user, mail + mdp) au back pour créer un nv compte puis obtient et décode le token: 
        async register(credentials) {
            const response = await axios.post('http://localhost:3000/register', credentials);
            this.token = response.data.token;
            this.user = jwt_decode(this.token);
        },
        // fetchFavorites: envoie une requete GET pour la liste des videos fav de l'user:
        async fetchFavorites() {
            const response = await axios.get('http://localhost:3000/favorites', {
                headers: { Authorization: `Bearer ${this.token}` }
            });
            this.favorites = response.data
        },
        // fetchComments: Envoie une req GET pour la liste des comm de l'user pour un film spécifique:
        async fetchComments(movieId) {
            const response = await axios.get(`http://localhost:3000/comments?movieId=${movieId}`, {
                headers: {
                    Authorization: `Bearer ${this.token}`}
            });
            this.comments = response.data
        },
        // Envoie une req POST pour ajouter un film aux favoris de l'user:
        async addFavorite(movieId) {
            const response = await axios.post('http://localhost:3000/favorites', { movieId }, {
                headers: { Authorization: `Bearer ${this.token}` }
            });
            this.favorites.push(response.data)
        },
        //Envoie une req DELETE pour supprimer un film des fav de l'user:
        async removeFavorite(favoriteId) {
            await axios.delete(`http://localhost:3000/favorites/${favoriteId}`, {
                headers: { Authorization: `Bearer ${this.token}` }
            });
            this.favorites = this.favorites.filter(fav => fav.id !== favoriteId);
        },
        // envoie une req POST pour ajouter un comm à une video:
        async addComment({ movieId, content }) {
            const response = await axios.post('http://localhost:3000/comments', { movieId, content }, {
                headers: { Authorization: `Bearer ${this.token}` }
            }); 
            this.comments.push(response.data);
        }, 
        // envoie une req PUT pour MAJ un comm:
        async updateComment({ commentId, content }) {
            const response = await axios.put(`http://localhost:3000/comments/${commentId}`, { content }, {
                headers: { Authorization: `Bearer ${this.token}` }
            });
            const index = this.comments.findIndex(cont => cont.id === commentId);
            if (index !== -1) {
                this.comments[index] = response.data;
            }
        },
        // Envoie une req pour DELETE un comm:
        async removeComment(commentId) {
            await axios.delete(`http://localhost:3000/comments/${commentId}`, {
                headers: { Authorization: `Bearer ${this.token}` }
            });
            this.comments = this.comments.filter(com => com.id !== commentId);
        }
    }
}
)