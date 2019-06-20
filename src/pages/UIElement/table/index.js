import React from 'react';
import { Card } from 'antd';
import SearchBar from './components/search';
import ListView from './components/list';
import ModalForm from './components/modal';
import { OPERATION } from '@/sys/enum/constant';
import { Page } from 'components'
const {DETAIL, UPDATE,DELETE,ADD } = OPERATION
export default class TablePage extends React.Component {
  _props(){
    const searchProps = {
      onSearch: (values) => {
        this.child.reload(values)
      },
      onReset:()=>{
        this.child.reset()
      },
      onAdd: () => {
        ModalForm.open({ 
          layout: 'vertical',
          onSubmit: data => console.log(`表单提交:${JSON.stringify(data)}`), 
        })
      }
    };
    const listProps = {
      onEvent: (item, operate) => {
        switch(operate){
          case DELETE:console.log('DELETE',item);break;
          case UPDATE:
          case ADD:
            ModalForm.open({ 
              layout: 'vertical',
              onSubmit: data => console.log(`表单提交:${JSON.stringify(data)}`), 
            })
          break;
        }
      },
      onRef:(ref) => {
        this.child = ref
      }
    };
    return {searchProps,listProps}
  }

  render(){
    const {searchProps,listProps} = this._props()
    return(
      <Page inner>
        <Card bordered={false}>
          <SearchBar {...searchProps} />
          <ListView  {...listProps} />
        </Card>
      </Page>
    );
  }
}