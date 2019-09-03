import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Modal, Avatar } from 'antd'
import { DropOption, DataTable } from 'components'
import { Trans, withI18n } from '@lingui/react'
import { Role, HandleType } from '@/constant'
import { dateFormat } from 'utils'

const { confirm } = Modal

@withI18n()
class List extends PureComponent {
  handleMenuClick = (record, e) => {
    const { onDeleteItem, onEditItem, onSettingItem, i18n } = this.props
    if (+e.key === HandleType.UPDATE) {
      onEditItem(record)
    } else if (+e.key === HandleType.DELETE) {
      confirm({
        title: i18n.t`Delete.Title`,
        onOk() {
          onDeleteItem(record.id)
        },
      })
    } else if (+e.key === HandleType.SETTING) {
      onSettingItem(record)
    }
  }

  render() {
    const { onDeleteItem, onEditItem, i18n, roles, ...tableProps } = this.props
    const isEditor = roles && ~roles.indexOf(Role.ADMIN)
    const columns = [
      {
        title: <Trans>Avatar</Trans>,
        dataIndex: 'avatar',
        width: 72,
        fixed: 'left',
        render: text => <Avatar style={{ marginLeft: 8 }} src={text} />,
      },
      {
        title: <Trans>Account</Trans>,
        dataIndex: 'loginName',
      },
      {
        title: <Trans>Name</Trans>,
        dataIndex: 'userName',
        // render: (text, record) => <Link to={`user/${record.id}`}>{text}</Link>,
      },
      {
        title: <Trans>NickName</Trans>,
        dataIndex: 'nickName',
      },
      {
        title: <Trans>Age</Trans>,
        dataIndex: 'age',
      },
      {
        title: <Trans>Gender</Trans>,
        dataIndex: 'gender',
        render: text => <span>{+text === 0 ? 'Male' : 'Female'}</span>,
      },
      {
        title: <Trans>Phone</Trans>,
        dataIndex: 'mobile',
      },
      {
        title: <Trans>Email</Trans>,
        dataIndex: 'email',
      },
      {
        title: <Trans>Address</Trans>,
        dataIndex: 'address',
      },
      {
        title: <Trans>CreateTime</Trans>,
        dataIndex: 'createdAt',
        render: text => {
          return dateFormat(text, 'YYYY-MM-DD HH:MM')
        },
      },
      {
        title: <Trans>CreateBy</Trans>,
        dataIndex: 'createdBy',
      },
      {
        title: <Trans>UpdatedTime</Trans>,
        dataIndex: 'updatedAt',
        render: text => {
          return dateFormat(text, 'YYYY-MM-DD HH:MM')
        },
      },
      {
        title: <Trans>UpdatedBy</Trans>,
        dataIndex: 'updatedBy',
      },
      {
        title: <Trans>Operation</Trans>,
        key: 'operation',
        fixed: 'right',
        render: (text, record) => {
          if (isEditor) {
            return (
              <DropOption
                onMenuClick={e => this.handleMenuClick(record, e)}
                menuOptions={[
                  { key: HandleType.UPDATE, name: i18n.t`Update` },
                  { key: HandleType.DELETE, name: i18n.t`Delete` },
                  { key: HandleType.SETTING, name: i18n.t`Setting` },
                  { key: HandleType.DETAIL, name: i18n.t`Detail` },
                ]}
              />
            )
          } else {
            return (
              <DropOption
                onMenuClick={e => this.handleMenuClick(record, e)}
                menuOptions={[{ key: HandleType.DETAIL, name: i18n.t`Detail` }]}
              />
            )
          }
        },
      },
    ]

    return (
      <DataTable
        {...tableProps}
        pagination={tableProps.pagination}
        columns={columns}
      />
    )
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
}

export default List
