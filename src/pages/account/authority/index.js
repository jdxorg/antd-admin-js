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
    // const {
    //   list,
    // } = authority;
    const handleRefresh = payload =>
      dispatch({ type: 'authority/query', payload })
    const filterProps = {
      onSearch(value) {
        console.log(value, 23333)
      },
      onAdd() {
        alert(2222)
      },
    }
    const listProps = {
      dataSource: [],
      loading: true,
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
