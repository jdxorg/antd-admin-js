import React, { Component } from 'react';
import { Form } from 'antd';
import PropTypes from 'prop-types';
import { renderFormItem, fillFormItems, submitForm } from './RenderBox'; 

const defaultFormLayout = { labelCol: { span: 5 }, wrapperCol: { span: 15 } };

/**
 * 基础表单
 */
@Form.create({
  // 表单项变化时调用
  onValuesChange({ onValuesChange, ...restProps }, changedValues, allValues) {
    if (onValuesChange) onValuesChange(restProps, changedValues, allValues);
  },
})
class BaseForm extends Component {
  static propTypes = {
    layout: PropTypes.string,
    formLayout: PropTypes.object,
    hideRequiredMark: PropTypes.bool,
    dataSource: PropTypes.array,
    formValues: PropTypes.object,
    renderItem: PropTypes.func,
    onSubmit: PropTypes.func,
    // eslint-disable-next-line react/no-unused-prop-types
    onValuesChange: PropTypes.func,
  };

  static defaultProps = {
    layout: 'horizontal',
    formLayout: undefined,
    hideRequiredMark: false,
    dataSource: [],
    formValues: {},
    renderItem: renderFormItem,
    onSubmit: () => {},
    onValuesChange: undefined,
  };

  /**
   * 表单提交时触发
   *
   * @param e
   */
  onSubmit = e => {
    if (e) e.preventDefault(); // 阻止默认行为
    this.submit();
  };

  /**
   * 调用表单提交
   */
  submit = () => {
    const { form, formValues, onSubmit } = this.props;
    submitForm(form, formValues, onSubmit);
  };

  render() {
    const {
      children,
      layout,
      formLayout = layout === 'vertical' ? null : defaultFormLayout,
      hideRequiredMark,
      renderItem,
      form: { getFieldDecorator },
      formValues,
      dataSource,
    } = this.props;
    return (
      <Form layout={layout} onSubmit={this.onSubmit} hideRequiredMark={hideRequiredMark}>
        {children ||
          fillFormItems(dataSource, formValues).map(item =>
            renderItem(item, getFieldDecorator, formLayout)
          )}
      </Form>
    );
  }
}

export * from './RenderBox';
export default BaseForm;