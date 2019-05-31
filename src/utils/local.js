import { i18n } from './config'
import store from 'store'
import umiRouter from 'umi/router'
const { defaultLanguage } = i18n
const languages = i18n.languages.map(item => item.key)

const getLocale=()=>{
  return store.get('language')
}

const setLocale=language=> {
  if (getLocale() !== language) {
    store.set('language', language)
    umiRouter.push({
      pathname: `${window.location.pathname}`,
      search: window.location.search,
    })
  }
}

export function lang(){
  return getLocale()||defaultLanguage
}

export {
  defaultLanguage,
  languages,
  getLocale,
  setLocale
}