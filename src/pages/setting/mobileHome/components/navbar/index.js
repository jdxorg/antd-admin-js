import React from 'react'
import { connect } from 'dva'
import { message } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

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
