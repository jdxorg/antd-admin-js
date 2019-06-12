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
    route:'/user',
    children:[
      {id:'21',parentid:'2',name:'user',zh: {name: '用户管理'},icon:'user',route:'/user/user'},
      {id:'22',parentid:'2',name:'role',zh: {name: '角色管理'},icon:'user',route:'/user/role'},
    ]
  },
  {
    id: '7',
    name: 'Posts',
    zh: {
      name: '岗位管理'
    },
    icon: 'shopping-cart',
    route: '/post',
  },
  {
    id: '3',
    name: 'Request',
    zh: {
      name: 'Request'
    },
    icon: 'api',
    route: '/request',
  },
  {
    id: '4',
    name: 'UI Element',
    zh: {
      name: 'UI组件'
    },
    icon: 'camera-o',
    route:'/UIElement',
    children:[
      { id: '41',parentid: '4',name: 'Button',zh: {name: 'Button'},icon: 'edit',route: '/UIElement/button',},
      { id: '42',parentid: '4',name: 'Form',zh: {name: 'Form'},icon: 'edit',route: '/UIElement/form',},
      { id: '43',parentid: '4',name: 'Table',zh: {name: 'Table'},icon: 'edit',route: '/UIElement/table',},
      { id: '44',parentid: '4',name: 'Editor',zh: {name: 'Editor'},icon: 'edit',route: '/UIElement/editor',},
    ]
  },
  {
    id: '5',
    name: 'Charts',
    zh: {
      name: 'Charts'
    },
    icon: 'code-o',
    route:'chart',
    children:[
      {id: '51', parentid: '5',name: 'ECharts',zh: { name: 'ECharts'}, icon: 'line-chart',route: '/chart/ECharts',},
      {id: '52', parentid: '5',name: 'HighCharts',zh: { name: 'HighCharts'}, icon: 'bar-chart',route: '/chart/highCharts',},
      {id: '53', parentid: '5',name: 'Rechartst',zh: { name: 'Rechartst'}, icon: 'area-chart',route: '/chart/Recharts',},
    ]
  },
]

module.exports = {
  [`GET ${ApiPrefix}/routes`](req, res) {
    res.status(200).json(database)
  },
}
