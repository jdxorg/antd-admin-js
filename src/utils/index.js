import umiRouter from 'umi/router';
import request from './request';
import config,{ i18n } from '@/utils/sys/config';
import { Color } from '@/utils/sys/theme';
import { queryArray,pathMatchRegexp,queryAncestors,queryLayout } from './base';


const router = { ...umiRouter };
const languages = i18n.languages.map(item => item.key);

export * from './date';
export {
  router,
  i18n,
  languages,
  config,
  request,
  Color,
  queryArray,
  pathMatchRegexp,
  queryAncestors,
  queryLayout,
};