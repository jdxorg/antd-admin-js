import React from 'react'
import { Upload,Button,Icon } from 'antd'

export default class ImageUpload extends React.Component{

  getProps=()=>{
    const { 
      action,
      fileList,
      onChange,
      onRemove,
      onError
     } = this.props
    const imgUploadProps={
      withCredentials:true,
      name:'image',
      accept:"image/*",
      listType: 'picture',
      className: 'upload-list-inline',
      action,
      fileList,
      headers: {
        authorization: 'authorization-text',
      },
      onChange:info=> {
        onChange && typeof onChange === 'function' && onChange(info)
      },
      onRemove:info=>{
        onRemove && typeof onRemove ==='function'&&onRemove(info)
      },
      onError:(event)=>{
        onError && typeof onError === 'function' && onError(event)
      }
    }
    return imgUploadProps
  }

  render(){
    const imgUploadProps = this.getProps()
    return(
      <Upload  {...imgUploadProps}>
        <Button>
          <Icon type="upload" /> Upload
        </Button>
      </Upload>
    );
  }
}