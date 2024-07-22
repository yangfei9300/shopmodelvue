import request from '@/utils/request'

// 查询用户充值记录列表
export function listXdUserRechargeRecords(query) {
  return request({
    url: '/XdUserRechargeRecords/XdUserRechargeRecords/list',
    method: 'get',
    params: query
  })
}

// 查询用户充值记录详细
export function getXdUserRechargeRecords(id) {
  return request({
    url: '/XdUserRechargeRecords/XdUserRechargeRecords/' + id,
    method: 'get'
  })
}

// 新增用户充值记录
export function addXdUserRechargeRecords(data) {
  return request({
    url: '/XdUserRechargeRecords/XdUserRechargeRecords',
    method: 'post',
    data: data
  })
}

// 修改用户充值记录
export function updateXdUserRechargeRecords(data) {
  return request({
    url: '/XdUserRechargeRecords/XdUserRechargeRecords',
    method: 'put',
    data: data
  })
}

// 删除用户充值记录
export function delXdUserRechargeRecords(id) {
  return request({
    url: '/XdUserRechargeRecords/XdUserRechargeRecords/' + id,
    method: 'delete'
  })
}
