import { createApp } from 'vue'
import { createPinia } from 'pinia'
import router from './router/index.js'
import axios from 'axios'
import App from './App.vue'

axios.defaults.withCredentials = true
axios.defaults.baseURL = '/api'

const app = createApp(App)

app.use(createPinia())
app.use(router)

app.mount('#app')