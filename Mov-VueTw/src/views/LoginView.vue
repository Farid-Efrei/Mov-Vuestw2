<template>
    <div>
        <h1>Connexion</h1>
        <form @submit.prevent="login" >
            <input type="email" placeholder="Email"
            v-model="email">
            <input type="password" placeholder="Password"
            v-model="password">
            <button type="submit">
                Connexion
            </button>
        </form>
        
    </div>
</template>

<script>
import {useFacticeUserStore} from '@/stores/facticeUserStore'

export default {
    data() {
        return {
            email : '',
            password : ''
        };
    },
    methods : {
        async login() {
            const userStore = useFacticeUserStore();
            try {
                await userStore.login({
                    email : this.email,
                    password : this.password
                });
                this.$router.push({name:'profile'});
            } catch (error) {
                alert('Identifiants de connexion invalides');
            }
        }
    }
}
</script>
<style lang="">
    
</style>