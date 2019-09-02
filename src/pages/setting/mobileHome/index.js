/*
 * @Author: dexiaojiang 289608944@qq.com
 * @Description: In User Settings Edit
 * @Date: 2019-08-26 16:35:45
 * @LastEditTime: 2019-08-27 17:09:20
 * @LastEditors: dexiaojiang 289608944@qq.com
 */

import React from 'react'
import { Page } from 'components'
import { Row, Col, Carousel } from 'antd'
import { connect } from 'dva'
import { withI18n } from '@lingui/react'

import styles from './index.less'
import mobilePng from '../../../../assets/images/mobile.png'
import searchBar from '../../../../assets/images/search-bar.png'
import { CTabs } from '../../../components/antd-design/index'
import CBanner from './components/banner'
import CNavbar from './components/navbar'

const MobileHome = props => {
  const {
    mobile: { banners = [], navbars = [], tabKey },
    dispatch,
  } = props

  const tabsProps = {
    tabs: [
      {
        key: 0,
        name: 'Banner',
        component: <CBanner {...{ list: banners, tabKey }} />,
      },
      {
        key: 1,
        name: 'Navbar',
        component: <CNavbar {...{ list: navbars, tabKey }} />,
      },
    ],
    onChange: key => {
      dispatch({
        type: 'mobile/updateState',
        payload: {
          tabKey: Number(key),
        },
      })
    },
  }
  return (
    <Page inner>
      <Row gutter={16}>
        <Col span={12}>
          <CTabs {...tabsProps} />
        </Col>
        <Col span={12}>
          <div className={styles.mobileContainer}>
            <img alt="mobile" src={mobilePng} className={styles.mobilePng} />
            <img alt="searchbar" src={searchBar} className={styles.searchBar} />
            <div className={styles.banner}>
              <Carousel autoplay>
                {banners.map(b => {
                  return (
                    <div key={b.id}>
                      <img src={b.image} alt={b.name} />
                    </div>
                  )
                })}
              </Carousel>
            </div>
            <div className={styles.navbar}>
              {navbars.map(nav => {
                return (
                  <div className={styles.navbarItem}>
                    <img src={nav.image} alt={nav.name} />
                    <span>{nav.name}</span>
                  </div>
                )
              })}
            </div>
          </div>
        </Col>
      </Row>
    </Page>
  )
}

export default connect(({ modal, loading, ...state }) => ({
  modal,
  loading,
  mobile: state.mobile,
}))(MobileHome)
