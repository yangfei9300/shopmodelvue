import request from '@/utils/request'

// 查询购物车列表
export function listXdCarts(query) {
  return request({
    url: '/XdCarts/XdCarts/list',
    method: 'get',
    params: query
  })
}

// 查询购物车详细
export function getXdCarts(id) {
  return request({
    url: '/XdCarts/XdCarts/' + id,
    method: 'get'
  })
}

// 新增购物车
export function addXdCarts(data) {
  return request({
    url: '/XdCarts/XdCarts',
    method: 'post',
    data: data
  })
}

// 修改购物车
export function updateXdCarts(data) {
  return request({
    url: '/XdCarts/XdCarts',
    method: 'put',
    data: data
  })
}

// 删除购物车
export function delXdCarts(id) {
  return request({
    url: '/XdCarts/XdCarts/' + id,
    method: 'delete'
  })
}
