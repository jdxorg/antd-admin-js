/*
 * @Author: dexiaojiang 289608944@qq.com
 * @Description: In User Settings Edit
 * @Date: 2019-08-27 15:49:35
 * @LastEditTime: 2019-08-27 15:50:11
 * @LastEditors: dexiaojiang 289608944@qq.com
 */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { SearchForm } from 'components'
import { withI18n } from '@lingui/react'
import { Input } from 'antd'

const { Search } = Input

@withI18n()
class Filter extends Component {
  render() {
    const { onAdd, onSearch, i18n } = this.props
    const children = [
      {
        id: 'name',
        key: 'navbarName',
        child: <Search placeholder={i18n.t`Name`} />,
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
