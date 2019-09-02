/* global document */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { SearchForm } from 'components'
import { withI18n } from '@lingui/react'
import { DatePicker, Input, Cascader, Select } from 'antd'
import city from '@/utils/sys/city'

const { Search } = Input
const { RangePicker } = DatePicker

@withI18n()
class Filter extends Component {
  render() {
    const { onAdd, onSearch, i18n } = this.props
    const children = [
      {
        id: 'userName',
        key: 'userName',
        child: <Search placeholder={i18n.t`Search.UserName`} />,
      },
      {
        id: 'state',
        key: 'state',
        child: (
          <Select
            style={{ width: 150 }}
            placeholder={i18n.t`Pick.an.state`}
            allowClear
          >
            <Select.Option value={1}>启用</Select.Option>
            <Select.Option value={0}>禁用</Select.Option>
          </Select>
        ),
      },
      {
        id: 'addressCascader',
        key: 'addressCode',
        child: (
          <Cascader
            style={{ width: '100%' }}
            options={city}
            placeholder={i18n.t`Please.pick.an.address`}
            getPopupContainer={() => document.getElementById('addressCascader')}
          />
        ),
      },
      {
        id: 'createTimeRangePicker',
        key: 'createTime',
        child: (
          <RangePicker
            style={{ width: '100%' }}
            getCalendarContainer={() =>
              document.getElementById('createTimeRangePicker')
            }
          />
        ),
      },
    ]
    return <SearchForm onSearch={onSearch} onCreate={onAdd} child={children} />
  }
}

Filter.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
}

export default Filter
