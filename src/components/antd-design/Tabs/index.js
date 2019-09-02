import React from 'react'
import PropTypes from 'prop-types'
import { Tabs } from 'antd'
import classnames from 'classnames'

const CTabs = ({ tabs, className, ...props }) => {
  const { TabPane } = Tabs
  const tabsNs = tabs.map(tab => {
    return (
      tab && (
        <TabPane tab={tab.name} key={String(tab.key)}>
          {tab.component}
        </TabPane>
      )
    )
  })
  return (
    <div className={classnames(className)}>
      <Tabs {...props}>{tabsNs}</Tabs>
    </div>
  )
}

CTabs.propTypes = {
  tabs: PropTypes.array.isRequired,
  tabClick: PropTypes.func,
  className: PropTypes.string,
}

CTabs.defaultProps = {
  tabClick: () => {},
  className: '',
}

export default CTabs
