import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { SearchForm } from 'components'
import { withI18n } from '@lingui/react'
import { Form, Row, Col, Input } from 'antd'
import { ColProps,TwoColProps } from '@/utils/sys/props'
const { Search } = Input

@withI18n()
@Form.create()
class Filter extends Component {
  render() {
    const { onAdd,onSearch,i18n } = this.props
    
    const children = [
      {
        id:'name',
        key:'name',
        child:<Search
          placeholder={i18n.t`Search.Name`}
        />,
      },
    ];

    return (
      <SearchForm
        onCreate={onAdd}
        onSearch={onSearch}
        children={children}
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
