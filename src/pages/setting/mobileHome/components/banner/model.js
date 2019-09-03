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
