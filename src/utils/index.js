import { cloneDeep, isString, flow, curry } from 'lodash'
import umiRouter from 'umi/router'
import pathToRegexp from 'path-to-regexp'
import { i18n } from './config'

export classnames from 'classnames'
export config from './config'
export request from './request'
export { Color } from './theme'

export const { defaultLanguage } = i18n
export const languages = i18n.languages.map(item => item.key)

/**
 * Query objects that specify keys and values in an array where all values are objects.
 * @param   {array}         array   An array where all values are objects, like [{key:1},{key:2}].
 * @param   {string}        key     The key of the object that needs to be queried.
 * @param   {string}        value   The value of the object that needs to be queried.
 * @return  {object|undefined}   Return frist object when query success.
 */
export function queryArray(array, key, value) {
  if (!Array.isArray(array)) {
    return
  }
  return array.find(_ => _[key] === value)
}

/**
 * Convert an array to a tree-structured array.
 * @param   {array}     array     The Array need to Converted.
 * @param   {string}    id        The alias of the unique ID of the object in the array.
 * @param   {string}    parentId       The alias of the parent ID of the object in the array.
 * @param   {string}    children  The alias of children of the object in the array.
 * @return  {array}    Return a tree-structured array.
 */
export function arrayToTree(
  array,
  id = 'id',
  parentId = 'pid',
  children = 'children'
) {
  const result = []
  const hash = {}
  const data = cloneDeep(array)

  data.forEach((item, index) => {
    hash[data[index][id]] = data[index]
  })

  data.forEach(item => {
    const hashParent = hash[item[parentId]]
    if (hashParent) {
      !hashParent[children] && (hashParent[children] = [])
      hashParent[children].push(item)
    } else {
      result.push(item)
    }
  })
  return result
}
/**
 * Adjust the router to automatically add the current language prefix before the pathname in push and replace.
 */
const myRouter = { ...umiRouter }


export const router = myRouter

/**
 * Whether the path matches the regexp if the language prefix is ignored, https://github.com/pillarjs/path-to-regexp.
 * @param   {string|regexp|array}     regexp     Specify a string, array of strings, or a regular expression.
 * @param   {string}                  pathname   Specify the pathname to match.
 * @return  {array|null}              Return the result of the match or null.
 */
export function pathMatchRegexp(regexp, pathname) {
  return pathToRegexp(regexp).exec(pathname)
}

export function queryAncestors(menus,pathname){
  let array = pathname.substring(1,pathname.length).split('/')
  let path = `/${array[0]}`
  let root = menus.find(_=>_.route && pathMatchRegexp(_.route,path) )
  let selectedItems=[root]
  const getMenu = (_menus,path) =>{
    root = _menus.find(_=>_.route && pathMatchRegexp(_.route,path ) )
    if( root )
      selectedItems.push(root)
  }
  for(let i=0;i<array.length;i++){
    if( i==0 )continue;
    path += `/${array[i]}`
    if( root && root.children ){
      getMenu(root.children,path)
    }
  }
  return selectedItems
}

/**
 * Query which layout should be used for the current path based on the configuration.
 * @param   {layouts}     layouts   Layout configuration.
 * @param   {pathname}    pathname  Path name to be queried.
 * @return  {string}   Return frist object when query success.
 */
export function queryLayout(layouts, pathname) {
  let result = 'public'

  const isMatch = regepx => {
    return regepx instanceof RegExp
      ? regepx.test(pathname)
      : pathMatchRegexp(regepx, pathname)
  }

  for (const item of layouts) {
    let include = false
    let exclude = false
    if (item.include) {
      for (const regepx of item.include) {
        if (isMatch(regepx)) {
          include = true
          break
        }
      }
    }

    if (include && item.exclude) {
      for (const regepx of item.exclude) {
        if (isMatch(regepx)) {
          exclude = true
          break
        }
      }
    }

    if (include && !exclude) {
      result = item.name
      break
    }
  }

  return result
}

// /userinfo/2144/id => ['/userinfo','/useinfo/2144,'/userindo/2144/id']
// eslint-disable-next-line import/prefer-default-export
export function urlToList(url) {
  const urllist = url.split('/').filter(i => i);
  return urllist.map((urlItem, index) => `/${urllist.slice(0, index + 1).join('/')}`);
}