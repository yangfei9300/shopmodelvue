import request from '@/utils/request'

// 查询微信用户列表
export function listXdUser(query) {
  return request({
    url: '/XdUser/XdUser/list',
    method: 'get',
    params: query
  })
}

// 查询微信用户详细
export function getXdUser(id) {
  return request({
    url: '/XdUser/XdUser/' + id,
    method: 'get'
  })
}

// 新增微信用户
export function addXdUser(data) {
  return request({
    url: '/XdUser/XdUser',
    method: 'post',
    data: data
  })
}

// 修改微信用户
export function updateXdUser(data) {
  return request({
    url: '/XdUser/XdUser',
    method: 'put',
    data: data
  })
}

// 删除微信用户
export function delXdUser(id) {
  return request({
    url: '/XdUser/XdUser/' + id,
    method: 'delete'
  })
}
