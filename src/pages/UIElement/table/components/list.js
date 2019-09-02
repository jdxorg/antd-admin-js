import React from 'react'
import { Modal, Icon } from 'antd'
import { DataTable } from 'components'
import { HandleType } from '@/constant'

const { UPDATE, DELETE } = HandleType
const { confirm } = Modal
export default class ListView extends React.Component {
  render() {
    const { onEvent } = this.props
    const columns = [
      {
        title: 'id',
        dataIndex: 'id',
        width: 172,
        fixed: 'left',
      },
      {
        title: 'name ',
        dataIndex: 'name',
      },
      {
        title: 'age ',
        dataIndex: 'age',
      },
      {
        title: 'Action',
        dataIndex: 'operation',
        width: 172,
        fixed: 'right',
        render: (text, record) => {
          return (
            <div className="opIcon">
              <Icon
                className="icon"
                type="edit"
                title="edit"
                onClick={onEvent.bind(null, record, UPDATE)}
              />
              <Icon
                className="icon"
                type="delete"
                title="delete"
                onClick={handleDeleteItem.bind(null, record, this)}
              />
            </div>
          )
        },
      },
    ]
    const handleDeleteItem = record => {
      confirm({
        title: '您确定要删除吗?',
        onOk() {
          onEvent(record, DELETE)
        },
      })
    }
    return <DataTable columns={columns} />
  }
}
