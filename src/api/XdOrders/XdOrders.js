import request from '@/utils/request'

// 查询订单列表
export function listXdOrders(query) {
  return request({
    url: '/XdOrders/XdOrders/list',
    method: 'get',
    params: query
  })
}

// 查询订单详细
export function getXdOrders(id) {
  return request({
    url: '/XdOrders/XdOrders/' + id,
    method: 'get'
  })
}

// 新增订单
export function addXdOrders(data) {
  return request({
    url: '/XdOrders/XdOrders',
    method: 'post',
    data: data
  })
}
// 发货
export function sendGoods(data) {
  return request({
    url: '/XdOrders/XdOrders/sendGoods',
    method: 'post',
    data: data
  })
}

// 修改订单
export function updateXdOrders(data) {
  return request({
    url: '/XdOrders/XdOrders',
    method: 'put',
    data: data
  })
}

// 删除订单
export function delXdOrders(id) {
  return request({
    url: '/XdOrders/XdOrders/' + id,
    method: 'delete'
  })
}
