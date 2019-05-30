import { Constant } from './_utils'
const { ApiPrefix } = Constant

const database = [
  { id: '1',
    icon: 'dashboard',
    name: 'Dashboard',
    zh: {
      name: '仪表盘'
    },
    route: '/dashboard',
  },
  {
    id: '2',
    name: 'Users',
    zh: {
      name: '用户管理'
    },
    icon: 'user',
    children:[
      {id:'21',parentid:'2',name:'user',icon:'user',route:'/user'}
    ]
  },
]

module.exports = {
  [`GET ${ApiPrefix}/routes`](req, res) {
    res.status(200).json(database)
  },
}
