/*
 * @Description: 基类模态框
 * @Author: jiangdexiao
 * @Date: 2019-06-19 14:24:05
 * @LastEditTime: 2019-09-02 11:24:14
 * @LastEditors: dexiaojiang 289608944@qq.com
 */
import React from 'react'
import { Modal, Spin } from 'antd'
import PropTypes from 'prop-types'
import _ from 'lodash'
import './Modal.less'

const { debounce } = _
export default class BaseModal extends React.Component {
  static propTypes = {
    hideRequiredMark: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    okText: PropTypes.string,
    cancelText: PropTypes.string,
    loading: PropTypes.bool,
    onCancel: PropTypes.func,
    onOk: PropTypes.func,
    footer: PropTypes.bool,
    maskClosable: PropTypes.bool,
    centered: PropTypes.bool,
    className: PropTypes.string,
  }

  static defaultProps = {
    hideRequiredMark: false,
    width: 640,
    title: undefined,
    cancelText: '取消',
    okText: '确定',
    loading: true,
    maskClosable: false,
    footer: null,
    centered: true,
    className: 'customer-modal',
    onCancel: () => {},
    onOk: () => {},
  }

  handleOnOk = debounce(
    e => {
      const { onOk } = this.props
      e.persist()
      onOk()
    },
    500,
    { leading: true }
  )

  /**
   * 组件显示标题，可覆盖
   *
   * @returns {string}
   */
  getTitle = () => ''

  render() {
    const {
      child,
      title,
      width,
      visible,
      okText,
      cancelText,
      loading,
      footer,
      ...restProps
    } = this.props
    return (
      <Modal
        visible
        title={title || this.getTitle()}
        width={width}
        okText={okText}
        onOk={this.onOk}
        cancelText={cancelText}
        onCancel={this.onCancel}
        {...restProps}
        destroyOnClose
        footer={footer}
      >
        {loading ? (
          <Spin
            style={{ display: 'block' }}
            spinning={loading}
            tip="loading...."
          />
        ) : (
          child
        )}
      </Modal>
    )
  }
}
