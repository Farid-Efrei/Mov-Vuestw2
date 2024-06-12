import { defineStore } from 'pinia'
import axios from 'axios'

export const useMovieAppStore = defineStore('movie', {
  state: () => ({
    appreciations: [], // État pour stocker les commentaires et les notes d'une vidéo
    isFavorite: false // État pour indiquer si une vidéo est en favoris ou non
  }),
  actions: {
    async fetchCommentsAndRatings(movieId) {
      try {
        const response = await axios.get(`http://localhost:3000/api/appreciations/${movieId}`)
        this.appreciations = response.data
        console.log(this.appreciations)
      } catch (error) {
        console.error('Echec du Fetch des commentaires et notes', error)
      }
    },

    // version modif perp
    async addAnAppreciation({ movieId, comment, rating }) {
      try {
        await axios.post(`http://localhost:3000/api/favoris/create-movie`, { TMDB_Id: movieId })
        const response = await axios.post(
          'http://localhost:3000/api/appreciations',
          {
            Id_Video: movieId,
            commentaire: comment,
            note: rating,
            Id_Utilisateur: this.user.id
          },
          {
            headers: { Authorization: `Bearer ${this.token}` }
          }
        )
        this.comments.push({
          id: response.data.Id_Appreciation,
          comment: response.data.commentaire,
          movieId
        })
        this.ratings.push({
          id: response.data.Id_Appreciation,
          rating: response.data.note,
          movieId
        })
      } catch (error) {
        console.error("Erreur lors de l'ajout d'une Appréciations", error)
      }
    },

    async addAppreciation(movieId, userId, comment, rating) {
      try {
        const payload = {
          Id_Video: movieId,
          Id_Utilisateur: userId,
          commentaire: comment,
          note: rating
        }
        console.log("Payload envoyé à l'API : ", payload)
        const response = await axios.post(`http://localhost:3000/api/appreciations`, payload)
        this.appreciations.push(response.data)
        console.log(this.appreciations)
      } catch (error) {
        console.error("Echec de l'ajout de l'appréciation", error)
        console.log(error.response.data) //Affiche le message d'erreur du serveur.
      }
    },
    async updateAppreciation(appreciationId, comment, rating) {
      try {
        const response = await axios.put(
          `http://localhost:3000/api/appreciations/${appreciationId}`,
          {
            comment,
            rating
          }
        )
        const index = this.appreciations.findIndex((app) => app.Id_Appreciation === appreciationId)
        if (index !== -1) {
          this.appreciations[index] = { ...this.appreciations[index], ...response.data }
        }
      } catch (error) {
        console.error("Echec de la MAJ de l'appréciation", error)
      }
    },
    async deleteAppreciation(appreciationId) {
      try {
        await axios.delete(`http://localhost:3000/api/appreciations/${appreciationId}`)
        this.appreciations = this.appreciations.filter((app) => app.id !== appreciationId)
      } catch (error) {
        console.error("Echec de la suppression de l'appréciation", error)
      }
    },

    async toggleFavorite(movieId) {
      try {
        if (this.isFavorite) {
          // Si la vidéo est déjà en favoris, envoie une requête DELETE pour la retirer des favoris
          await axios.delete(`http://localhost:3000/api/favoris/${movieId}`)
          this.isFavorite = false
        } else {
          // Si la vidéo n'est pas en favoris, envoie une requête POST pour l'ajouter aux favoris
          await axios.post(`http://localhost:3000/api/favoris${movieId}`)
          this.isFavorite = true
        }
      } catch (error) {
        console.error("Echec d'ajout/retrait des Favoris", error)
      }
    },
    async toggleFavorite2(movieId) {
      try {
        this.isFavorite = !this.isFavorite // Optimistically toggle favorite for immediate UI update
        const method = this.isFavorite ? 'post' : 'delete'
        await axios[method](`http://localhost:3000/api/favorites`, { Id_Video: movieId })
      } catch (error) {
        this.isFavorite = !this.isFavorite // Revert on failure
        console.error('Failed to toggle favorite', error)
      }
    }
    // async toggleFavorite3() {
    //   try {
    //     const videoId = this.videoId // Assurez-vous que videoId est correctement défini
    //     const userId = this.userStore.user ? this.userStore.user.id : null

    //     if (!userId) {
    //       throw new Error("L'utilisateur n'est pas connecté")
    //     }

    //     if (this.isFavorite) {
    //       await axios.delete(`http://localhost:3000/api/favoris/${videoId}`, {
    //         headers: { Authorization: `Bearer ${this.userStore.token}` }
    //       })
    //       this.userStore.removeFavorite(videoId)
    //     } else {
    //       await axios.post(
    //         `http://localhost:3000/api/favoris`,
    //         {
    //           Id_Video: videoId,
    //           Id_Utilisateur: userId
    //         },
    //         {
    //           headers: { Authorization: `Bearer ${this.userStore.token}` }
    //         }
    //       )
    //       this.userStore.addFavorite(videoId)
    //     }
    //   } catch (error) {
    //     console.error("Erreur lors de l'ajout/retrait des favoris", error)
    //   }
    // }
  }
})
