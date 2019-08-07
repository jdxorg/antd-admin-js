## `antd-admin-js`
> 后台管理系统模板脚手架 api端koa支撑

### Setup
```bash
  # clone the repository
  λ git clone https://github.com/jdxorg/antd-admin-js.git
  # change the current directory
  λ cd antd-admin-js
  # install all dependencies
  λ yarn run dev 不适用本地mock接口
  # run the project
  λ yarn run dev:proxy 运行代理部分接口使用本地mock
  # run the project watch
  λ yarn watch
```  
### git分支说明
```
  master 分支接口全部使用mock数据，无需连接远程服务器
  proxy  分支增加账户模块使用远程服务器接口，其余部分使用mock接口演示 服务端项目(https://github.com/jdxorg/koa2-ts-server)
  
```
### Setting
```
  utils/sys/config  api 配置 
  localhost service 接口地址，部分接口使用本地mock数据
  const MOCK_API = 'http://localhost:7000';
  account service 接口地址
  const ACCOUNT_API = 'http://127.0.0.1:4000';
  upload service 接口地址
  const UPLOAD_API = 'http://127.0.0.1:4000';
```
