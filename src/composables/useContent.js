import {useI18n} from "vue-i18n";
import {computed} from "vue";
import ru from '@/content/ru.json'
import en from '@/content/en.json'

export function useContent() {
    const {locale} = useI18n()
    const content = computed(() => (locale.value === 'ru' ? ru : en))
    return {content}
}