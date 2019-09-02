/* global document */
import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import withRouter from 'umi/withRouter'
import { connect } from 'dva'
import { MyLayout } from 'components'
import { BackTop, Layout, Drawer } from 'antd'
import { GlobalFooter } from 'ant-design-pro'
import { enquireScreen, unenquireScreen } from 'enquire-js'
import { config, queryAncestors } from 'utils'
import _ from 'lodash'
import Error from '../pages/404'
import styles from './PrimaryLayout.less'
import { Role } from '../constant'

const { isArray } = _
const { Content } = Layout
const { Header, Bread, Sider } = MyLayout

@withRouter
@connect(({ app, loading }) => ({ app, loading }))
class PrimaryLayout extends PureComponent {
  state = {
    isMobile: false,
  }

  componentDidMount() {
    this.enquireHandler = enquireScreen(mobile => {
      const { isMobile } = this.state
      if (isMobile !== mobile) {
        this.setState({
          isMobile: mobile,
        })
      }
    })
  }

  componentWillUnmount() {
    unenquireScreen(this.enquireHandler)
  }

  onCollapseChange = collapsed => {
    const { dispatch } = this.props
    dispatch({
      type: 'app/handleCollapseChange',
      payload: collapsed,
    })
  }

  render() {
    const { app, location, dispatch, children } = this.props
    const { user, theme, routeList, collapsed, notifications } = app
    const { isMobile } = this.state
    const { onCollapseChange } = this

    // Localized route name.

    const selectedItems = queryAncestors(routeList, location.pathname)
    // Find a route that matches the pathname.
    const currentRoute = selectedItems
      ? selectedItems[selectedItems.length - 1]
      : null
    // Query whether you have permission to enter this page
    let hasPermission = false
    const { roles, visit } = user
    if (
      (roles && ~roles.indexOf(Role.ADMIN)) ||
      (roles && ~roles.indexOf(Role.DEFAULT)) ||
      (roles && ~roles.indexOf(Role.DEVELOPER))
    ) {
      hasPermission = true
    } else if (visit && isArray(visit)) {
      hasPermission = currentRoute ? visit.includes(currentRoute.id) : false
    }
    const headerProps = {
      menus: routeList,
      collapsed,
      notifications,
      onCollapseChange,
      avatar: user.avatar,
      username: user.userName,
      fixed: config.fixedHeader,
      onAllNotificationsRead() {
        dispatch({ type: 'app/allNotificationsRead' })
      },
      onSignOut() {
        dispatch({ type: 'app/signOut' })
      },
    }

    const siderProps = {
      theme,
      menus: routeList,
      isMobile,
      collapsed,
      onCollapseChange,
      onThemeChange(myTheme) {
        dispatch({
          type: 'app/handleThemeChange',
          payload: myTheme,
        })
      },
    }

    return (
      <Fragment>
        <Layout>
          {isMobile ? (
            <Drawer
              maskClosable
              closable={false}
              onClose={onCollapseChange.bind(this, !collapsed)}
              visible={!collapsed}
              placement="left"
              width={200}
              style={{
                padding: 0,
                height: '100vh',
              }}
            >
              <Sider {...siderProps} collapsed={false} />
            </Drawer>
          ) : (
            <Sider {...siderProps} />
          )}
          <div
            className={styles.container}
            style={{ paddingTop: config.fixedHeader ? 72 : 0 }}
            id="primaryLayout"
          >
            <Header {...headerProps} />
            <Content className={styles.content}>
              <Bread routeList={routeList} />
              {hasPermission ? children : <Error />}
            </Content>
            <BackTop
              className={styles.backTop}
              target={() => document.querySelector('#primaryLayout')}
            />
            <GlobalFooter
              className={styles.footer}
              copyright={config.copyright}
            />
          </div>
        </Layout>
      </Fragment>
    )
  }
}

PrimaryLayout.propTypes = {
  children: PropTypes.element.isRequired,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  app: PropTypes.object,
  loading: PropTypes.object,
}
PrimaryLayout.defaultProps = {
  location: {},
  dispatch: () => {},
  app: {},
  loading: {},
}
export default PrimaryLayout
