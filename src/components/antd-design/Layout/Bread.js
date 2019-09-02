import React, { PureComponent, Fragment } from 'react'
import PropTypes from 'prop-types'
import { Breadcrumb, Icon } from 'antd'
import Link from 'umi/navlink'
import withRouter from 'umi/withRouter'
import { withI18n } from '@lingui/react'
import { queryAncestors } from 'utils'
import store from 'store'
import styles from './Bread.less'

@withI18n()
@withRouter
class Bread extends PureComponent {
  generateBreadcrumbs = (paths, lang) => {
    return paths.map((item, key) => {
      const content = (
        <Fragment>
          {item.icon ? (
            <Icon type={item.icon} style={{ marginRight: 4 }} />
          ) : null}
          {lang === 'zh' && <span>{item.zh.name}</span>}
          {lang === 'en' && <span>{item.name}</span>}
        </Fragment>
      )

      return (
        <Breadcrumb.Item key={key.toString()}>
          {paths.length - 1 !== key ? (
            <Link to={item.parentid ? item.route || '#' : '#'}>{content}</Link>
          ) : (
            content
          )}
        </Breadcrumb.Item>
      )
    })
  }

  render() {
    const { routeList, location, i18n } = this.props
    // Find a route that matches the pathname.
    const selectedItems = queryAncestors(routeList, location.pathname)
    // Find the breadcrumb navigation of the current route match and all its ancestors.
    const paths = selectedItems || [
      routeList[0],
      {
        id: 404,
        name: i18n.t`Not.Found`,
      },
    ]
    const lang = store.get('language')
    return (
      <Breadcrumb className={styles.bread}>
        {this.generateBreadcrumbs(paths, lang)}
      </Breadcrumb>
    )
  }
}

Bread.propTypes = {
  routeList: PropTypes.array.isRequired,
}

export default Bread
