import React, { Component } from 'react'
import withRouter from 'umi/withRouter'
import { LocaleProvider } from 'antd'
import { I18nProvider } from '@lingui/react'
import { lang } from 'utils/local'
import zh_CN from 'antd/lib/locale-provider/zh_CN'
import en_US from 'antd/lib/locale-provider/en_US'

import BaseLayout from './BaseLayout'

const languages = {
  zh: zh_CN,
  en: en_US,
}

@withRouter
class Layout extends Component {
  state = {
    catalogs: {},
  }

  componentWillMount(){
    // console.log('componentWillMount')
  }

  componentDidMount() {
    const language = lang()
    // console.log('componentDidMount', this.props.location.pathname)
    this.language = language
    this.loadCatalog(language)
  }
  ///组件接受新的state或者props时调用
  shouldComponentUpdate(nextProps, nextState) {
    const language = lang()
    const preLanguage = this.language
    const { catalogs } = nextState
    // console.log('shouldComponentUpdate->nextProps', nextProps)
    if (preLanguage !== language && !catalogs[language]) {
      this.loadCatalog(language)
      this.language = language
      return false
    }
    this.language = language

    return true
  }
  ///组件初始化时不调用，组件接受新的props时调用。
  componentWillReceiveProps(nextProps){
    // console.log('componentWillReceiveProps',nextProps)
  }
  ///组件初始化时不调用，只有在组件将要更新时才调用，此时可以修改state
  componentWillUpdate(nextProps,nextState){
    // console.log('componentWillUpdate',nextProps)
  }
  ///组件初始化时不调用，组件更新完成后调用，此时可以获取dom节点。
  componentDidUpdate(){
    // console.log('componentDidUpdate')
  }
  ///组件将要卸载时调用，一些事件监听和定时器需要在此时清除。
  componentWillUnmount(){
    // console.log('componentWillUnmount')
  }
  loadCatalog = async language => {
    const catalog = await import(
      /* webpackMode: "lazy", webpackChunkName: "i18n-[index]" */
      `@lingui/loader!../locales/${language}/messages.json`
    )

    this.setState(state => ({
      catalogs: {
        ...state.catalogs,
        [language]: catalog,
      },
    }))
  }

  render() {
    const { location, children } = this.props
    const { catalogs } = this.state

    let language = lang()
    // If the language pack is not loaded or is loading, use the default language
    // if (!catalogs[language]) language = lang()
    return (
      <LocaleProvider locale={languages[language]}>
        <I18nProvider language={language} catalogs={catalogs}>
          <BaseLayout>{children}</BaseLayout>
        </I18nProvider>
      </LocaleProvider>
    )
  }
}

export default Layout
