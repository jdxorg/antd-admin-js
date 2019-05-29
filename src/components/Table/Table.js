import React from 'react'
import _ from 'lodash'
import PropTypes from 'prop-types'
import { Table } from 'antd'
import request from '../../utils/request'
import './Table.less'

export default class DataTable extends React.Component {
  constructor (props) {
    super(props)
    const { pagination } = props
    let pager;
    if(pagination===false){
      pager = false
    }else{
      pager = {
        current: 1,
        total: 0 ,
        pageSize:10,
        ...pagination
      }
    }
    this.state = {
      loading: false,
      dataSource:[],
      fetchData: {},
      pagination:pager,
    }
    this.props.onRef(this)
  }

  componentDidMount () {
    if (this.props.fetch) {
      this.fetch()
    }
  }

  componentWillReceiveProps (nextProps) {
    const staticNextProps = _.cloneDeep(nextProps)
    delete staticNextProps.columns
    const { columns, ...otherProps } = this.props

    if (!_.isEqual(staticNextProps, otherProps)) {
      this.props = nextProps
      this.fetch()
    }
  }

  handleTableChange = (pagination, filters, sorter) => {
    const pager = this.state.pagination
    pager.current = pagination.current
    const data = this.state.fetchData
    this.setState({
      pagination: pager,
      fetchData: {
        sortField: sorter.field,
        sortOrder: sorter.order,
        ...filters,
        ...data
      },
    }, () => {
      this.fetch()
    })
  }

  fetch = () => {
    const { fetch: { url, data, dataKey } } = this.props
    const { fetchData,pagination } = this.state
    this.setState({ loading: true })
    let promise;
    if( pagination === false ){
      promise = request({
        url,
        data: {
          ...data,
          ...fetchData,
        },
      })
    }else{
      promise = request({
        url,
        data: {
          ...data,
          ...fetchData,
          ...{pageNum:pagination.current,pageSize:pagination.pageSize}
        },
      })
    }
    promise.then((result) => {
      if (!this.refs.DataTable) {
        return
      }
      const data = result
      if( pagination !== false ){
        pagination.total = data.totalSize||data.total
        this.setState({
          loading: false,
          dataSource: dataKey ? data[dataKey] : data.data,
          pagination,
        })
      }else{
        this.setState({
          loading: false,
          dataSource: dataKey ? data[dataKey] : data.data,
        })
      }
    })
  }

  reload = (values)=>{
    if (!this.props.fetch) return
    this.setState( { fetchData:{...values}, }, ()=>this.fetch() )
  }

  reset = ()=>{
    if (!this.props.fetch) return
    const pager = this.state.pagination
    pager.current = 1;
    this.setState( {fetchData:{}, pagination:pager  }, ()=>this.fetch() )
  }

  render () {
    const { tableProps } = this.props
    const { loading, dataSource, pagination } = this.state

    return (<Table
      ref="DataTable"
      bordered
      loading={loading}
      pagination={pagination}
      dataSource={dataSource}
      columns = {this.props.columns}
      rowKey={row => row[this.props.rowKey]||row.id}
      onChange={this.handleTableChange}
      {...tableProps}
    />)
  }
}


DataTable.propTypes = {
  fetch: PropTypes.object,
  rowKey: PropTypes.string,
  pagination: PropTypes.oneOfType([
    PropTypes.bool,
    PropTypes.object,
  ]),
  columns: PropTypes.array,
  tableProps:PropTypes.object
}
