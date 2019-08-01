import React from 'react';
import PropTypes from 'prop-types';
import { Table } from 'antd';
import { withI18n } from '@lingui/react';
import styles from './DataTable.less';

@withI18n()
class DataTable extends React.Component {

  render () {
    const { 
      columns,
      rowKey,
      loading,
      dataSource,
      pagination,
      className,
      scroll,
      i18n,
      ...tableProps
    } = this.props;
    return (
      <Table
        bordered
        className={className||styles.table}
        scroll={scroll||{ x: 1200 }}
        loading={loading}
        pagination={{
          ...pagination,
          ...{
            showTotal: total => i18n.t`Total ${total} Items`,
            showSizeChanger: true,
            showQuickJumper: true},
          }
        }
        dataSource={dataSource}
        columns={columns}
        rowKey={row => row[rowKey]||row.id}
        onChange={this.handleTableChange}
        {...tableProps}
      />
    );
  }
}


DataTable.propTypes = {
  loading:PropTypes.bool.isRequired,
  rowKey: PropTypes.string,
  pagination: PropTypes.object,
  columns: PropTypes.array.isRequired,
  dataSource:PropTypes.array.isRequired,
  tableProps:PropTypes.object,
};

DataTable.defaultProps = {
  rowKey:'id',
  tableProps:{},
  pagination:null,
};

export default DataTable;