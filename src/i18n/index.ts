import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import { localeToFlag } from '../utils'
import italianTranslation from './it-translation.json'

export const locales = {
  en: { name: 'English', icon: localeToFlag('eu') },
  it: { name: 'Italiano', icon: localeToFlag('it') }
} as const

export type Locale = keyof typeof locales

const resources = {
  it: {
    translation: italianTranslation
  }
}

void i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    interpolation: {
      escapeValue: false // React already prevents XSS
    }
  })

export default i18n
