import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { allConstants } from './constants/index'

i18n
    .use(initReactI18next) // passes i18n down to react-i18next
    .init({
        resources: {
            en: { translation: allConstants.EN },
            th: { translation: allConstants.TH },
        },
        lng: "th",
        fallbackLng: ["en", "th"],
        interpolation: {
            escapeValue: false
        }
    });

export default i18n;