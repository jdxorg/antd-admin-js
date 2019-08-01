import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Form, Input ,Select} from 'antd';
import { withI18n } from '@lingui/react';
import { BaseModal } from 'components';
import { formItemLayout } from '@/utils/sys/props';

const FormItem = Form.Item;
const {TextArea} = Input;
@withI18n()
@Form.create()
class RoleModal extends PureComponent {
  handleOk = () => {
    const { item = {}, onOk, form } = this.props;
    const { validateFields, getFieldsValue } = form;

    validateFields(errors => {
      if (errors) {
        return;
      }
      const data = {
        ...getFieldsValue(),
        key: item.key,
      };
      onOk(data);
    });
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
            <FormItem label={i18n.t`RoleName`} hasFeedback {...formItemLayout}>
              {getFieldDecorator('roleName', {
                initialValue: item.roleName,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(<Input />)}
            </FormItem>
            <FormItem label={i18n.t`RoleType`} hasFeedback {...formItemLayout}>
              {getFieldDecorator('roleType', {
                initialValue: item.roleType,
                rules: [
                  {
                    required: true,
                  },
                ],
              })
              (
                <Select placeholder={i18n.t`Pick an RoleType`}>
                  <Select.Option value={0}>系统角色</Select.Option>
                  <Select.Option value={1}>PC角色</Select.Option>
                  <Select.Option value={2}>APP角色</Select.Option>
                  <Select.Option value={3}>公众号角色</Select.Option>
                </Select>
              )}
            </FormItem>
            <FormItem label={i18n.t`Description`} hasFeedback {...formItemLayout}>
              {getFieldDecorator('roleDesc', {
                initialValue: item.roleDesc,
              })(
                <TextArea />
              )}
            </FormItem>
          </Form>
      }
      />
    );
  }
}

RoleModal.propTypes = {
  type: PropTypes.string.isRequired,
  item: PropTypes.object,
  onOk: PropTypes.func.isRequired,
};
RoleModal.defaultProps = {
  item:{},
};
export default RoleModal;
