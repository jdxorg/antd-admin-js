import React from 'react';
import { TimePicker } from 'antd';
import PropTypes from 'prop-types';

class CTimePicker extends React.Component{

  render(){
    const {onChange,...props} = this.props;
    return (
      <div className="time-picker">
        <TimePicker placeholder="Select Time" onChange={onChange} {...props} />
      </div>
    );
  }
}

CTimePicker.propTypes = {
  onChange: PropTypes.func,
};

CTimePicker.defaultProps = {
  onChange:()=>{},
};

export default CTimePicker;