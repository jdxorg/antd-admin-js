import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Modal } from 'antd'
import { DropOption, DataTable } from 'components'
import { Trans, withI18n } from '@lingui/react'
import { HandleType } from '@/constant'

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

    const columns = [
      {
        title: <Trans>Image</Trans>,
        dataIndex: 'image',
        width: 72,
        fixed: 'left',
        render: text => (
          <img style={{ width: 150, height: 100 }} alt="" src={text} />
        ),
      },
      {
        title: <Trans>Name</Trans>,
        dataIndex: 'name',
      },
      {
        title: <Trans>Description</Trans>,
        dataIndex: 'description',
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
              ]}
            />
          )
        },
      },
    ]

    return <DataTable {...tableProps} pagination={false} columns={columns} />
  }
}

List.propTypes = {
  onDeleteItem: PropTypes.func.isRequired,
  onEditItem: PropTypes.func.isRequired,
}

export default List
