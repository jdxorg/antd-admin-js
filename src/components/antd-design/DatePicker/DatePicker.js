import React from 'react';
import { DatePicker } from 'antd';
import PropTypes from 'prop-types';

class CDatePicker extends React.Component{

  render(){
    const {onChange,...props} = this.props;
    return (
      <div className="date-picker">
        <DatePicker onChange={onChange} {...props} />
      </div>
    );
  }
}

CDatePicker.propTypes = {
  onChange: PropTypes.func,
};

CDatePicker.defaultProps = {
  onChange:()=>{},
};

export default CDatePicker;