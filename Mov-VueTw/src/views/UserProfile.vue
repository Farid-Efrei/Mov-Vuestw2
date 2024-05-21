<template>
    <div>
        <h1>Profil Utilisateur</h1>
        <div v-if="profile">
            <p>Email : {{ profile.email }}</p>
            <p>Username: {{ profile.username }}</p>

            <h2>Favoris</h2>
            <ul>
                <li v-for="favorite in favorites" :key="favorite.id">{{ favorite.title }}</li>
            </ul>

            <h2>Commentaires</h2>
            <ul>
                <li v-for="comment in comments" :key="comment.id">
                    {{ comment.content }} on {{ comment.movieTitle }}
                </li>
            </ul>

            <h2>Notes</h2>
            <ul>
                <li v-for="rating in ratings" :key="rating.id">
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
import {useFacticeUserStore} from '@stores/facticeUserStore'

export default {
    data() {
        return {
            password : {
                oldPassword : '',
                newPassword : ''
            }
        };
    },
    computed : {
        profile(){
            const userStore = useFacticeUserStore();
            return userStore.userProfile;
        },

        favorites(){
            const userStore = useFacticeUserStore();
            return userStore.userFavorites;
        },
        comments(){
            const userStore = useFacticeUserStore();
            return userStore.movieComments;
        },
        ratings(){
            const userStore = useFacticeUserStore();
            return userStore.userRatings;
        }
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

    mounted(){
        const userStore = useFacticeUserStore();
        userStore.fetchProfile();
        userStore.fetchFavorites();
        userStore.fetchComments(); // Passer les paramètres appropriés si nécessaire
    userStore.fetchRatings(); // Passer les paramètres appropriés si nécessaire
    }
}
</script>
<style lang="">

</style>