import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia, PiniaVuePlugin } from 'pinia'


const app = createApp(App)
// 1. Créez une instance de Pinia
const pinia = createPinia()

// 2. Installez Pinia en tant que plugin Vue
app.use(pinia)

app.use(router)

app.mount('#app')
