<template>
    <div>
        <h1>Inscription</h1>
        <form @submit.prevent="register">
            <input type="email" 
            placeholder="Email" v-model="email">
            <input type="text" 
            placeholder="Username" v-model="username">
            <input type="password" 
            placeholder="Password" v-model="password">
        </form>
    </div>
</template>
<script>
import {useFacticeUserStore} from '@/stores/facticeUserStore';

export default {
    data() {
        return {
            email : "",
            username : "",
            password : "",
        };
    },    
    methods : {
        async register() {
            const userStore = useFacticeUserStore();
            try {
                await userStore.register({
                    email: this.email,
                    username: this.username,
                    password: this.password
                });
                this.$forceUpdate.push({name: 'profile'})
            } catch (error) {
                alert('Inscription échouée')
            }
        }
    }
}
</script>
<style lang="">
    
</style>