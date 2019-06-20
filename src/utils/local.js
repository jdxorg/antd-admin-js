import { router,i18n } from 'utils'
import store from 'store'
const { defaultLanguage } = i18n
const languages = i18n.languages.map(item => item.key)

const getLocale=()=>{
  return store.get('language')
}

const setLocale=language=> {
  if (getLocale() !== language) {
    store.set('language', language)
    router.push({
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