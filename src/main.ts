import { createApp } from 'vue'
import { createPinia } from 'pinia'
import i18n from "./locale";
import App from './App.vue'
import router from './router'
import "materialize-css";
import "materialize-css/dist/css/materialize.css";
import "material-icons/iconfont/material-icons.css";
import './assets/main.css'
import { useStore } from 'vuex';

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(i18n)
app.mount('#app')
app.use(useStore())