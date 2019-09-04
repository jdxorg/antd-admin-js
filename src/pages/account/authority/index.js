import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'dva'
import { Row, Col, Button, Popconfirm } from 'antd'
import { withI18n } from '@lingui/react'

import { Page } from 'components'
import List from './components/List'
import Filter from './components/Filter'
import Modal from './components/Modal'

@withI18n()
@connect(({ authority }) => ({ authority }))
class Authority extends PureComponent {
  constructor(props) {
    super(props)
    this.state = {}
    this.onSearch = this.onSearch.bind(this)
    this.onAdd = this.onAdd.bind(this)
  }

  onSearch(value) {
    console.log(value, 23333)
  }

  onAdd() {
    alert(2222)
  }

  render() {
    const listProps = {
      dataSource: [],
      // loading:'',
      onDeleteItem() {},
      onEditItem() {},
    }
    return (
      <Page inner>
        <Filter onSearch={this.onSearch} onAdd={this.onAdd} />
        <List {...listProps} />
      </Page>
    )
  }
}

export default Authority
