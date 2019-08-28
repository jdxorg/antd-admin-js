/*
 * @Author: dexiaojiang 289608944@qq.com
 * @Description: In User Settings Edit
 * @Date: 2019-08-26 18:08:21
 * @LastEditTime: 2019-08-27 15:14:05
 * @LastEditors: dexiaojiang 289608944@qq.com
 */
import React from 'react'
import { connect } from 'dva';
import List from './List'
import Filter from './Filter'
import Modal from './Modal'

const Banner = ({
  dispatch,
  loading,
  modal,
  list,
  tabKey,
}) => {
  const handleRefresh = payload => dispatch({ type:'mobile/query',payload });
  const { item } = modal;
  const filterProps = {
    onSearch(value) {
      handleRefresh(value);
    },
    onAdd() {
      dispatch({
        type: 'mobile/showModalBanner',
        payload:{},
      });
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
    },
    onEditItem(currentItem) {
      dispatch({
        type: 'mobile/showModalBanner',
        payload: {
          currentItem,
        },
      });
    },
  };

  const modalProps = {
    ...modal,
    loading:loading.effects['mobile/showModalBanner'],
    title:'Banner',
    onOk(data) {
      const modalType = item&&item.id?'updateBannerFunc':'createBannerFunc';
      dispatch({
        type: `mobile/${modalType}`,
        payload: {
          id:item.id,
          ...data,
        },
      })
    },
    onCancel() {
      dispatch({
        type: 'modal/hideModal',
      });
    },
  };
  return (
    <div>
      <Filter {...filterProps} />
      <List {...listProps} />
      {modal.visible && modal.type ==='modal' && tabKey === 0 && <Modal {...modalProps} />}
    </div>
  );  
}

export default connect(({modal,loading}) => ({modal,loading}))(Banner)