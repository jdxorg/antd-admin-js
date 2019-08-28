/*
 * @Author: dexiaojiang 289608944@qq.com
 * @Description: In User Settings Edit
 * @Date: 2019-08-23 15:20:32
 * @LastEditTime: 2019-08-27 11:58:38
 * @LastEditors: dexiaojiang 289608944@qq.com
 */
import React from 'react';
import { Upload,Icon,message } from 'antd';

export default class ImageUpload extends React.Component{

  state = {
    imageUrl:'',
    loading:false,
  }

  constructor(props) {
    super(props);
    const {value} = props;
    this.state = {
      imageUrl:value||'',
    };
  }

  componentWillReceiveProps(nextProps) {
    // Should be a controlled component.
    if ('value' in nextProps) {
      const {value} = nextProps;
      this.setState({imageUrl:value});
    }
  }

  getBase64 = (img, callback)=> {
    const reader = new FileReader();
    reader.addEventListener('load', () => callback(reader.result));
    reader.readAsDataURL(img);
  }
  
  getProps=()=>{
    const {  action, ...rest } = this.props;

    const imgUploadProps={
      action,
      ...rest,
      beforeUpload:(file)=>{
        const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
        if (!isJpgOrPng) {
          message.error('You can only upload JPG/PNG file!');
        }
        const isLt2M = file.size / 1024 / 1024 < 2;
        if (!isLt2M) {
          message.error('Image must smaller than 2MB!');
        }
        return isJpgOrPng && isLt2M;
      },
      onChange:info => {
        if (info.file.status === 'uploading') {
          this.setState({ loading: true });
        }else if (info.file.status === 'done') {
          this.setState({
            imageUrl:info.file.response.data,
            loading: false,
          });
          this.triggerChange(info.file.response.data);
        }
      },
    };
    return imgUploadProps;
  }

  triggerChange = (changedValue) => {
    // Should provide an event to pass value to Form.
    const {onChange} = this.props;
    if (onChange) {
      onChange(changedValue);
    }
  }

  render(){
    const {imageUrl,loading} = this.state;

    const imgUploadProps = this.getProps();
    const uploadButton = (
      <div>
        <Icon type={loading ? 'loading' : 'plus'} />
        <div className="ant-upload-text">Upload</div>
      </div>
    );
    return(
      <Upload 
        withCredentials
        name='file'
        accept="image/*"
        listType='picture-card'
        className='avatar-uploader'
        showUploadList={false}
        {...imgUploadProps}
      >
        {imageUrl ? <img src={imageUrl} alt="avatar" style={{ width: '100%' }} /> : uploadButton}
      </Upload>
    );
  }
}