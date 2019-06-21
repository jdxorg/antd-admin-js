/* global document */
import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { FilterItem,SearchForm,SearchButtonGroup } from 'components';
import { withI18n } from '@lingui/react';
import { Form, Row, Col, DatePicker, Input, Cascader } from 'antd';
import city from '@/utils/sys/city';
import { ColProps,TwoColProps } from '@/utils/sys/props';

const { Search } = Input;
const { RangePicker } = DatePicker;

@withI18n()
@Form.create()
class Filter extends Component {
  handleFields = fields => {
    const { createTime } = fields;
    if (createTime.length) {
      fields.createTime = [
        moment(createTime[0]).format('YYYY-MM-DD'),
        moment(createTime[1]).format('YYYY-MM-DD'),
      ];
    }
    return fields;
  }

  handleSubmit = () => {
    const { onSearch, form } = this.props;
    const { getFieldsValue } = form;

    let fields = getFieldsValue();
    fields = this.handleFields(fields);
    onSearch(fields);
  }

  handleChange = (key, values) => {
    const { form, onSearch } = this.props;
    const { getFieldsValue } = form;

    let fields = getFieldsValue();
    fields[key] = values;
    fields = this.handleFields(fields);
    onSearch(fields);
  }

  render() {
    const { onAdd, onSearch, form, i18n } = this.props;
    const { getFieldDecorator } = form;

    const renderSearchForm = ()=> (
      <Row gutter={24}>
        <Col 
          {...ColProps} 
          xl={{ span: 4 }} 
          md={{ span: 8 }}
        >
          {getFieldDecorator('name')(
            <Search
              placeholder={i18n.t`Search.Name`}
              onSearch={this.handleSubmit}
            />
          )}
        </Col>
        <Col
          {...ColProps}
          xl={{ span: 4 }}
          md={{ span: 8 }}
          id="addressCascader"
        >
          {getFieldDecorator('address')(
            <Cascader
              style={{ width: '100%' }}
              options={city}
              placeholder={i18n.t`Please.pick.an.address`}
              onChange={this.handleChange.bind(this, 'address')}
              getPopupContainer={() =>
                document.getElementById('addressCascader')
              }
            />
          )}
        </Col>
        <Col
          {...ColProps}
          xl={{ span: 6 }}
          md={{ span: 8 }}
          sm={{ span: 12 }}
          id="createTimeRangePicker"
        >
          <FilterItem label={i18n.t`CreateTime`}>
            {getFieldDecorator('createTime')(
              <RangePicker
                style={{ width: '100%' }}
                onChange={this.handleChange.bind(this, 'createTime')}
                getCalendarContainer={() => {
                  return document.getElementById('createTimeRangePicker');
                }}
              />
            )}
          </FilterItem>
        </Col>
        <Col
          {...TwoColProps}
          xl={{ span: 10 }}
          md={{ span: 24 }}
          sm={{ span: 24 }}
        >
          <SearchButtonGroup {...{onReset:()=>this.searchForm.reset(),onAdd}} />
        </Col>
      </Row>
);
    return (
      <SearchForm
        root={this}
        onSearch={onSearch}
        render={renderSearchForm}
        searchOnReset
      />
    ); 
  }
}

Filter.propTypes = {
  onAdd: PropTypes.func.isRequired,
  form: PropTypes.object.isRequired,
  onSearch: PropTypes.func.isRequired,
};

export default Filter;
