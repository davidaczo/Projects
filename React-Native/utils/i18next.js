import i18next from 'i18next';
import { initReactI18next } from 'react-i18next'
import ro from '../locales/ro.json'
import hu from '../locales/hu.json'
import en from '../locales/en.json'
export const languageResources = {
    ro: {
        translation: ro
    },
    hu: {
        translation: hu
    },
    en: {
        translation: en
    }
}

i18next.use(initReactI18next).init({
    compatibilityJSON: 'v3',
    lng: 'hu',
    fallbackLanguage: 'ro',
    resources: languageResources
})

export default i18next;