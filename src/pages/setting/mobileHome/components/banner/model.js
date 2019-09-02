/*
 * @Author: dexiaojiang 289608944@qq.com
 * @Description: In User Settings Edit
 * @Date: 2019-08-26 18:23:34
 * @LastEditTime: 2019-08-27 09:55:24
 * @LastEditors: dexiaojiang 289608944@qq.com
 */
import api from 'api'

const { removeBanner, createBanner, updateBanner, queryBanner } = api

export function* removeBannerFunc({ payload }, { call }) {
  return yield call(removeBanner, { id: payload })
}

export function* createBannerFunc({ payload }, { call }) {
  return yield call(createBanner, payload)
}

export function* updateBannerFunc({ payload }, { call }) {
  return yield call(updateBanner, payload)
}

export function* showModalBanner({ payload }, { call, put }) {
  const { currentItem } = payload
  yield put({ type: 'modal/showModal', payload: { type: 'modal' } })
  if (currentItem) {
    const result = yield call(queryBanner, { id: currentItem.id })
    const { success, data } = result
    if (success) {
      yield put({ type: 'modal/setItem', payload: { item: data } })
    }
  }
}
