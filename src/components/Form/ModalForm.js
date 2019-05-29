import React from 'react';
import { Modal } from 'antd';
import PropTypes from 'prop-types';
import PopupForm from './PopupForm';

/**
 * 模态框式表单
 */
class ModalForm extends PopupForm {
  static propTypes = {
    layout: PropTypes.string,
    formLayout: PropTypes.object,
    hideRequiredMark: PropTypes.bool,
    width: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    title: PropTypes.string,
    root: PropTypes.object,
    okText: PropTypes.string,
    cancelText: PropTypes.string,
    onValuesChange: PropTypes.func,
    closeOnSubmit: PropTypes.bool,
  };

  static defaultProps = {
    layout: 'horizontal',
    formLayout: undefined,
    hideRequiredMark: false,
    width: 640,
    title: undefined,
    root: undefined,
    okText: '确定',
    cancelText: '取消',
    onValuesChange: undefined,
    closeOnSubmit: true,
  };

  render() {
    const { children, title, width, visible, okText, cancelText, ...restProps } = this.props;

    return visible ? (
      <Modal
        title={title || this.getTitle()}
        width={width}
        visible
        okText={okText}
        onOk={this.onOk}
        cancelText={cancelText}
        onCancel={this.onCancel}
        {...restProps}
        destroyOnClose
      >
        {this.renderBody()}
      </Modal>
    ) : null;
  }
}

export default ModalForm;
