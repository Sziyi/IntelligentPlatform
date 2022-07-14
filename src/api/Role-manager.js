import request from '@/utils/request'
// 获取角色列表
const getRoleList = (data) => {
  return request({
    url: '/role/list',
    method: 'GET',
    data
  })
}
//   更新角色列表
const updateRole = (id, data) => {
  return request({
    url: `/user/assign/${id}`,
    method: 'POST',
    data
  })
}

const addRole = (data) => {
  return request({
    url: '/role/add',
    method: 'POST',
    data
  })
}
export default {
  getRoleList,
  updateRole,
  addRole
}
