import axios from "axios";
import requete from "./api";

const getDatas = {
    
    async getMovieById(movieId) {
        try {
            const movieResp = await requete.get(`/movie/${movieId}`);
            return movieResp
        } catch (error) {
           console.error('Problème de récupération des infos', error) 
        }
    },

    async getMoviePhotosProdById(movieId) {
        try {
            const movieImageResp = await requete.get(`/movie/${movieId}/images`);
            return movieImageResp
            
        } catch (error) {
            console.error('erreur lors de la récupération des images', error);
        }
    } 
    
}

export default getDatas;