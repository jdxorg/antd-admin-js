/*
 * @Author: dexiaojiang 289608944@qq.com
 * @Description: In User Settings Edit
 * @Date: 2019-08-23 15:20:33
 * @LastEditTime: 2019-08-27 16:11:49
 * @LastEditors: dexiaojiang 289608944@qq.com
 */
import { config } from 'utils';

const { apiPrefix,ACCOUNT_API,UPLOAD_API } = config;

export default {
  //menus
  queryRouteList: `${ACCOUNT_API}/account/menus`,

  //user
  logoutUser: `POST ${ACCOUNT_API}/account/logout`,
  loginUser: `POST ${ACCOUNT_API}/account/login`,
  queryUserInfo: `${ACCOUNT_API}/account/userInfo`,
  queryUser: `${ACCOUNT_API}/account/user/:id`,
  queryUserPage: `${ACCOUNT_API}/account/user`,
  queryUserList: `${ACCOUNT_API}/account/users`,
  updateUser: `Put ${ACCOUNT_API}/account/user/:id`,
  createUser: `POST ${ACCOUNT_API}/account/user`,
  removeUser: `DELETE ${ACCOUNT_API}/account/user/:id`,
  removeUserList: `POST ${ACCOUNT_API}/account/user/deleteMany`,
  updatePermission: `Put ${ACCOUNT_API}/account/user/permission/:id`,

  //role
  queryRolePage:`${ACCOUNT_API}/account/role`,
  queryRoleRelations:`${ACCOUNT_API}/account/role/relations/:id`,
  queryRole:`${ACCOUNT_API}/account/role/:id`,
  saveUserRole:`POST ${ACCOUNT_API}/account/role/:id`,
  createRole: `POST ${ACCOUNT_API}/account/role`,
  updateRole: `Put ${ACCOUNT_API}/account/role/:id`,
  removeRole: `DELETE ${ACCOUNT_API}/account/role/:id`,
  removeRoleList:`POST ${ACCOUNT_API}/account/role/deleteMany`,

  queryPostList: '/posts',
  queryDashboard: `${apiPrefix}/dashboard`,

  queryMobileHome: `${ACCOUNT_API}/mobile/home`,
  removeBanner: `DELETE ${ACCOUNT_API}/mobile/banner/:id`,
  createBanner: `POST ${ACCOUNT_API}/mobile/banner`,
  updateBanner: `Put ${ACCOUNT_API}/mobile/banner/:id`,
  queryBanner: `${ACCOUNT_API}/mobile/banner/:id`,

  removeNavbar: `DELETE ${ACCOUNT_API}/mobile/navbar/:id`,
  createNavbar: `POST ${ACCOUNT_API}/mobile/navbar`,
  updateNavbar: `Put ${ACCOUNT_API}/mobile/navbar/:id`,
  queryNavbar: `${ACCOUNT_API}/mobile/navbar/:id`,

};

export const uplodaFile = `${UPLOAD_API}/upload/file`;