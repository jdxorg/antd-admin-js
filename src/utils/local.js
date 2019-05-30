import { i18n } from './config'
import store from 'store'

export const { defaultLanguage } = i18n
export const languages = i18n.languages.map(item => item.key)
export function getLocale() {
  return store.get('language')
}

export function setLocale(language) {
  if (getLocale() !== language) {
    store.set('language', language)
    // umiRouter.push({
    //   pathname: `/${window.location.pathname}}`,
    //   search: window.location.search,
    // })
  }
}
