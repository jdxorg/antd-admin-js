module.exports = [
  {path:'/',component:'../pages/index'},
  { 
    path:'/login',
    component:'../pages/login/index',
    models:() => [import('../pages/login/model')],
    // LoadingComponent:require('D:/workspace/react/antd-admin-js/src/components/Loader/Loader').default
  },
  {
    path:'/dashboard',
    component:'../pages/dashboard/index',
    models:() => [import('../pages/dashboard/model')],
  },
]