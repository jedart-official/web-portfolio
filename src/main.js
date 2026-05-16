import './assets/css/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import ru from './locales/ru.json'
import en from './locales/en.json'
import {createPinia} from "pinia";
import {createI18n} from "vue-i18n";

const i18n = createI18n({
    locale: 'ru',
    fallbackLocale: 'ru',
    legacy: false,
    messages: {ru, en}
})
const pinia = createPinia()
const app = createApp(App)

app.use(i18n)
app.use(pinia).mount('#app')
