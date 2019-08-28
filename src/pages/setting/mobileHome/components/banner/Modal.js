/*
 * @Author: dexiaojiang 289608944@qq.com
 * @Description: In User Settings Edit
 * @Date: 2019-08-26 17:53:29
 * @LastEditTime: 2019-08-27 11:36:05
 * @LastEditors: dexiaojiang 289608944@qq.com
 */
import React from 'react'
import { Form,Input } from 'antd'
import { ImageUploader,BaseModal } from 'components'
import {uplodaFile} from '@/services/api';
import { ACCESS_TOKEN } from '@/constant';

const FormItem = Form.Item
const TextArea = Input.TextArea
const Modal = props => {
  
  const { item = {}, onOk, form,...modalProps } = props;
  const { validateFields, getFieldsValue,getFieldDecorator } = form;
  const handleOk = () => {
    
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
  return (
    <BaseModal 
      {...modalProps}
      onOk={handleOk}
      child = {
        <Form>
          <FormItem label="Name">
            {
              getFieldDecorator('name',{
                initialValue: item.name,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <Input />
              )
            }
          </FormItem>
          <FormItem label="Description">
            {
              getFieldDecorator('description',{
                initialValue: item.description,
              })(
                <TextArea rows={4} />
              )
            }
          </FormItem>
          <FormItem label="Image">
            {
              getFieldDecorator('image',{
                initialValue: item.image,
                rules: [
                  {
                    required: true,
                  },
                ],
              })(
                <ImageUploader
                  action={uplodaFile}  
                  headers={
                    {Authorization: `bearer ${sessionStorage.getItem(ACCESS_TOKEN)}`}
                  }
                />
              )
            }
          </FormItem>
        </Form>
      }
    />
  );
}

export default Form.create()(Modal)