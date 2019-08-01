import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { Modal} from 'antd';
import { DropOption,DataTable } from 'components';
import { Trans, withI18n } from '@lingui/react';
import { RoleType,HandleType } from '@/constant';
import { dateFormat } from 'utils';

const { confirm } = Modal;
@withI18n()
class List extends PureComponent {
  handleMenuClick = (record, e) => {
    const { onDeleteItem, onEditItem,onSettingItem, i18n } = this.props;
    if (+e.key === HandleType.UPDATE) {
      onEditItem(record);
    } else if (+e.key === HandleType.DELETE) {
      confirm({
        title: i18n.t`Delete.Title`,
        onOk() {
          onDeleteItem(record.id);
        },
      });
    } else if(+e.key === HandleType.SETTING){
      onSettingItem(record);
    }
  }

  render() {
    const { onDeleteItem, onEditItem, i18n, ...tableProps } = this.props;

    const columns = [
      {
        title: <Trans>RoleName</Trans>,
        dataIndex: 'roleName',
        key: 'roleName',
        width: 72,
        fixed: 'left',
      },
      {
        title: <Trans>RoleType</Trans>,
        dataIndex: 'roleType',
        key: 'roleType',
        render:(text)=>{
          return RoleType[text];
        },  
      },
      {
        title: <Trans>Description</Trans>,
        dataIndex: 'roleDesc',
        key: 'roleDesc',
      },
      {
        title: <Trans>Status</Trans>,
        dataIndex: 'state',
        key: 'state',
        render:(text)=>{
          if(text===0){
            return '正常';
          }else{
            return '无效';
          }
        },
      },
      {
        title: <Trans>Creator</Trans>,
        dataIndex: 'createdBy',
        key: 'createdBy',
      },
      {
        title: <Trans>CreateTime</Trans>,
        dataIndex: 'createdAt',
        key: 'createdAt',
        render:(text)=>{
          return dateFormat(new Date(+text),'YYYY-MM-DD HH:MM');
        },
      },
      {
        title: <Trans>Updator</Trans>,
        dataIndex: 'updatedBy',
        key: 'updatedBy',
      },
      {
        title: <Trans>UpdateTime</Trans>,
        dataIndex: 'updatedAt',
        key: 'updatedAt',
        render:(text)=>{
          return dateFormat(new Date(+text),'YYYY-MM-DD HH:MM');
        },
      },
      {
        title: <Trans>Operation</Trans>,
        key: 'operation',
        fixed: 'right',
        render: (text, record) => {
          return (
            <DropOption
              onMenuClick={e => this.handleMenuClick(record, e)}
              menuOptions={[
                { key: HandleType.UPDATE, name: i18n.t`Update` },
                { key: HandleType.DELETE, name: i18n.t`Delete` },
                { key: HandleType.SETTING, name: i18n.t`Setting` },
              ]}
            />
          );
        },
      },
    ];

    return (
      <DataTable
        {...tableProps}
        pagination={tableProps.pagination}
        columns={columns}
      />
    );
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
};

export default List;
