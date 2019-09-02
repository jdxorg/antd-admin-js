import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Menu, Icon } from 'antd'
import Navlink from 'umi/navlink'
import withRouter from 'umi/withRouter'
import { queryAncestors } from 'utils'
import store from 'store'

const { SubMenu } = Menu

@withRouter
class SiderMenu extends PureComponent {
  state = {
    openKeys: store.get('openKeys') || [],
  }

  onOpenChange = keys => {
    const { menus } = this.props
    const rootSubmenuKeys = menus.map(_ => _.id)
    const { openKeys } = this.state
    const latestOpenKey = keys.find(key => openKeys.indexOf(key) === -1)

    let newOpenKeys = keys
    if (rootSubmenuKeys.indexOf(latestOpenKey) !== -1) {
      newOpenKeys = latestOpenKey ? [latestOpenKey] : []
    }

    this.setState({
      openKeys: newOpenKeys,
    })
    store.set('openKeys', newOpenKeys)
  }

  generateMenus = (data, lang) => {
    const maps = data.filter(p => p.display)
    return maps.map(item => {
      if (item.children) {
        return (
          <SubMenu
            key={item.id}
            title={
              <Fragment>
                {item.icon && <Icon type={item.icon} />}
                {lang === 'zh' && <span>{item.zh.name}</span>}
                {lang === 'en' && <span>{item.name}</span>}
              </Fragment>
            }
          >
            {this.generateMenus(item.children, lang)}
          </SubMenu>
        )
      }
      return (
        <Menu.Item key={item.id}>
          <Navlink to={item.route || '#'}>
            {item.icon && <Icon type={item.icon} />}
            {lang === 'zh' && <span>{item.zh.name}</span>}
            {lang === 'en' && <span>{item.name}</span>}
          </Navlink>
        </Menu.Item>
      )
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
    const { openKeys } = this.state
    // Find a menu that matches the pathname.
    let selectedItems = queryAncestors(menus, location.pathname)
    // Find the key that should be selected according to the current menu.
    selectedItems = selectedItems
      ? selectedItems.filter(p => p)
      : menus
      ? menus[0]
      : null
    const selectedKeys = selectedItems
      ? selectedItems.map(_ => _.id).reverse()
      : []
    const menuProps = collapsed ? {} : { openKeys }
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
        {this.generateMenus(menus, lang)}
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
SiderMenu.defaultProps = {
  menus: [],
  theme: '',
  isMobile: false,
  collapsed: true,
  onCollapseChange: () => {},
}
export default SiderMenu
