import request from '@/utils/request'

// 查询订单商品详情列表
export function listXdOrdersInfo(query) {
  return request({
    url: '/XdOrdersInfo/XdOrdersInfo/list',
    method: 'get',
    params: query
  })
}

// 查询订单商品详情详细
export function getXdOrdersInfo(id) {
  return request({
    url: '/XdOrdersInfo/XdOrdersInfo/' + id,
    method: 'get'
  })
}

// 新增订单商品详情
export function addXdOrdersInfo(data) {
  return request({
    url: '/XdOrdersInfo/XdOrdersInfo',
    method: 'post',
    data: data
  })
}

// 修改订单商品详情
export function updateXdOrdersInfo(data) {
  return request({
    url: '/XdOrdersInfo/XdOrdersInfo',
    method: 'put',
    data: data
  })
}

// 删除订单商品详情
export function delXdOrdersInfo(id) {
  return request({
    url: '/XdOrdersInfo/XdOrdersInfo/' + id,
    method: 'delete'
  })
}
