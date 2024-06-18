import { defineStore } from 'pinia'
import axios from 'axios'
import { useUserStore } from './user'

export const useMovieAppStore = defineStore('movie', {
  state: () => ({
    appreciations: [], // État pour stocker les commentaires et les notes d'une vidéo
    token: localStorage.getItem('token'),
    isFavorite: false // État pour indiquer si une vidéo est en favoris ou non
  }),
  actions: {
    async fetchCommentsAndRatings(movieId) {
      const userStore = useUserStore()
      try {
        const response = await axios.get(`http://localhost:3000/api/appreciations/${movieId}`, {
          headers: { Authorization: `Bearer ${userStore.token}` }
        })
        this.appreciations = response.data
        console.log(this.appreciations)
      } catch (error) {
        console.error('Echec du Fetch des commentaires et notes', error)
      }
    },

    async fetchAppreciationsByVideo(videoId) {
      const userStore = useUserStore()
      try {
        const response = await axios.get(`http://localhost:3000/api/appreciations/${videoId}`, {
          headers: { Authorization: `Bearer ${userStore.token}` }
        })
        this.appreciations = response.data
        console.log(this.appreciations)
      } catch (error) {
        console.error('Erreur lors de la récupération des appréciations', error)
        this.appreciations = []
      }
    },
    async fetchAppreciationsByUser(userId) {
      try {
        const userStore = useUserStore()
        const response = await axios.get(`/api/appreciations/utilisateurs/${userId}`, {
          headers: { Authorization: `Bearer ${userStore.token}` }
        })
        return response.data
      } catch (error) {
        console.error('Erreur lors de la récupération des appréciations par utilisateur', error)
        throw error
      }
    },

    async addOrUpdateAppreciation(videoId, { commentaire, note, magicRoute }) {
      const userStore = useUserStore()
      try {
        const userId = userStore.user ? userStore.user.id : null
        if (!userId) {
          throw new Error('Utilisateur non connecté.')
        }
        // Récupérer les détails de la vidéo depuis TMDB
        const videoDetails = await tmdbService.getVideoDetails(videoId, magicRoute)
        if (!videoDetails) {
          throw new Error('Impossible de récupérer les détails de la vidéo.')
        }
        // Déterminer le type de vidéo (Film ou Série)
        const type = magicRoute === 'film' ? 'Film' : 'Série'

        // Créer ou mettre à jour la vidéo dans la base de données
        await axios.post(
          'http://localhost:3000/api/videos',
          {
            Id_Video: videoId,
            titre: videoDetails.title || videoDetails.name,
            duree: videoDetails.runtime || videoDetails.episode_run_time[0] || 0,
            noteInterne: note,
            TYPE: type,
            Id_genre: videoDetails.genres[0]?.id || null // Assurez-vous que le genre existe
          },
          {
            headers: { Authorization: `Bearer ${userStore.token}` }
          }
        )
        // Ajouter ou mettre à jour l'appréciation
        await axios.post(
          'http://localhost:3000/api/appreciations',
          { Id_Video: videoId, commentaire, note, Id_Utilisateur: userId, magicRoute },
          { headers: { Authorization: `Bearer ${userStore.token}` } }
        )
        await this.fetchAppreciationsByVideo(videoId)
      } catch (error) {
        console.error("Erreur lors de l'ajout ou de la mise à jour de l'appréciation", error)
      }
    },
    async addOrUpdateAppreciation2({ movieId, comment, rating, magicRoute, appreciationId }) {
      try {
        const userStore = useUserStore()
        if (!userStore.isAuthenticated) {
          throw new Error('Utilisateur non connecté.')
        }

        const payload = {
          Id_Video: movieId,
          Id_Utilisateur: userStore.user.id,
          commentaire: comment,
          note: rating !== 0 ? rating : null,
          magicRoute
        }

        let response
        if (appreciationId) {
          response = await axios.put(
            `http://localhost:3000/api/appreciations/${appreciationId}`,
            payload,
            {
              headers: { Authorization: `Bearer ${userStore.token}` }
            }
          )
        } else {
          response = await axios.post('http://localhost:3000/api/appreciations', payload, {
            headers: { Authorization: `Bearer ${userStore.token}` }
          })
        }

        await this.fetchCommentsAndRatings(movieId)
        return response.data
      } catch (error) {
        console.error("Erreur lors de l'ajout ou de la mise à jour de l'appréciation", error)
        throw error
      }
    },

    async deleteTheAppreciation(appreciationId, videoId) {
      const userStore = useUserStore()
      try {
        await axios.delete(`http://localhost:3000/api/appreciations/${appreciationId}`, {
          headers: { Authorization: `Bearer ${userStore.token}` }
        })
        await this.fetchAppreciationsByVideo(videoId)
      } catch (error) {
        console.error("Erreur lors de la suppression de l'appréciation", error)
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
    async addAppreciations(videoDetails, commentaire, note) {
      try {
        const response = await axios.post(
          'http://localhost:3000/api/appreciations',
          {
            videoDetails,
            Id_Utilisateur: this.user.id,
            commentaire,
            note
          },
          {
            headers: { Authorization: `Bearer ${this.token}` }
          }
        )
        this.appreciations.push(response.data)
      } catch (error) {
        console.error('Erreur lors de l’ajout de l’appréciation :', error)
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
        const userStore = useUserStore()
        await axios.delete(`http://localhost:3000/api/appreciations/${appreciationId}`, {
          headers: { Authorization: `Bearer ${userStore.token}` }
        })
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
