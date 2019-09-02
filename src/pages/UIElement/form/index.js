import React, { Component, Fragment } from 'react'
import {
  Button,
  Input,
  InputNumber,
  Row,
  Col,
  Checkbox,
  Radio,
  Form,
  message,
  Card,
} from 'antd'
import {
  BaseComponent,
  DrawerForm,
  SearchForm,
  ModalForm,
} from '@/components/antd-design/Form'
import {
  renderFormItem,
  renderSelect,
  renderRadioGroup,
} from '@/components/antd-design/Form/BaseForm'

const { TextArea } = Input

/**
 * 自定义表单控件
 */
class SizeInput extends Component {
  /**
   * @description:
   * @param {type}
   * @return:
   */
  triggerChange = (changedValue, isWidth) => {
    const { onChange, value } = this.props
    if (onChange) {
      const [width = '', height = ''] = value ? value.split('*') : []
      const { width: newWidth = '', height: newHeight = '' } = changedValue
      const size = isWidth ? `${newWidth}*${height}` : `${width}*${newHeight}`
      onChange(size)
    }
  }

  /**
   * @description:
   * @param {type}
   * @return:
   */
  handleWidthChange = val => this.triggerChange({ width: val }, true)

  /**
   * @description:
   * @param {type}
   * @return:
   */
  handleHeightChange = val => this.triggerChange({ height: val })

  render() {
    const { value } = this.props
    const [width = '', height = ''] = value ? value.split('*') : []
    const style = { width: '90%' }
    return (
      <div>
        <Col span={6}>
          <InputNumber
            style={style}
            value={width}
            onChange={this.handleWidthChange}
          />
        </Col>
        <Col span={6}>
          <InputNumber
            style={style}
            value={height}
            onChange={this.handleHeightChange}
          />
        </Col>
      </div>
    )
  }
}

class Demo1 extends ModalForm {
  getTitle = () => '模态框式表单1'

  getDataSource = () => [
    { label: 'key1', name: 'name1', required: true },
    { label: 'key2', name: 'name2', required: true },
    { label: 'key3', name: 'name3' },
  ]
}

class Demo2 extends DrawerForm {
  getTitle = () => '抽屉式表单1'

  getDataSource = () => [
    { label: 'key1', name: 'name1', required: true },
    { label: 'key2', name: 'name2' },
    { label: 'key3', name: 'name3', required: true },
  ]
}

const map = { all: '全部', key1: '选项1', key2: '选项2' }
function getDataSource() {
  const { formValues = {} } = this.props
  return [
    { label: 'key1', name: 'name1', required: true },
    {
      label: 'key2',
      name: 'name2',
      required: true,
      itemRender: <Input type="password" autoComplete="off" />,
    },
    {
      label: 'key3',
      name: 'name3',
      required: true,
      itemRender: renderSelect(map),
    },
    {
      label: 'key4',
      name: 'name5',
      required: true,
      itemRender: getFieldDecorator => (
        <div>
          <Col span={6}>
            {getFieldDecorator('name5', {
              rules: [{ required: true, message: `请选择` }],
              initialValue: formValues.name5,
            })(renderSelect(map, { style: { width: '90%' } }))}
          </Col>
          {[
            { label: 'key6', name: 'name6' },
            { label: 'key7', name: 'name7' },
            { label: 'key8', name: 'name8' },
          ].map(({ label, name }) => (
            <Col span={6} key={name}>
              {getFieldDecorator(name, {
                initialValue: formValues[name],
                valuePropName: 'checked',
              })(<Checkbox>{label}</Checkbox>)}
            </Col>
          ))}
        </div>
      ),
    },
    {
      label: 'key9',
      name: 'name9',
      valuePropName: 'checked',
      itemRender: <Checkbox>必填</Checkbox>,
    },
    {
      label: 'key10',
      name: 'name10',
      itemRender: renderRadioGroup(map, Radio.Button),
    },
    {
      label: 'key11',
      name: 'name11',
      itemRender: renderRadioGroup(map),
    },
    {
      label: 'key12',
      name: 'name12',
      itemRender: <TextArea rows={4} />,
    },
    {
      label: 'key13',
      name: 'name13',
      itemRender: <SizeInput />,
    },
  ]
}
class Demo3 extends ModalForm {
  getTitle = () => '模态框式表单2'

  getDataSource = getDataSource.bind(this)
}

class Demo4 extends DrawerForm {
  getDataSource = getDataSource.bind(this)
}

const showDemo1 = () => Demo1.open()
const showDemo2 = () => Demo2.open()
const showDemo3 = () => Demo3.open({ formValues: { name9: true } })
const showDemo4 = () =>
  Demo4.open({
    title: '抽屉式表单2',
    width: 640,
    onSubmit: data => message.success(`表单提交:${JSON.stringify(data)}`),
    layout: 'horizontal',
    formLayout: { labelCol: { span: 5 }, wrapperCol: { span: 15 } },
    okText: '确认',
    cancelText: '关闭',
    formValues: {
      name1: '初始值',
      name2: '初始值2',
      name3: 'all',
      name5: 'key1',
      name7: true,
      name13: '1920*1080',
    },
  })

export default class Forms extends BaseComponent {
  search = data => message.success(`搜索提交:${JSON.stringify(data)}`)

  renderSearchForm = ({ form: { getFieldDecorator } }) => (
    <Fragment>
      <Row>
        <Button
          icon="plus"
          type="primary"
          onClick={() => Demo1.open({ title: '新增' })}
        >
          新增
        </Button>
      </Row>
      <Row style={{ marginTop: 16 }}>
        <Col span={18}>
          <Form.Item label="条件1">
            {getFieldDecorator('param1')(<Input placeholder="请输入" />)}
          </Form.Item>
          {renderFormItem(
            { label: '条件2', name: 'param2' },
            getFieldDecorator
          )}
          {renderFormItem(
            { label: '条件3', name: 'param3' },
            getFieldDecorator
          )}
        </Col>
        <Col span={6} style={{ textAlign: 'right' }}>
          <span>
            <Button type="primary" htmlType="submit">
              查询
            </Button>
            <Button
              style={{ marginLeft: 8 }}
              onClick={() => this.searchForm.reset()}
            >
              重置并提交
            </Button>
            <Button
              style={{ marginLeft: 8 }}
              onClick={() => this.searchForm.reset(false)}
            >
              只重置
            </Button>
          </span>
        </Col>
      </Row>
    </Fragment>
  )

  render() {
    return (
      <Fragment>
        <Card title="弹出表单">
          <Button.Group>
            <Button type="primary" onClick={showDemo1}>
              demo1
            </Button>
            <Button type="primary" onClick={showDemo2}>
              demo2
            </Button>
            <Button type="primary" onClick={showDemo3}>
              demo3
            </Button>
            <Button type="primary" onClick={showDemo4}>
              demo4
            </Button>
          </Button.Group>
        </Card>
        <Card title="搜索表单" style={{ marginTop: 24 }}>
          <SearchForm
            root={this}
            onSearch={this.search}
            render={this.renderSearchForm}
            searchOnReset={false}
          />
        </Card>
      </Fragment>
    )
  }
}
