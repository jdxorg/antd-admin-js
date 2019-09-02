import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
// import { Row, Col, Button, Popconfirm } from 'antd';
import { withI18n } from '@lingui/react'

import { Page } from 'components'
import List from './components/List'
import Filter from './components/Filter'
import Modal from './components/Modal'
import Setting from './components/Setting'

@withI18n()
@connect(({ user, modal, loading }) => ({ user, modal, loading }))
class User extends PureComponent {
  render() {
    const { dispatch, user, modal, loading, i18n } = this.props
    const { list, pagination, selectedRowKeys, roles } = user
    const handleRefresh = payload => dispatch({ type: 'user/query', payload })
    const { item } = modal
    const modalProps = {
      ...modal,
      loading: loading.effects['user/showModal'],
      title: item && item.id ? i18n.t`Update.User` : i18n.t`Create.User`,
      onOk(data) {
        const modalType = item && item.id ? 'update' : 'create'
        dispatch({
          type: `user/${modalType}`,
          payload: {
            id: item.id,
            ...data,
          },
        }).then(() => {
          handleRefresh()
        })
      },
      onCancel() {
        dispatch({
          type: 'modal/hideModal',
        })
      },
    }

    const settingModalProps = {
      ...user,
      ...modal,
      loading: loading.effects['user/showSettingModal'],
      title: 'Setting',
      onOk: data => {
        dispatch({
          type: 'user/updatePermission',
          payload: data,
        })
      },
      onCancel: () => {
        dispatch({ type: 'modal/hideModal' })
      },
    }

    const listProps = {
      roles,
      dataSource: list,
      loading: loading.effects['user/query'],
      pagination,
      onChange(page) {
        handleRefresh({
          current: page.current,
          pageSize: page.pageSize,
        })
      },
      onDeleteItem(id) {
        dispatch({
          type: 'user/delete',
          payload: id,
        }).then(() => {
          handleRefresh({
            current:
              list.length === 1 && pagination.current > 1
                ? pagination.current - 1
                : pagination.current,
          })
        })
      },
      onEditItem(currentItem) {
        dispatch({
          type: 'user/showModal',
          payload: {
            currentItem,
          },
        })
      },
      onSettingItem(currentItem) {
        dispatch({
          type: 'user/showSettingModal',
          payload: {
            currentItem,
          },
        })
      },
      rowSelection: {
        selectedRowKeys,
        onChange: keys => {
          dispatch({
            type: 'user/updateState',
            payload: {
              selectedRowKeys: keys,
            },
          })
        },
      },
    }

    const filterProps = {
      onSearch(value) {
        if (value && value.addressCode && value.addressCode.length > 0) {
          value.addressCode = JSON.stringify(value.addressCode)
        }
        let createBegin
        let createEnd
        if (value && value.createTime) {
          createBegin = new Date(value.createTime[0]).getTime()
          createEnd = new Date(value.createTime[1]).getTime()
          delete value.createTime
        }
        handleRefresh({
          current: 1,
          createBegin,
          createEnd,
          ...value,
        })
      },
      onAdd() {
        dispatch({
          type: 'user/showModal',
          payload: {},
        })
      },
    }

    // const handleDeleteItems = () => {
    //   dispatch({
    //     type: 'user/multiDelete',
    //     payload: {
    //       ids: selectedRowKeys,
    //     },
    //   }).then(() => {
    //     handleRefresh({
    //       current:
    //         list.length === selectedRowKeys.length && pagination.current > 1
    //           ? pagination.current - 1
    //           : pagination.current,
    //     });
    //   });
    // };

    return (
      <Page inner>
        <Filter {...filterProps} />
        {/* {selectedRowKeys.length > 0 && (
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
        )} */}
        <List {...listProps} />
        {modal.visible && modal.type === 'modal' && <Modal {...modalProps} />}
        {modal.visible && modal.type === 'setting' && (
          <Setting {...settingModalProps} />
        )}
      </Page>
    )
  }
}

User.propTypes = {
  user: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
User.defaultProps = {
  user: {},
  dispatch: () => {},
  loading: {},
}
export default User
