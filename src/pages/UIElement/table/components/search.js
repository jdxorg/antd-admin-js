import React from 'react';
import { Input,Row,Col,Form,Button,Icon } from 'antd';
import { SearchForm } from '@/components/Form';
import { Trans, withI18n } from '@lingui/react';
const ColProps = {
  xs: 24,
  sm: 12,
  style: {
    marginBottom: 16,
  },
}

const TwoColProps = {
  ...ColProps,
  xl: 96,
}
@withI18n()
class SearchBar extends React.Component {
  render(){
    const {onSearch,onAdd } = this.props;
    const search = fields => onSearch&&onSearch(fields);
    const renderSearchForm = ({ form: { getFieldDecorator } })=>(
      <Row gutter={24} >
        <Col 
          {...ColProps} 
          xl={{ span: 6 }} 
          md={{ span: 12 }}>
        {getFieldDecorator('name')(
          <Input.Search placeholder="Action Name" />
        )}
        </Col>
        <Col 
          {...TwoColProps} 
          xl={{ span: 18 }} 
          md={{ span: 12 }} 
          sm={{ span: 12 }}>
          <Row type="flex" align="middle" justify="space-between">
            <div>
              <Button type="primary" htmlType="submit" className="margin-right"  >
                <Trans>Search</Trans>
              </Button>
              <Button onClick={ ()=>this.searchForm.reset() }>
                <Trans>Reset</Trans>
              </Button>
            </div>
            <Button type="ghost" onClick={onAdd}>
              <Trans>Create</Trans>
            </Button>
          </Row>
        </Col>
      </Row>
    );
    
    return(
      <SearchForm
        root={this}
        onSearch={search}
        render={renderSearchForm}
        searchOnReset={true}
        />
    );
  }
}
export default Form.create()(SearchBar)