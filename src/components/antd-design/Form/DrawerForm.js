import React from 'react';
import { Drawer, Button } from 'antd';
import PropTypes from 'prop-types';
import PopupForm from './PopupForm';

/**
 * 抽屉式表单
 */
class DrawerForm extends PopupForm {
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
    closable: PropTypes.bool,
  };

  static defaultProps = {
    layout: 'vertical',
    formLayout: null,
    hideRequiredMark: false,
    width: 720,
    title: undefined,
    root: undefined,
    okText: '确定',
    cancelText: '取消',
    onValuesChange: undefined,
    closeOnSubmit: false,
    closable: false,
  };

  /**
   * @description: 绘制组件按钮
   * @param {type} 
   * @return: 
   */
  renderFooter = () => {
    const { okText, cancelText } = this.props;
    return (
      <div
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          width: '100%',
          borderTop: '1px solid #e9e9e9',
          padding: '10px 16px',
          background: '#fff',
          textAlign: 'right',
        }}
      >
        {cancelText ? (
          <Button onClick={this.onCancel} style={{ marginRight: 8 }}>
            {cancelText}
          </Button>
        ) : null}
        {okText ? (
          <Button onClick={this.onOk} type="primary">
            {okText}
          </Button>
        ) : null}
      </div>
    );
  };

  render() {
    const { children, title, width, visible, closable, formLayout, ...restProps } = this.props;

    return visible ? (
      <Drawer
        title={title || this.getTitle()}
        width={width}
        visible
        closable={closable}
        onClose={this.onCancel}
        {...restProps}
        destroyOnClose
      >
        <div style={{ paddingBottom: 75 }}>{this.renderBody()}</div>
        {this.renderFooter()}
      </Drawer>
    ) : null;
  }
}

export default DrawerForm;
