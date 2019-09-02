import React from 'react'
import { DatePicker } from 'antd'
import PropTypes from 'prop-types'

const { MonthPicker } = DatePicker
class CMonthPicker extends React.Component {
  render() {
    const { onChange, ...props } = this.props
    return (
      <div className="date-picker">
        <MonthPicker
          placeholder="Select Month"
          onChange={onChange}
          {...props}
        />
      </div>
    )
  }
}

CMonthPicker.propTypes = {
  onChange: PropTypes.func,
}

CMonthPicker.defaultProps = {
  onChange: () => {},
}

export default CMonthPicker
