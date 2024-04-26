import axios from "axios";

const TOKTOK = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDRhNjBhODQyOThmNTY0Mjc4OWYzYzMyNmFhYWM4MSIsInN1YiI6IjY1ZmMyNDg5MDQ3MzNmMDE0YWU2NDVkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N2hhb55mlVrjwrMp1hGYCOe0938vWTHKxmZlW4CB1t4"

const REGION = "fr-FR"
// la structure du chemin vers le poster d'une video est le chemin de base suivi d'un lien vers le poster_path
const BASE_URL_IMAGE = 'https://image.tmdb.org/t/p/original/';

const requete = axios.create({
    baseURL:'https://api.themoviedb.org/3',
    headers: {Authorization: 'Bearer ' + TOKTOK},
    params: {
        language: REGION,
    }
});

export default requete; 



