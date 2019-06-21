import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Modal} from 'antd'
import { DropOption,DataTable } from 'components'
import { Trans, withI18n } from '@lingui/react'
const { confirm } = Modal

@withI18n()
class List extends PureComponent {
  handleMenuClick = (record, e) => {
    const { onDeleteItem, onEditItem, i18n } = this.props
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '2') {
      confirm({
        title: i18n.t`Delete.Title`,
        onOk() {
          onDeleteItem(record.id)
        },
      })
    }
  }

  render() {
    const { onDeleteItem, onEditItem, i18n, ...tableProps } = this.props

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
      },
      {
        title: <Trans>Creator</Trans>,
        dataIndex: 'creator',
        key: 'creator',
      },
      {
        title: <Trans>CreateTime</Trans>,
        dataIndex: 'createTime',
        key: 'createTime',
      },
      {
        title: <Trans>Updator</Trans>,
        dataIndex: 'updator',
        key: 'updator',
      },
      {
        title: <Trans>UpdateTime</Trans>,
        dataIndex: 'updateTime',
        key: 'updateTime',
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
                { key: '1', name: i18n.t`Update` },
                { key: '2', name: i18n.t`Delete` },
              ]}
            />
          )
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
  onDeleteItem: PropTypes.func,
  onEditItem: PropTypes.func,
  location: PropTypes.object,
}

export default List
