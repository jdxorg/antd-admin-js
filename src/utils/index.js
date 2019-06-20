import umiRouter from 'umi/router'
import request from './request'
import config,{ i18n } from '@/sys/config'
import { Color } from '@/sys/theme'
import { queryArray,arrayToTree,pathMatchRegexp,queryAncestors,queryLayout } from './base'

const router = { ...umiRouter }
const languages = i18n.languages.map(item => item.key)

export {
  router,
  i18n,
  languages,
  config,
  request,
  Color,
  queryArray,
  arrayToTree,
  pathMatchRegexp,
  queryAncestors,
  queryLayout
}