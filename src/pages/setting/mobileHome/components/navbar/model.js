/*
 * @Author: dexiaojiang 289608944@qq.com
 * @Description: In User Settings Edit
 * @Date: 2019-08-26 18:23:34
 * @LastEditTime: 2019-09-02 11:11:36
 * @LastEditors: dexiaojiang 289608944@qq.com
 */
import api from 'api'

const { removeNavbar, createNavbar, updateNavbar, queryNavbar } = api

export function* removeNavbarFunc({ payload }, { call }) {
  return yield call(removeNavbar, { id: payload })
}

export function* createNavbarFunc({ payload }, { call }) {
  return yield call(createNavbar, payload)
}

export function* updateNavbarFunc({ payload }, { call }) {
  return yield call(updateNavbar, payload)
}

export function* showModalNavbar({ payload }, { call, put }) {
  const { currentItem } = payload
  yield put({ type: 'modal/showModal', payload: { type: 'modal' } })
  if (currentItem) {
    const result = yield call(queryNavbar, { id: currentItem.id })
    const { success, data } = result
    if (success) {
      yield put({ type: 'modal/setItem', payload: { item: data } })
    }
  }
}
