import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm, message } from 'antd'
import { withI18n } from '@lingui/react'
import { Page } from 'components'
import List from './components/List'
import Filter from './components/Filter'
import Modal from './components/Modal'
import Setting from './components/Setting'

@withI18n()
@connect(({ role, modal, loading }) => ({ role, modal, loading }))
class Role extends PureComponent {
  render() {
    const { dispatch, role, modal, loading, i18n } = this.props
    const { list, pagination, selectedRowKeys } = role
    const handleRefresh = payload => dispatch({ type: 'role/query', payload })
    const hideModal = () => dispatch({ type: 'modal/hideModal' })
    const { item } = modal
    const modalProps = {
      ...modal,
      loading: loading.effects['role/showModal'],
      title: item && item.id ? i18n.t`Create` : i18n.t`Update`,
      onOk: data => {
        const modalType = item && item.id ? 'update' : 'create'
        dispatch({
          type: `role/${modalType}`,
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

    const settingModalProps = {
      ...modal,
      loading: loading.effects['role/showSettingModal'],
      title: 'Setting',
      onOk: data => {
        dispatch({
          type: 'role/saveUserRole',
          payload: {
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
      onCancel: () => {
        hideModal()
      },
    }

    const listProps = {
      dataSource: list,
      loading: loading.effects['role/query'],
      pagination,
      onChange(page) {
        handleRefresh({
          current: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem(id) {
        dispatch({
          type: 'role/delete',
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
          type: 'role/showModal',
          payload: {
            currentItem,
          },
        })
      },
      onSettingItem(currentItem) {
        dispatch({
          type: 'role/showSettingModal',
          payload: {
            currentItem,
          },
        })
      },
      rowSelection: {
        selectedRowKeys,
        onChange: keys => {
          dispatch({
            type: 'role/updateState',
            payload: {
              selectedRowKeys: keys,
            },
          })
        },
      },
    }

    const filterProps = {
      onSearch(value) {
        handleRefresh({
          ...value,
          current: 1,
        })
      },
      onAdd() {
        dispatch({
          type: 'role/showModal',
          payload: {},
        })
      },
    }

    const handleDeleteItems = () => {
      dispatch({
        type: 'role/multiDelete',
        payload: {
          ids: selectedRowKeys,
        },
      }).then(() => {
        handleRefresh({
          current:
            list.length === selectedRowKeys.length && pagination.current > 1
              ? pagination.current - 1
              : pagination.current,
        })
      })
    }

    return (
      <Page inner>
        <Filter {...filterProps} />
        {selectedRowKeys.length > 0 && (
          <Row style={{ marginBottom: 24, textAlign: 'right', fontSize: 13 }}>
            <Col>
              {`Selected ${selectedRowKeys.length} items `}
              <Popconfirm
                title="Are you sure delete these items?"
                placement="left"
                onConfirm={handleDeleteItems}
              >
                <Button type="primary" style={{ marginLeft: 8 }}>
                  Remove
                </Button>
              </Popconfirm>
            </Col>
          </Row>
        )}
        <List {...listProps} />
        {modal.visible && modal.type === 'edit' && <Modal {...modalProps} />}
        {modal.visible && modal.type === 'setting' && (
          <Setting {...settingModalProps} />
        )}
      </Page>
    )
  }
}

Role.propTypes = {
  role: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
Role.defaultProps = {
  role: {},
  dispatch: () => {},
  loading: {},
}
export default Role
