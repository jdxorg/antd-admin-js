import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { SearchForm,SearchButtonGroup } from 'components'
import { withI18n } from '@lingui/react'
import { Form, Row, Col, Input } from 'antd'
import { ColProps,TwoColProps } from '@/utils/sys/props'
const { Search } = Input

@withI18n()
@Form.create()
class Filter extends Component {
  render() {
    const { onAdd,onSearch, form, i18n } = this.props
    const { getFieldDecorator } = form
    const renderSearchForm = ()=>
    <Row gutter={24}>
      <Col 
        {...ColProps} 
        xl={{ span: 4 }} 
        md={{ span: 8 }}>
        {getFieldDecorator('name')(
          <Search placeholder={i18n.t`Search.Name`} />
        )}
      </Col>
      <Col
        {...TwoColProps}
        xl={{ span: 20 }}
        md={{ span: 16 }}
        sm={{ span: 24 }}>
        <SearchButtonGroup {...{onReset:e=>this.searchForm.reset(),onAdd}} />
      </Col>
    </Row>
    return (
      <SearchForm
        root={this}
        onSearch={onSearch}
        render={renderSearchForm}
        searchOnReset={true}
        />
    )
  }
}

Filter.propTypes = {
  onAdd: PropTypes.func,
  form: PropTypes.object,
  onSearch: PropTypes.func,
}

export default Filter
