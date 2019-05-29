import React from 'react'
import { Button,Row,Col } from 'antd';

export default class ButtonPage extends React.Component {

  render(){
    return(
      <div>
        <Row>
          <Col span={2}>
            <Button type="primary" >click me</Button>
          </Col>
          <Col span={2}>
            <Button type="dashed" disabled>disabled</Button>
          </Col>
          <Col span={2}>
            <Button type="danger" loading>loading</Button>
          </Col>
          <Col span={2}>
            <Button type="default" href="http://www.baidu.com">www.baidu.com</Button>
          </Col>
        </Row>
      </div>
    );
  }
}