import React from 'react';
import { DatePicker } from 'antd';
import PropTypes from 'prop-types';

const {RangePicker} = DatePicker;
class CRangePicker extends React.Component{

  render(){
    const {onChange,...props} = this.props;
    return (
      <div className="date-picker">
        <RangePicker onChange={onChange} {...props} />
      </div>
    );
  }
}

CRangePicker.propTypes = {
  onChange: PropTypes.func,
};

CRangePicker.defaultProps = {
  onChange:()=>{},
};

export default CRangePicker;