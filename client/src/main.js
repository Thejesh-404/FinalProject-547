import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import vue3GoogleLogin from "vue3-google-login"
import '@mdi/font/css/materialdesignicons.css'

const CLIENT_ID = "537075312066-2s15su7b3r2qqb1grvbfpcsj9g6u5tr4.apps.googleusercontent.com"


import './assets/main.css'

// Vuetify
import 'vuetify/styles'
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'

const vuetify = createVuetify({
    components,
    directives,
})

const app = createApp(App)

app.use(router)
app.use(vue3GoogleLogin,{clientId:CLIENT_ID})
app.use(vuetify)
app.mount('#app')