import { defineStore } from 'pinia'
import axios from 'axios'
// import jwt_decode from 'jwt-decode'
import { jwtDecode } from 'jwt-decode'

export const useUserStore = defineStore('user', {
  // données que le store va gérer : state (état initial)
  state: () => ({
    user: null, // stocke les infos de l'user actuellement connecté.
    token: null, // stocke le JWT de l'user co pour les req authentifiées.
    favorites: [], // liste des videos favoris de l'user.
    comments: [], // une liste des commentaires de l'user.
    ratings: [], // liste des ratings de l'user.
    profile: {}, // profil utilisateur.
    currentUser: null,
    isAuthenticated: false
  }),
  // Des fonctions pour obtenir des valeurs dérivées du state:
  getters: {
    // vérifie si l'user est auth en vérifiant la présence du token. (renvoie true si authentifié (si un token est présent))
    isAuthenticated: (state) => !!state.token,
    // vérifie si l'user est un admin en regardant le rôle de l'user: (renvoie true si Admin)
    isAdmin: (state) => state.user && state.user.role === 'admin',
    // POur simplifier l'accès aux différents états du store user***:
    // retourne la liste des favoris de l'user:
    userFavorites: (state) => state.favorites,
    // retourne la liste des commentaires de l'user:
    userComments: (state) => state.comments,
    // retourne la liste des notes de l'user:
    userRatings: (state) => state.ratings,
    // getter pour le profil:
    userProfile: (state) => state.profile
  },
  // fonctions qui effectuent des opérations asynchrones et modif le state (modif le store):
  actions: {
    // login: envoie une Requete de CONNEXION avec les "credentials" (mail + mdp) au back pour obtenir un token, puis décode le token pour obtenir les info de l'user + récupère le profil User:
    async login(credentials) {
      //   try {
      //     const response = await axios.post(
      //       'http://localhost:3000/api/utilisateurs/login',
      //       credentials
      //     )
      //     this.token = response.data.token
      //     this.user = jwt_decode(this.token)
      //     localStorage.setItem('token', this.token)
      //     await this.fetchProfile()
      //   } catch (error) {
      //     throw new Error('Echec de la connexion')
      //   }

      try {
        const response = await axios.post(
          'http://localhost:3000/api/utilisateurs/login',
          credentials
        )
        this.token = response.data.token
        if (this.token) {
          this.user = jwtDecode(this.token)
          console.log('Token:', this.token)
          console.log('User Info:', this.user)
          // Décode le token JWT pour récupérer les informations de l'utilisateur
          this.currentUser = this.user
          localStorage.setItem('token', this.token)
          // Stocke le token dans le localStorage

          await this.fetchProfile() // Récupère le profil de l'utilisateur
        }
      } catch (error) {
        console.log('EchToken:', this.token)
        console.log('E User Info:', this.user)
        console.error('Echec de la connexion', error.response.data)

        console.error('Echec de la connexion', error)
      }
    },
    // register: envoie une Req d'INSCRIPTION les "credentials"(nom user, mail + mdp) au back pour créer un nv compte puis obtient et décode le token + récupère le profile User:
    async register(credentials) {
      const response = await axios.post('http://localhost:3000/api/utilisateurs/register', credentials)
      this.token = response.data.token
      this.user = jwtDecode(this.token)
      // await this.fetchProfile()
    },
    //Req GET pour récupérer le profil User en utilisant le token pour l'authentication:
    async fetchProfile() {
      try {
        const response = await axios.get('http://localhost:3000/api/utilisateurs/profile', {
          headers: { Authorization: `Bearer ${this.token}` }
        })
        this.profile = response.data
        console.log('Profile récupéré : ', this.profile)
      } catch (error) {
        console.error('Erreur lors de la récupération du profil : ', error)
      }
    },
    // Req PUT pour MAJ le profil User avec les nouvelles données 'ProfileData':
    async updateProfile(profileData) {
      const response = await axios.put('http://localhost:3000/profile', profileData, {
        headers: { Authorization: `Bearer ${this.token}` }
      })
      this.profile = response
    },
    // Req pour SUPPRIMER le profile User et déconnecte l'User:
    async deleteAccount() {
      await axios.delete('http://localhost:3000/profile', {
        headers: { Authorization: `Bearer ${this.token}` }
      })
      this.logout()
    },
    // Réinitialise l'état du store pour Déconnecter l'User:
    logout() {
      this.token = null
      this.user = null
      this.profile = {}
      this.favorites = []
      this.comments = []
      this.ratings = []
      this.currentUser = null
    },

    // ***** GESTION DES FAVORIS : *****
    // fetchFavorites: envoie une requete GET pour la liste des videos fav de l'user:
    async fetchFavorites() {
      try {
        const userId = this.user.id
        const response = await axios.get(`http://localhost:3000/api/favoris/${userId}`, {
          headers: { Authorization: `Bearer ${this.token}` }
        })
        this.favorites = response.data
        return this.favorites
      } catch (error) {
        console.error('Erreur lors de la récupération des Fav :)', error)
      }
    },
    // fetchComments: Envoie une req GET pour la liste des comm de l'user pour un film spécifique (movieId):
    async fetchComments(Id_Video) {
      console.log("Fetch des commentaires de l'Id_Video : " + Id_Video)
      try {
        const response = await axios.get(`http://localhost:3000/api/appreciations/${Id_Video}`, {
          headers: {
            Authorization: `Bearer ${this.token}`
          }
        })
        console.log('Réponse API : ' + response)
        this.comments = response.data
        console.log('Commentaires fetchés :', this.comments)
      } catch (error) {
        console.error('Erreur en fetchant les comm :', error)
        this.comments = []
      }
    },

    async fetchAppreciationsByUser(userId) {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/appreciations/utilisateur/${userId}`,
          {
            headers: {
              Authorization: `Bearer ${this.token}`
            }
          }
        )
        this.appreciations = response.data
      } catch (error) {
        console.error('Erreur lors de la récup des appréciations par utilisateur :', error)
        this.appreciations = []
      }
    },
    // Envoie une req POST pour ajouter un film aux favoris de l'user:
    async addFavorite(movieId) {
      const response = await axios.post(
        'http://localhost:3000/favorites',
        { movieId },
        {
          headers: { Authorization: `Bearer ${this.token}` }
        }
      )
      this.favorites.push(response.data)
    },
    //Envoie une req DELETE pour supprimer un film des fav de l'user:
    async removeFavorite(favoriteId) {
      await axios.delete(`http://localhost:3000/favorites/${favoriteId}`, {
        headers: { Authorization: `Bearer ${this.token}` }
      })
      this.favorites = this.favorites.filter((fav) => fav.id !== favoriteId)
    },

    // ***** LES COMMENTAIRES : *****
    // envoie une req POST pour ajouter un comm à une video:
    async addComment({ movieId, content }) {
      const response = await axios.post(
        'http://localhost:3000/comments',
        { movieId, content },
        {
          headers: { Authorization: `Bearer ${this.token}` }
        }
      )
      this.comments.push(response.data)
    },
    // envoie une req PUT pour MAJ un comm existant:
    async updateComment({ commentId, content }) {
      const response = await axios.put(
        `http://localhost:3000/comments/${commentId}`,
        { content },
        {
          headers: { Authorization: `Bearer ${this.token}` }
        }
      )
      const index = this.comments.findIndex((cont) => cont.id === commentId)
      if (index !== -1) {
        this.comments[index] = response.data
      }
    },
    // Envoie une req pour DELETE un comm:
    async removeComment(commentId) {
      await axios.delete(`http://localhost:3000/comments/${commentId}`, {
        headers: { Authorization: `Bearer ${this.token}` }
      })
      this.comments = this.comments.filter((com) => com.id !== commentId)
    },

    // ***** LES NOTES : *****
    // Req pour ajouter une note à une vidéo:
    async addRating({ movieId, rating }) {
      const response = await axios.post(
        'http://localhost:3000/ratings',
        { movieId, rating },
        {
          headers: { Authorization: `Bearer ${this.token}` }
        }
      )
      this.ratings.push(response.data)
    },
    // Req pour MAJ une note existe d'une vidéo:
    async updateRating({ ratingId, rating }) {
      const response = await axios.put(
        `http://localhost:3000/ratings/${ratingId}`,
        { rating },
        {
          headers: { Authorization: `Bearer ${this.token}` }
        }
      )
      const index = this.ratings.findIndex((r) => r.id === ratingId)
      if (index !== -1) {
        this.ratings[index] = response.data
      }
    },
    // Req pour supprimer une note:
    async removeRating(ratingId) {
      await axios.delete(`http://localhost:3000/ratings/${ratingId}`, {
        headers: { Authorization: `Bearer ${this.token}` }
      })
      this.ratings = this.ratings.filter((rating) => rating.id !== ratingId)
    }
  }
})

/* EXPLICATION :
Bien sûr! Voici une explication détaillée du code que vous avez fourni. Ce code est un store Pinia pour gérer l'état utilisateur, l'authentification, les favoris, les commentaires et les notes dans une application Vue.js.

### Imports:

- `defineStore` : Fonction de Pinia pour définir un nouveau store.
- `axios` : Librairie pour faire des requêtes HTTP.
- `jwt_decode` : Librairie pour décoder les JSON Web Tokens (JWT).



### Raisons et Utilité

- **Séparation des responsabilités**: Le store gère l'état de l'utilisateur, ce qui rend le code plus modulaire et maintenable.
- **Réactivité**: En utilisant Pinia, le store est réactif. Les composants qui utilisent les getters ou les états seront automatiquement mis à jour lorsque l'état change.
- **Gestion des requêtes HTTP**: Toutes les requêtes HTTP nécessaires pour gérer l'authentification, les profils, les commentaires et les notes sont centralisées dans le store.
- **Sécurité**: Les actions utilisant des tokens JWT pour authentifier les requêtes garantissent que seules les requêtes autorisées peuvent accéder aux ressources protégées.
- **Expérience utilisateur**: Les getters fournissent des moyens pratiques et performants d'accéder aux données, améliorant ainsi l'expérience utilisateur.

Ce store Pinia permet de gérer efficacement l'état utilisateur dans votre application Vue.js, en centralisant la logique liée à l'authentification et à la gestion des utilisateurs.
*/
