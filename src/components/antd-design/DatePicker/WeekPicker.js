import React from 'react'
import { DatePicker } from 'antd'
import PropTypes from 'prop-types'

const { WeekPicker } = DatePicker
class CWeekPicker extends React.Component {
  render() {
    const { onChange, ...props } = this.props
    return (
      <div className="date-picker">
        <WeekPicker placeholder="Select Week" onChange={onChange} {...props} />
      </div>
    )
  }
}

CWeekPicker.propTypes = {
  onChange: PropTypes.func,
}

CWeekPicker.defaultProps = {
  onChange: () => {},
}

export default CWeekPicker
