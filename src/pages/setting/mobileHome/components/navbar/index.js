/*
 * @Author: dexiaojiang 289608944@qq.com
 * @Description: In User Settings Edit
 * @Date: 2019-08-26 18:08:21
 * @LastEditTime: 2019-08-29 16:58:45
 * @LastEditors: dexiaojiang 289608944@qq.com
 */
import React from 'react'
import { connect } from 'dva'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'
import { message } from '../../../../../../node_modules/antd/lib/index'

const Navbar = ({ dispatch, loading, modal, list, tabKey }) => {
  const handleRefresh = payload => dispatch({ type: 'mobile/query', payload })
  const hideModal = () => dispatch({ type: 'modal/hideModal' })
  const { item } = modal
  const filterProps = {
    onSearch(value) {
      handleRefresh(value)
    },
    onAdd() {
      dispatch({
        type: 'mobile/showModalNavbar',
        payload: {},
      })
    },
  }
  const listProps = {
    dataSource: list,
    loading: loading.effects['mobile/query'],
    onDeleteItem(id) {
      dispatch({
        type: 'mobile/removeNavbarFunc',
        payload: id,
      })
        .then(result => {
          const { success, msg } = result
          if (success) {
            handleRefresh()
          } else {
            message.error(msg)
          }
        })
        .catch(e => message.error(e.message))
    },
    onEditItem(currentItem) {
      dispatch({
        type: 'mobile/showModalNavbar',
        payload: {
          currentItem,
        },
      })
    },
  }

  const modalProps = {
    ...modal,
    loading: loading.effects['mobile/showModalNavbar'],
    title: 'Navbar',
    onOk(data) {
      const modalType =
        item && item.id ? 'updateNavbarFunc' : 'createNavbarFunc'
      dispatch({
        type: `mobile/${modalType}`,
        payload: {
          id: item.id,
          ...data,
        },
      })
        .then(result => {
          const { success, msg } = result
          if (success) {
            handleRefresh()
            hideModal()
          } else {
            message.error(msg)
          }
        })
        .catch(e => message.error(e.message))
    },
    onCancel() {
      hideModal()
    },
  }

  return (
    <div>
      <Filter {...filterProps} />
      <List {...listProps} />
      {modal.visible && modal.type === 'modal' && tabKey === 1 && (
        <Modal {...modalProps} />
      )}
    </div>
  )
}

export default connect(({ modal, loading }) => ({ modal, loading }))(Navbar)
