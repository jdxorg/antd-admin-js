import React from 'react'
import { Row,Button } from 'antd'
import { Trans, withI18n } from '@lingui/react'
@withI18n()
class SearchButtonGroup extends React.Component{
  
  render(){
    const { onReset,onAdd } = this.props
    return(
      <Row type="flex" align="middle" justify="space-between">
        <div>
          <Button type="primary" className="margin-right" htmlType="submit">
            <Trans>Search</Trans>
          </Button>
          <Button onClick={ onReset }>
            <Trans>Reset</Trans>
          </Button>
        </div>
        <Button type="ghost" onClick={onAdd}>
          <Trans>Create</Trans>
        </Button>
      </Row>
    )
  }
}
export default SearchButtonGroup