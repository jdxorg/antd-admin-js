import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Tree } from 'antd';
import { withI18n } from '@lingui/react';
import { BaseModal } from 'components';

@withI18n()
class RoleModal extends PureComponent {

  state = {
    checkedKeys:null,
  }

  componentWillReceiveProps(nextProps){
    const {item={}} = nextProps;
    const {checkedKeys} = this.state;
    if(item.user.visit){
      this.state.checkedKeys = checkedKeys||item.user.visit;
    }
  }

  handleOk = () => {
    const { item = {}, onOk } = this.props;
    const {checkedKeys} = this.state;
    const data = {
      visit:checkedKeys,
      id: item.user.id,
    };
    onOk(data);
  }


  onCheck = (checkedKeys) => {
    this.setState({checkedKeys});
  }

  render() {
    const { item = {}, onOk, i18n,modal,form, ...modalProps } = this.props;
    const { routeList } = item;
    const { checkedKeys} = this.state;
    return (
      <BaseModal
        {...modalProps}
        onOk={this.handleOk}
        child={
          <Tree
            checkable
            defaultExpandAll
            treeData={routeList}
            checkedKeys={checkedKeys}
            onSelect={this.onSelect}
            onCheck={this.onCheck}
          />  
        }
      />
    );
  }
}

RoleModal.propTypes = {
  item: PropTypes.object.isRequired,
  onOk: PropTypes.func.isRequired,
};

export default RoleModal;
