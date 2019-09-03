import React from 'react'
import { connect } from 'dva'
import { message } from 'antd'
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Banner = ({ dispatch, loading, modal, list, tabKey }) => {
  const handleRefresh = payload => dispatch({ type: 'mobile/query', payload })
  const hideModal = () => dispatch({ type: 'modal/hideModal' })
  const { item } = modal
  const filterProps = {
    onSearch(value) {
      handleRefresh(value)
    },
    onAdd() {
      dispatch({
        type: 'mobile/showModalBanner',
        payload: {},
      })
    },
  }
  const listProps = {
    dataSource: list,
    loading: loading.effects['mobile/query'],
    onDeleteItem(id) {
      dispatch({
        type: 'mobile/removeBannerFunc',
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
        type: 'mobile/showModalBanner',
        payload: {
          currentItem,
        },
      })
    },
  }

  const modalProps = {
    ...modal,
    loading: loading.effects['mobile/showModalBanner'],
    title: 'Banner',
    onOk(data) {
      const modalType =
        item && item.id ? 'updateBannerFunc' : 'createBannerFunc'
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
      {modal.visible && modal.type === 'modal' && tabKey === 0 && (
        <Modal {...modalProps} />
      )}
    </div>
  )
}

export default connect(({ modal, loading }) => ({ modal, loading }))(Banner)
