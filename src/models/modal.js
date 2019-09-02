/*
 * @Author: dexiaojiang 289608944@qq.com
 * @Description: In User Settings Edit
 * @Date: 2019-08-23 15:20:33
 * @LastEditTime: 2019-08-27 11:03:15
 * @LastEditors: dexiaojiang 289608944@qq.com
 */
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
