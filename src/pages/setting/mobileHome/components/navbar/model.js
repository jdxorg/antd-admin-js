/*
 * @Author: dexiaojiang 289608944@qq.com
 * @Description: In User Settings Edit
 * @Date: 2019-08-26 18:23:34
 * @LastEditTime: 2019-08-27 09:55:24
 * @LastEditors: dexiaojiang 289608944@qq.com
 */
import { message } from 'antd'
import api from 'api'

const { removeNavbar, createNavbar, updateNavbar, queryNavbar } = api

export function* removeNavbarFunc({ payload }, { call, put }) {
  const result = yield call(removeNavbar, { id: payload })
  const { success, msg } = result
  if (success) {
    yield put({
      type: 'query',
    })
  } else {
    message.error(msg)
  }
}

export function* createNavbarFunc({ payload }, { call, put }) {
  const result = yield call(createNavbar, payload)
  const { success, data, msg } = result
  if (success && data) {
    yield put({ type: 'query' })
    yield put({ type: 'modal/hideModal' })
  } else {
    message.error(msg)
  }
}

export function* updateNavbarFunc({ payload }, { call, put }) {
  const result = yield call(updateNavbar, payload)
  const { success, data, msg } = result
  if (success && data) {
    yield put({ type: 'query' })
    yield put({ type: 'modal/hideModal' })
  } else {
    message.error(msg)
  }
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
