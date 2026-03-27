import { createApp } from 'vue'
import './assets/css/main.css'
import router from './router'
import App from './App.vue'
import { createPinia } from 'pinia'


// -- Criando o App
const app = createApp(App)

// -- Iniciando o Router
app.use(router)

// -- Inciando o Pinia
const pinia = createPinia()
app.use(pinia)

// -- Montando o App
app.mount('#app')