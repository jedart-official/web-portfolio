import {defineStore} from "pinia";
import {nextTick, ref} from "vue";
import {useI18n} from "vue-i18n";

export const useMainStore = defineStore('main', () => {
    const availableScreens = ['home', 'stack', 'projects'];
    const availableLocales = ['ru', 'en'];
    const savedScreen = localStorage.getItem('activeScreen');
    const activeScreen = ref(availableScreens.includes(savedScreen) ? savedScreen : 'home');
    const {locale} = useI18n();
    const savedLocale = localStorage.getItem('lang');

    if (availableLocales.includes(savedLocale)) {
        locale.value = savedLocale;
    }
    const showDown = ref(false);
    const scroller = ref(null);
    const setScreen = (id) => {
        if (!availableScreens.includes(id)) return;

        activeScreen.value = id;
        localStorage.setItem('activeScreen', id);
        setTimeout(() => {
            checkShowDown();
        }, 400)

    }
    const isActive = (id) => activeScreen.value === id;



    const setLang = (lang) => {
        if (!availableLocales.includes(lang)) return;

        locale.value = lang;
        localStorage.setItem("lang", lang);
    };

    function checkShowDown() {
        const el = scroller.value;

        if (!el) return;
        const nearBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 16;
        showDown.value = !nearBottom;
    }

    function onScroll() {

        checkShowDown()
    }

    return {
        activeScreen, setScreen, isActive, setLang, locale, showDown, scroller, onScroll
    }
})
