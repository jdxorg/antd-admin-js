import React from 'react'
import { Row, Col } from 'antd'
import {
  CDatePicker,
  CMonthPicker,
  CWeekPicker,
  CRangePicker,
  CTimePicker,
} from '@/components'

export default class DatePicker extends React.Component {
  render() {
    return (
      <React.Fragment>
        <Row>
          <Col style={{ padding: 30 }}>
            <CDatePicker />
          </Col>
        </Row>
        <Row style={{ padding: 30 }}>
          <Col>
            <CMonthPicker />
          </Col>
        </Row>
        <Row style={{ padding: 30 }}>
          <Col>
            <CWeekPicker />
          </Col>
        </Row>
        <Row style={{ padding: 30 }}>
          <Col>
            <CRangePicker />
          </Col>
        </Row>
        <Row style={{ padding: 30 }}>
          <Col>
            <CTimePicker />
          </Col>
        </Row>
      </React.Fragment>
    )
  }
}
