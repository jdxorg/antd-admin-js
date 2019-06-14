import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
import Navlink from 'umi/navlink'
import withRouter from 'umi/withRouter'
import {
  arrayToTree,
  queryAncestors,
  pathMatchRegexp,
} from 'utils'
import store from 'store'

const { SubMenu } = Menu

@withRouter
class SiderMenu extends PureComponent {
  state = {
    openKeys: store.get('openKeys') || [],
  }

  onOpenChange = openKeys => {
    const { menus } = this.props
    const rootSubmenuKeys = menus.map(_ => _.id)

    const latestOpenKey = openKeys.find(
      key => this.state.openKeys.indexOf(key) === -1
    )

    let newOpenKeys = openKeys
    if (rootSubmenuKeys.indexOf(latestOpenKey) !== -1) {
      newOpenKeys = latestOpenKey ? [latestOpenKey] : []
    }

    this.setState({
      openKeys: newOpenKeys,
    })
    store.set('openKeys', newOpenKeys)
  }

  generateMenus = (data,lang) => {
    return data.map(item => {
      if( !item.hideInMenu ){

        if (item.children) {
          return (
            <SubMenu
              key={item.id}
              title={
                <Fragment>
                  {item.icon && <Icon type={item.icon} />}
                  {lang==='zh'&&<span>{item.zh.name}</span> }
                  {lang==='en'&&<span>{item.name}</span> }
                </Fragment>
              }
            >
              {this.generateMenus(item.children,lang)}
            </SubMenu>
          )
        }
        return (
          <Menu.Item key={item.id}>
            <Navlink to={item.route||'#'}>
              {item.icon && <Icon type={item.icon} />}
              {lang==='zh'&&<span>{item.zh.name}</span> }
              {lang==='en'&&<span>{item.name}</span> }
            </Navlink>
          </Menu.Item>
        )
      }
    })
  }

  render() {
    const {
      collapsed,
      theme,
      menus,
      location,
      isMobile,
      onCollapseChange,
    } = this.props

    // Find a menu that matches the pathname.
    let selectedItems = queryAncestors(menus,location.pathname)
    // Find the key that should be selected according to the current menu.
    selectedItems = selectedItems?selectedItems:menus[0]
    const selectedKeys = selectedItems.map(_ => _.id).reverse() 
    const menuProps = collapsed ? {}: { openKeys: this.state.openKeys,}
    const lang = store.get('language')
    return (
      <Menu
        mode="inline"
        theme={theme}
        onOpenChange={this.onOpenChange}
        inlineCollapsed={collapsed}
        selectedKeys={selectedKeys}
        onClick={
          isMobile
            ? () => {
                onCollapseChange(true)
              }
            : undefined
        }
        {...menuProps}
      >
        {this.generateMenus(menus,lang)}
      </Menu>
    )
  }
}

SiderMenu.propTypes = {
  menus: PropTypes.array,
  theme: PropTypes.string,
  isMobile: PropTypes.bool,
  collapsed: PropTypes.bool,
  onCollapseChange: PropTypes.func,
}

export default SiderMenu
