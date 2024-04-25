import axios from "axios";

const toktok = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJkZDRhNjBhODQyOThmNTY0Mjc4OWYzYzMyNmFhYWM4MSIsInN1YiI6IjY1ZmMyNDg5MDQ3MzNmMDE0YWU2NDVkZSIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.N2hhb55mlVrjwrMp1hGYCOe0938vWTHKxmZlW4CB1t4"
// eslint-disable-next-line no-unused-vars
const region = "day?language=fr-FR"

export default axios.create({
    baseURL: "https://api.themoviedb.org/3/",
    headers: {
        Authorization: ` ${toktok}`
    }
});

