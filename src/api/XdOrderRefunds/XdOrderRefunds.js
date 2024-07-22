import request from '@/utils/request'

// 查询订单退款列表
export function listXdOrderRefunds(query) {
  return request({
    url: '/XdOrderRefunds/XdOrderRefunds/list',
    method: 'get',
    params: query
  })
}

// 查询订单退款详细
export function getXdOrderRefunds(id) {
  return request({
    url: '/XdOrderRefunds/XdOrderRefunds/' + id,
    method: 'get'
  })
}

// 新增订单退款
export function addXdOrderRefunds(data) {
  return request({
    url: '/XdOrderRefunds/XdOrderRefunds',
    method: 'post',
    data: data
  })
}

// 修改订单退款
export function updateXdOrderRefunds(data) {
  return request({
    url: '/XdOrderRefunds/XdOrderRefunds',
    method: 'put',
    data: data
  })
}

// 删除订单退款
export function delXdOrderRefunds(id) {
  return request({
    url: '/XdOrderRefunds/XdOrderRefunds/' + id,
    method: 'delete'
  })
}
