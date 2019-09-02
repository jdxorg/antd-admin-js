export default {
  namespace: 'modal',
  state: {
    visible: false,
    item: {},
  },
  reducers: {
    showModal(state, action) {
      return { ...state, visible: true, ...action.payload }
    },
    hideModal(state) {
      return { ...state, visible: false, item: {} }
    },
    setItem(state, action) {
      const { item } = action.payload
      return { ...state, item }
    },
  },
}
