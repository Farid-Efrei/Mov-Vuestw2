import { defineStore } from 'pinia'
import axios from 'axios'
// Store valable UNIQUEMENT si les tables commentaires et notes existaient. Ici on a une Table APPRECIATION dans la bdd, contenant les commentaires et les notes qui n'ont pas d'Id propre. Ces méthodes ne peuvent donc pas être utilisées.
export const useMovieStore = defineStore('movie', {
  state: () => ({
    comments: [],
    ratings: [],
    isFavorite: false
  }),
  actions: {
    async fetchCommentsAndRatings(movieId) {
      try {
        const response = await axios.get(`http://localhost:3000/api/films/${movieId}/appreciations`)
        this.comments = response.data.comments
        this.ratings = response.data.ratings
      } catch (error) {
        console.error('Echec du Fetch des commentaires et notes', error)
      }
    },
    async addComment(movieId, text) {
      try {
        const response = await axios.post(`localhost:3000/api/appreciations`, { movieId, text })
        this.comments.push(response.data)
      } catch (error) {
        console.error("Echec de l'ajout du commentaire", error)
      }
    },
    async updateComment(commentId, text) {
      try {
        const response = await axios.put(`http://localhost:3000/api/appreciations/${commentId}`, {
          text
        })
        const index = this.comments.findIndex((comm) => comm.id === commentId)
        if (index !== -1) {
          this.comments[index].text = response.data.text
        }
      } catch (error) {
        console.error('Echec de la MAJ du commentaire', error)
      }
    },
    async deleteComment(commentId) {
      try {
        await axios.delete(`http://localhost:3000/api/appreciations/${commentId}`)
        this.comments = this.comments.filter((comm) => comm.id !== commentId)
      } catch (error) {
        console.error('Echec de la suppression du commentaire', error)
      }
    },
    async addRating(movieId, rating) {
      try {
        const response = await axios.post(`http://localhost:3000/api/appreciations`, {
          movieId,
          rating
        })
        this.ratings.push(response.data)
      } catch (error) {
        console.error("Echec de l'ajout de la note", error)
      }
    },
    async updateRating(ratingId, rating) {
      try {
        const response = await axios.put(`http://localhost:3000/api/appreciations/${rating}`, {
          rating
        })
        const index = this.ratings.findIndex((rat) => rat.id === ratingId)
        if (index !== -1) {
          this.ratings[index].rating = response.data.rating
        }
      } catch (error) {
        console.error('Echec de la modification de la note', error)
      }
    },
    async deleteRating(ratingId) {
      try {
        await axios.delete(`http://localhost:3000/api/appreciations/${ratingId}`)
      } catch (error) {
        console.error('Echec de la suppression de la note', error)
      }
    },
    async toggleFavorite(movieId) {
      try {
        if (this.isFavorite) {
          await axios.delete(`http://localhost:3000/api/favoris/${movieId}`)
          this.isFavorite = false
        } else {
          await axios.post(`http://localhost:3000/api/favoris`, { movieId })
          this.isFavorite = true
        }
      } catch (error) {
        console.error("Echec d'ajout/retrait des Favoris", error)
      }
    }
  }
})
