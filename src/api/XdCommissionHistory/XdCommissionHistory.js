import request from '@/utils/request'

// 查询佣金记录列表
export function listXdCommissionHistory(query) {
  return request({
    url: '/XdCommissionHistory/XdCommissionHistory/list',
    method: 'get',
    params: query
  })
}

// 查询佣金记录详细
export function getXdCommissionHistory(id) {
  return request({
    url: '/XdCommissionHistory/XdCommissionHistory/' + id,
    method: 'get'
  })
}

// 新增佣金记录
export function addXdCommissionHistory(data) {
  return request({
    url: '/XdCommissionHistory/XdCommissionHistory',
    method: 'post',
    data: data
  })
}

// 修改佣金记录
export function updateXdCommissionHistory(data) {
  return request({
    url: '/XdCommissionHistory/XdCommissionHistory',
    method: 'put',
    data: data
  })
}

// 删除佣金记录
export function delXdCommissionHistory(id) {
  return request({
    url: '/XdCommissionHistory/XdCommissionHistory/' + id,
    method: 'delete'
  })
}
