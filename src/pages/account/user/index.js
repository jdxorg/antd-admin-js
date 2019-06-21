import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'dva';
import { Row, Col, Button, Popconfirm } from 'antd';
import { withI18n } from '@lingui/react';

import { Page } from 'components';
import List from './components/List';
import Filter from './components/Filter';
import Modal from './components/Modal';

@withI18n()
@connect(({ user,modal, loading }) => ({ user,modal, loading }))
class User extends PureComponent {
  render() {
    const { dispatch, user,modal, loading, i18n } = this.props;
    const {
      list,
      pagination,
      modalType,
      selectedRowKeys,
    } = user;
    const handleRefresh = payload => dispatch({ type:'user/query',payload });

    const modalProps = {
      ...modal,
      loading:loading.effects['user/showModal'],
      confirmLoading: loading.effects[`user/${modalType}`],
      title: modalType === 'create' ? i18n.t`Create.User` : i18n.t`Update.User`,
      onOk(data) {
        dispatch({
          type: `user/${modalType}`,
          payload: data,
        }).then(() => {
          handleRefresh();
        });
      },
      onCancel() {
        dispatch({
          type: 'modal/hideModal',
        });
      },
    };

    const listProps = {
      dataSource: list,
      loading: loading.effects['user/query'],
      pagination,
      onChange(page) {
        handleRefresh({
          current: page.current,
          pageSize: page.pageSize,
        });
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
          });
        });
      },
      onEditItem(item) {
        dispatch({
          type: 'user/showModal',
          payload: {
            modalType: 'update',
            currentItem: item,
          },
        });
      },
      rowSelection: {
        selectedRowKeys,
        onChange: keys => {
          dispatch({
            type: 'user/updateState',
            payload: {
              selectedRowKeys: keys,
            },
          });
        },
      },
    };

    const filterProps = {
      onSearch(value) {
        handleRefresh({
          ...value,
          current: 1,
        });
      },
      onAdd() {
        dispatch({
          type: 'user/showModal',
          payload: {
            modalType: 'create',
          },
        });
      },
    };

    const handleDeleteItems = () => {
      dispatch({
        type: 'user/multiDelete',
        payload: {
          ids: selectedRowKeys,
        },
      }).then(() => {
        handleRefresh({
          current:
            list.length === selectedRowKeys.length && pagination.current > 1
              ? pagination.current - 1
              : pagination.current,
        });
      });
    };

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
        {modal.visible && <Modal {...modalProps} />}
      </Page>
    );
  }
}

User.propTypes = {
  user: PropTypes.object.isRequired,
  dispatch: PropTypes.func.isRequired,
  loading: PropTypes.object.isRequired,
};

export default User;
