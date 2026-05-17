import {defineStore} from "pinia";
import {computed, ref} from "vue";
import {useI18n} from "vue-i18n";

export const useMainStore = defineStore('main', () => {
    const availableScreens = ['home', 'stack', 'projects'];
    const availableLocales = ['ru', 'en'];
    const availableThemes = ['dark', 'light'];
    const savedScreen = localStorage.getItem('activeScreen');
    const savedTheme = localStorage.getItem('theme');
    const activeScreen = ref(availableScreens.includes(savedScreen) ? savedScreen : 'home');
    const activeTheme = ref(availableThemes.includes(savedTheme) ? savedTheme : 'dark');
    const {locale} = useI18n();
    const savedLocale = localStorage.getItem('lang');

    if (availableLocales.includes(savedLocale)) {
        locale.value = savedLocale;
    }

    const themeClass = computed(() => `theme-${activeTheme.value}`);

    const applyTheme = (theme) => {
        if (typeof document === 'undefined') return;

        document.documentElement.classList.toggle('theme-light', theme === 'light');
        document.documentElement.classList.toggle('theme-dark', theme === 'dark');
        document.body.classList.toggle('theme-light', theme === 'light');
        document.body.classList.toggle('theme-dark', theme === 'dark');
    };

    applyTheme(activeTheme.value);

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

    const setTheme = (theme) => {
        if (!availableThemes.includes(theme)) return;

        activeTheme.value = theme;
        localStorage.setItem('theme', theme);
        applyTheme(theme);
    };

    const toggleTheme = () => {
        setTheme(activeTheme.value === 'dark' ? 'light' : 'dark');
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
        activeScreen, setScreen, isActive, setLang, locale, showDown, scroller, onScroll, activeTheme, themeClass, setTheme, toggleTheme
    }
})
