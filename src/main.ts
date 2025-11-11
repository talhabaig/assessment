import { createApp } from 'vue'
import './style.css'
import App from './App.vue'

// Vuetify
import { createVuetify } from 'vuetify'
import * as components from 'vuetify/components'
import * as directives from 'vuetify/directives'
import 'vuetify/styles'
import '@mdi/font/css/materialdesignicons.css'

// Router and Store
import router from './router'
import store from './store'

const vuetify = createVuetify({
  components,
  directives,
})

const app = createApp(App)

app.use(vuetify)
app.use(router)
app.use(store)

app.mount('#app')