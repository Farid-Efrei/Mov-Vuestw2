<template>
    <div class="flex-row m-5">
        <h1 class="text-xl">Profil Utilisateur de {{profile.username }}</h1>
        <div v-if="profile" class="flex-row justify-center">
            <p>Email : {{ profile.email }}</p>
            <p>Username: {{ profile.username }}</p>

            <h2>Favoris</h2>
            <ul>
                <li v-for="favorite in favorites" :key="favorite.id">{{ favorite.title }}</li>
            </ul>

            <h2>Commentaires</h2>
            <ul>
                <li v-for="comment in userComments" :key="comment.id">
                    {{ comment.content }} on {{ comment.movieTitle }}
                </li>
            </ul>

            <h2>Notes</h2>
            <ul>
                <li v-for="rating in userRatings" :key="rating.id">
                    {{ rating.rating }} étoiles pour {{ rating.movieTitle }}
                </li>
            </ul>

            <h2>Mise à Jour du Profil</h2>
            <form @submit.prevent="updateProfile">
                <input type="email" placeholder="Email" v-model="profile.email">
                <input type="text" placeholder="Username" v-model="profile.username">
                <button type="submit">Mettre A jour le Profil</button>
            </form>

            <h2> Changer Password</h2>
            <form @submit.prevent="changePassword">
                <input type="password" placeholder="Ancien Password" v-model="password.oldPassword">
                <input type="password" placeholder="Nouveau Password"
                v-model="password.newPassword">
                <button type="submit" class="btn btn-primary">
                    Changer Password
                </button>
            </form>

            <button @click="deleteAccount"> 
                Supprimer le compte 
            </button>

        </div>
    </div>
</template>
<script>
import {useFacticeUserStore} from '@/stores/facticeUserStore'

export default {
    data() {
        return {
            profile: {},
            favorite: {},
            comments: {},
            ratings:{},
            password : {
                oldPassword : '',
                newPassword : '',
                
            }
        };
    },
    
    methods:{
        async updateProfile(){
            const userStore = useFacticeUserStore();
            await userStore.updateProfile(this.profile);
        },
        async changePassword(){
            // Pour simuler, pas besoin de réelle action.
            console.log('Password changend', this.password);
        },
        async deleteAccount(){
            const userStore = useFacticeUserStore();
            await userStore.deleteAccount()
            alert('compte supprimé')
            this.$router.push({name: 'home'});
        }
    },

    async mounted(){
        const userStore = useFacticeUserStore();
       await userStore.fetchProfile();
        await userStore.fetchFavorites();
        await userStore.fetchComments(); // Passer les paramètres appropriés si nécessaire
    await userStore.fetchRatings(); // Passer les paramètres appropriés si nécessaire
    this.profile = userStore.userProfile;
    this.favorites = userStore.userFavorites;
    this.comments = userStore.movieComments;
    this.ratings = userStore.userRatings;
    }
}
</script>
<style lang="">

</style>