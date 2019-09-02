import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import { Transfer } from 'antd'
import { withI18n } from '@lingui/react'
import { BaseModal } from 'components'

@withI18n()
class RoleSettingModal extends PureComponent {
  state = {
    targetKeys: null,
    selectedKeys: [],
  }

  componentWillReceiveProps(nextProps) {
    const { item = {} } = nextProps
    const { targetKeys } = this.state
    if (item.relations) {
      this.state.targetKeys = targetKeys || item.relations.map(_ => _.id)
    }
  }

  handleOk = () => {
    const { item = {}, onOk } = this.props
    const { targetKeys } = this.state
    onOk({ userIds: targetKeys, id: item.id })
  }

  handleChange = nextTargetKeys => {
    this.setState({ targetKeys: nextTargetKeys })

    // console.log('targetKeys: ', nextTargetKeys);
    // console.log('direction: ', direction);
    // console.log('moveKeys: ', moveKeys);
  }

  handleSelectChange = (sourceSelectedKeys, targetSelectedKeys) => {
    this.setState({
      selectedKeys: [...sourceSelectedKeys, ...targetSelectedKeys],
    })

    // console.log('sourceSelectedKeys: ', sourceSelectedKeys);
    // console.log('targetSelectedKeys: ', targetSelectedKeys);
  }

  render() {
    const { item = {}, onOk, i18n, modal, ...modalProps } = this.props
    const { targetKeys, selectedKeys } = this.state

    return (
      <BaseModal
        {...modalProps}
        onOk={this.handleOk}
        child={
          <div>
            <Transfer
              dataSource={item.users || []}
              titles={['Source', 'Target']}
              targetKeys={targetKeys}
              selectedKeys={selectedKeys}
              onChange={this.handleChange}
              onSelectChange={this.handleSelectChange}
              render={o => o.title}
            />
          </div>
        }
      />
    )
  }
}

RoleSettingModal.propTypes = {
  item: PropTypes.object.isRequired,
  onOk: PropTypes.func.isRequired,
}

export default RoleSettingModal
