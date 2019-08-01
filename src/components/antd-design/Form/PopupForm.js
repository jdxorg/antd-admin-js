import React, { PureComponent } from 'react';
import ReactDOM from 'react-dom';
import PropTypes from 'prop-types';
import BaseComponent from './BaseComponent';
import BaseForm from './BaseForm';

const destroyFns = []; // 保存所有弹框的引用

/**
 * 弹出式表单
 */
class PopupForm extends PureComponent {
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
    onClose: PropTypes.func,
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
    closeOnSubmit: true,
    onClose: undefined,
  };

  /**
   * 显示通过getInstance创建的组件
   *
   * @param formValues 表单初始值
   */
  static show(formValues) {
    const { instance } = this;
    if (instance) {
      const { root } = instance.props;
      if (root instanceof BaseComponent) {
        root.showPopup(this.name, true, formValues);
      }
    }
  }

  /**
   * 创建一个该类型表单组件的实例，配合show显示/关闭
   *
   * @param root  表单组件引用的父组件，用于统一管理表单组件的状态
   * @param props 组件属性
   * @returns {*}
   */
  static getInstance(root, props) {
    if (root instanceof BaseComponent) {
      const { forms = {} } = root.state || {};
      const form = forms[this.getFormName()] || {};
      this.instance = <this root={root} {...form} {...props} />;
      return this.instance;
    }
    return null;
  }

  /**
   * 接口方式创建并显示一个表单组件，独立于App容器之外
   *
   * @param props      组件属性
   * @param decorators 要给组件附加的高阶组件
   * @returns {*}
   */
  static open(props, decorators) {
    const Com = decorators ? [].concat(decorators).reduce((pre, item) => item(pre), this) : this;
    const div = document.createElement('div');
    const close = () => {
      const unmountResult = ReactDOM.unmountComponentAtNode(div);
      if (unmountResult && div.parentNode) {
        div.parentNode.removeChild(div);
      }
      const pos = destroyFns.findIndex(item => item === close);
      if (pos >= 0) destroyFns.splice(pos, 1);
    };
    ReactDOM.render(<Com {...props} visible onClose={close} />, div);

    destroyFns.push(close);

    // 返回一个对象，通过这个对象来显式关闭组件
    return { close };
  }

  /**
   * 销毁全部弹框
   */
  static destroyAll() {
    while (destroyFns.length) {
      const close = destroyFns.pop();
      if (close) close();
    }
  }

  /**
   * 获取表单名称，用于父组件对表单组件的控制，默认取组件类名
   *
   * @returns {string}
   */
  static getFormName() {
    return this.name;
  }

  /**
   * 表单提交时触发
   *
   * @param fieldsValue
   * @param form
   */
  onSubmit = (fieldsValue, form) => {
    const { onSubmit, closeOnSubmit = false } = this.props;
    if (closeOnSubmit === true) {
      // 表单提交时关闭当前组件
      this.close();
    }
    onSubmit(fieldsValue, form);
  };

  /**
   * 点击Ok按钮时触发
   *
   * @param e
   */
  onOk = e => {
    if (e) e.preventDefault(); // 阻止默认行为
    const { form: { submit } = {} } = this;
    if (submit) {
      // 通过子组件暴露的方法，显示提交表单
      submit();
    }
  };

  /**
   * 点击Cancel按钮时触发
   *
   * @param e
   */
  onCancel = e => {
    if (e) e.preventDefault(); // 阻止默认行为
    this.close();
  };

  /**
   * 关闭当前组件
   */
  close = () => {
    const { onClose, root } = this.props;
    const formName = this.constructor.getFormName();
    if (onClose) {
      onClose(formName);
    } else if (root instanceof BaseComponent) {
      // 对应getInstance创建的组件，由父组件控制
      root.showPopup(formName, false);
    }
  };

  /**
   * 绘制表单，可覆盖
   *
   * @returns {*}
   */
  renderForm = () => {
    const {
      children,
      layout,
      formLayout,
      hideRequiredMark,
      onValuesChange,
      formValues,
      ...restProps
    } = this.props;

    return (
      <BaseForm
        {...restProps}
        hideRequiredMark={hideRequiredMark}
        layout={layout}
        formLayout={formLayout}
        dataSource={this.getDataSource()}
        formValues={formValues}
        onSubmit={this.onSubmit}
        onValuesChange={onValuesChange}
        wrappedComponentRef={form => {
          this.form = form;
        }}
      />
    );
  };

  /**
   * 绘制组件主体内容，可覆盖
   *
   * @returns {PopupForm.props.children | *}
   */
  renderBody = () => {
    const { children } = this.props;
    return children || this.renderForm();
  };

  /**
   * 表单字段数据源，可覆盖
   *
   * @returns {undefined}
   */
  getDataSource = () => undefined;

  /**
   * 组件显示标题，可覆盖
   *
   * @returns {string}
   */
  getTitle = () => '';
}

export default PopupForm;
