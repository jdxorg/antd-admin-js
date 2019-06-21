import { Mock, Constant, qs } from './_utils'
const { ApiPrefix } = Constant

let rolesListData = Mock.mock({
  'data|80-100': [
    {
      id: '@id',
      roleName: '@name',
      roleType: '@last',
      roleDesc: '@csentence',
      state: 0,
      createTime: '@datetime',
      creator:'@name',
      updateTime:'@datetime',
      updator:'@name'
    },
  ],
})
let database = rolesListData.data

module.exports = {
  [`GET ${ApiPrefix}/account/roles`](req, res) {
    const { query } = req
    let { pageSize, page, ...other } = query
    pageSize = pageSize || 10
    page = page || 1
    res.status(200).json({
      data: database.slice((page - 1) * pageSize, page * pageSize),
      total: database.length,
    })
  },

}