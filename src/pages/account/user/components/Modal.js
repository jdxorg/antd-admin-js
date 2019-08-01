import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Input, InputNumber, Radio, Cascader, Select } from 'antd';
import { Trans, withI18n } from '@lingui/react';
import city from '@/utils/sys/city';
import { BaseModal ,ImageUploader} from 'components';
import { formItemLayout } from '@/utils/sys/props';
import {uplodaFile} from '@/services/api';

const FormItem = Form.Item;

@withI18n()
@Form.create()
class UserModal extends PureComponent {

  state = {
    address:'',
  }

  constructor(props){
    super(props);
    const {item={}} = this.props;
    this.state.address = item.address;
  }

  handleOk = () => {
    const { item = {}, onOk, form } = this.props;
    const { validateFields, getFieldsValue } = form;
    
    validateFields(errors => {
      if (errors) {
        return;
      }
      const {address} = this.state;
      const data = {
        ...getFieldsValue(),
        key: item.key,
        address,
      };
      onOk(data);
    });
  }

  addressChange = (value,selectedOptions) =>{
    const address = selectedOptions.map(_=>{
      return _.label;
    }).join(' ');
    this.setState({address});
  }

  render() {
    const { item = {}, onOk, form, i18n,modal, ...modalProps } = this.props;
    const { getFieldDecorator } = form;
    return (
      <BaseModal
        {...modalProps}
        onOk={this.handleOk}
        child={
          <Form layout="horizontal">
            <FormItem label={i18n.t`LoginName`} hasFeedback {...formItemLayout}>
              {getFieldDecorator('loginName', {
                initialValue: item.loginName,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label={i18n.t`Name`} hasFeedback {...formItemLayout}>
              {getFieldDecorator('userName', {
                initialValue: item.userName,
              })(<Input />)}
            </FormItem>
            <FormItem label={i18n.t`NickName`} hasFeedback {...formItemLayout}>
              {getFieldDecorator('nickName', {
                initialValue: item.nickName,
              })(<Input />)}
            </FormItem>
            <FormItem label={i18n.t`Gender`} hasFeedback {...formItemLayout}>
              {getFieldDecorator('gender', {
                initialValue: item.gender,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <Radio.Group>
                  <Radio value={0}>
                    <Trans>Male</Trans>
                  </Radio>
                  <Radio value={1}>
                    <Trans>Female</Trans>
                  </Radio>
                </Radio.Group>
              )}
            </FormItem>
            <FormItem label={i18n.t`Age`} hasFeedback {...formItemLayout}>
              {getFieldDecorator('age', {
                initialValue: item.age,
                rules: [
                  {
                    required: true,
                    type: 'number',
                  },
                ],
              })(<InputNumber min={18} max={100} />)}
            </FormItem>
            <FormItem label={i18n.t`Phone`} hasFeedback {...formItemLayout}>
              {getFieldDecorator('mobile', {
                initialValue: item.mobile,
                rules: [
                  {
                    pattern: /^1[34578]\d{9}$/,
                    message: i18n.t`The.input.is.not.valid.phone`,
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label={i18n.t`Email`} hasFeedback {...formItemLayout}>
              {getFieldDecorator('email', {
                initialValue: item.email,
                rules: [
                  {
                    pattern: /^([a-zA-Z0-9_-])+@([a-zA-Z0-9_-])+(.[a-zA-Z0-9_-])+/,
                    message: i18n.t`The.input.is.not.valid.E-mail`,
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label={i18n.t`Address`} hasFeedback {...formItemLayout}>
              {getFieldDecorator('addressCode', {
                initialValue: item.addressCode,
              })(
                <Cascader
                  style={{ width: '100%' }}
                  options={city}
                  placeholder={i18n.t`Pick.an.address`}
                  onChange={this.addressChange}
                />
              )}
            </FormItem>
            <FormItem label={i18n.t`FamilyAddress`} hasFeedback {...formItemLayout}>
              {getFieldDecorator('familyAddress', {
                initialValue: item.familyAddress,
              })(
                <Input />
              )}
            </FormItem>
            <FormItem label={i18n.t`State`} {...formItemLayout}>
              {
                getFieldDecorator('state',{
                  initialValue:item.state,
                  rules:[
                    {
                      required:true,
                    },
                  ],
                })(
                  <Select placeholder={i18n.t`Pick.an.state`}>
                    <Select.Option value={1}>启用</Select.Option>
                    <Select.Option value={0}>禁用</Select.Option>
                  </Select>
                )
              }
            </FormItem>
            <FormItem label={i18n.t`Avatar`} {...formItemLayout}>
              {
                getFieldDecorator('avatar',{
                  initialValue:item.avatar||'',
                })(
                  <ImageUploader action={uplodaFile} />
                )
              }
            </FormItem>
          </Form>
        }
      />
    );
  }
}

UserModal.propTypes = {
  item: PropTypes.object.isRequired,
  onOk: PropTypes.func.isRequired,
};

export default UserModal;
