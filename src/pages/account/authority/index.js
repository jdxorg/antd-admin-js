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
  }

  componentDidMount() {}

  render() {
    const { authority, dispatch } = this.props
    const { list, pagination } = authority // 取得是state里面的东西
    const handleRefresh = payload =>
      dispatch({ type: 'authority/query', payload })
    const filterProps = {
      onSearch(value) {
        handleRefresh({
          ...value,
          current: 1,
        })
      },
      onAdd() {
        alert(2333)
      },
    }
    const listProps = {
      dataSource: list.data,
      loading: false,
      onDeleteItem() {},
      onEditItem() {},
    }
    return (
      <Page inner>
        <Filter {...filterProps} />
        <List {...listProps} />
      </Page>
    )
  }
}
Authority.propTypes = {
  authority: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}
export default Authority
