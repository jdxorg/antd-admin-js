import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { SearchForm } from 'components'
import { withI18n } from '@lingui/react'
import { Form,Input } from 'antd'

const { Search } = Input;

@withI18n()
@Form.create()
class Filter extends Component {
  render() {
    const { onAdd,onSearch,i18n } = this.props;
    
    const children = [
      {
        id:'roleName',
        key:'roleName',
        child:<Search
          placeholder={i18n.t`Search.Name`}
        />,
      },
    ];

    return (
      <SearchForm
        onCreate={onAdd}
        onSearch={onSearch}
        child={children}
      />
    );
  }
}

Filter.propTypes = {
  onAdd: PropTypes.func.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default Filter;
