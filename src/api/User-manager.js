import request from '@/utils/request'
//  获取用户管理列表
const getUserList = (data) => {
  return request({
    url: '/user/list',
    method: 'get',
    data
  })
}
// 删除用户接口
const deleteUser = (data) => {
  return request({
    url: '/user/delete',
    method: 'post',
    data
  })
}
//  新增用户接口
const addUser = (data) => {
  return request({
    url: '/user/add',
    method: 'post',
    data
  })
}

//  更新用户接口

const updateUser = (data) => {
  return request({
    url: '/user/update',
    method: 'put',
    data
  })
}

//  查询单个用户信息接口
const findUser = (id) => {
  return request({
    url: `user/userInfo/${id}`,
    method: 'get'
  })
}

export default {
  getUserList,
  deleteUser,
  addUser,
  updateUser,
  findUser
}
