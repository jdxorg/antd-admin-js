import React from 'react';
import { Card } from 'antd';
import { Page } from 'components'
import SearchBar from './components/search';
import ListView from './components/list';
import ModalForm from './components/modal';
import { OPERATION } from '@/utils/sys/enum/constant';
const {UPDATE,DELETE,ADD } = OPERATION;
export default class TablePage extends React.Component {
  _props(){
    const searchProps = {
      onSearch: (values) => {
        this.child.reload(values);
      },
      onReset:()=>{
        this.child.reset();
      },
      onAdd: () => {
        ModalForm.open({ 
          layout: 'vertical',
          onSubmit: data => data, 
        });
      },
    };
    const listProps = {
      onEvent: (item, operate) => {
        switch(operate){
          case DELETE:break;
          case UPDATE:
          case ADD:
            ModalForm.open({ 
              layout: 'vertical',
              onSubmit: data => data, 
            });
          break;
        }
      },
      onRef:(ref) => {
        this.child = ref;
      },
    };
    return {searchProps,listProps};
  }

  render(){
    const {searchProps,listProps} = this._props();
    return(
      <Page inner>
        <Card bordered={false}>
          <SearchBar {...searchProps} />
          <ListView {...listProps} />
        </Card>
      </Page>
    );
  }
}