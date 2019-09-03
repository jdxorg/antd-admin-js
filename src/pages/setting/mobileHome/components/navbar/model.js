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
