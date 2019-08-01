import React, { Component } from 'react';
import { Form,Row,Col,Button,Icon } from 'antd';
import PropTypes from 'prop-types';
import { Trans, withI18n } from '@lingui/react';
import { submitForm } from './BaseForm';
import { HandleType } from '@/constant';

const {ADD} = HandleType;
/**
 * 搜索表单
 */
@Form.create({
  // 表单项变化时调用
  onValuesChange({ onValuesChange, ...restProps }, changedValues, allValues) {
    if (onValuesChange) onValuesChange(restProps, changedValues, allValues);
  },
})
@withI18n()
class SearchForm extends Component {
  static propTypes = {
    onSearch: PropTypes.func,
    onCreate: PropTypes.func,
    onReset: PropTypes.func,
    layout: PropTypes.string,
    child: PropTypes.array,
    showCreateButton: PropTypes.bool,
  };

  static defaultProps = {
    onSearch: undefined,
    onCreate: undefined,
    onReset: undefined,
    layout: 'inline',
    child: [],
    showCreateButton:true,
  };

  /**
   * 表单提交时触发
   *
   * @param e
   */
  onSubmit = e => {
    if (e) e.preventDefault();
    const { form } = this.props;
    const fields = form.getFieldsValue();
    submitForm(form, fields, this.search);
  };

  onCreate = e=> {
    if(e) e.preventDefault();
    const { onCreate } = this.props;
    if(onCreate) onCreate(null,ADD);
  };

  /**
   * 调用搜索
   *
   * @param formValues
   */
  search = formValues => {
    const { onSearch } = this.props;
    if (onSearch) onSearch(formValues||{});
  };

  /**
   * 重置表单并搜索
   */
  reset = () => {
    const { form, searchOnReset,onReset } = this.props;
    form.resetFields();
    if(onReset){
      onReset(form);
    } else if(searchOnReset !== false){
      const fields = form.getFieldsValue();
      this.search(fields);
    }
  };

  render() {
    const { child, hideRequiredMark,showCreateButton, layout,form:{ getFieldDecorator } } = this.props;
    return (
      <Form 
        hideRequiredMark={hideRequiredMark} 
        layout={layout} 
        onSubmit={this.onSubmit} 
      >
        <Row 
          gutter={24} 
          type="flex" 
          style={{marginBottom:20}} 
        >
          <Col span={20}>
            <Row type='flex'>
              {
                child&&child.map(_=> {
                  return _.display!==false?(
                    <Col id={_.id||_.key} key={_.key} style={{marginRight:20,paddingBottom:5,paddingTop:5}}>
                      {
                        getFieldDecorator(_.key,Object.assign({},_.rest))(
                          _.child
                        )
                      }
                    </Col>
                  ):null;
                })
              }
              <Col style={{paddingBottom:5,paddingTop:5}}>
                <Button 
                  type="primary" 
                  htmlType="submit" 
                  style={{ marginRight: 10 }} 
                >
                  <Trans>Search</Trans>
                </Button>
                <Button onClick={this.reset.bind(this)}>
                  <Trans>Reset</Trans>
                </Button>
              </Col>
            </Row>
          </Col>
          <Col span={4} align="right">
            {
              showCreateButton &&
              (
                <Button 
                  type="primary" 
                  onClick={this.onCreate.bind(this)}
                >
                  <Trans>Create</Trans>
                  <Icon type="plus" style={{ color: '#fff' }} />
                </Button>
              )
            }
          </Col>
        </Row>
      </Form>
    );
  }
}

export default SearchForm;
