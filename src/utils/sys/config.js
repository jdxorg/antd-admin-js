const MOCK_API = 'http://localhost:7000'
const ACCOUNT_API = 'http://127.0.0.1:4000'
const UPLOAD_API = 'http://127.0.0.1:4000'
const getHost = host => {
  return process.env.PROXY === 'true' ? `${MOCK_API}/api/v1` : host
}
const apiPrefix = getHost(ACCOUNT_API)

module.exports = {
  ACCOUNT_API,
  UPLOAD_API,
  apiPrefix,
  siteName: 'AntD Admin',
  copyright: 'Ant Design Admin  © 2018',
  logoPath: '/logo.svg',
  fixedHeader: true, // sticky primary layout header

  /* Layout configuration, specify which layout to use for route. */
  layouts: [
    {
      name: 'primary',
      include: [/.*/],
      exclude: [/(\/(en|zh))*\/login/],
    },
  ],

  /* I18n configuration, `languages` and `defaultLanguage` are required currently. */
  i18n: {
    /* Countrys flags: https://www.flaticon.com/packs/countrys-flags */
    languages: [
      {
        key: 'en',
        title: 'English',
        flag: '/america.svg',
      },
      {
        key: 'zh',
        title: '中文',
        flag: '/china.svg',
      },
    ],
    defaultLanguage: 'zh',
  },
}
