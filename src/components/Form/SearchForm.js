import React, { Component } from 'react';
import { Form } from 'antd';
import PropTypes from 'prop-types';
import { submitForm } from './BaseForm';

/**
 * 搜索表单
 */
@Form.create({
  // 表单项变化时调用
  onValuesChange({ onValuesChange, ...restProps }, changedValues, allValues) {
    if (onValuesChange) onValuesChange(restProps, changedValues, allValues);
  },
})
class SearchForm extends Component {
  static propTypes = {
    root: PropTypes.object,
    onSearch: PropTypes.func,
    layout: PropTypes.string,
    render: PropTypes.func,
  };

  static defaultProps = {
    root: undefined,
    onSearch: undefined,
    layout: 'inline',
    render: undefined,
  };

  constructor(props) {
    super(props);
    const { root } = this.props;
    if (root) root.searchForm = this;
  }

  /**
   * 调用搜索
   *
   * @param formValues
   */
  search = formValues => {
    const { onSearch } = this.props;
    if (onSearch) onSearch(formValues);
  };

  /**
   * 重置表单并搜索
   */
  reset = (searchOnReset = true) => {
    const { form, formValues } = this.props;
    form.resetFields();
    if (searchOnReset === true) this.search(formValues);
  };

  /**
   * 表单提交时触发
   *
   * @param e
   */
  onSubmit = e => {
    if (e) e.preventDefault();
    const { form, formValues } = this.props;
    submitForm(form, formValues, this.search);
  };

  render() {
    const { render, hideRequiredMark, layout } = this.props;
    return (
      <Form hideRequiredMark={hideRequiredMark} layout={layout} onSubmit={this.onSubmit}>
        {render ? render(this.props) : null}
      </Form>
    );
  }
}

export default SearchForm;
