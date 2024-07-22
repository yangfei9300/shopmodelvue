import request from '@/utils/request'

// 查询商品列表
export function listXdProducts(query) {
  return request({
    url: '/XdProducts/XdProducts/list',
    method: 'get',
    params: query
  })
}

// 查询商品详细
export function getXdProducts(id) {
  return request({
    url: '/XdProducts/XdProducts/' + id,
    method: 'get'
  })
}

// 新增商品
export function addXdProducts(data) {
  return request({
    url: '/XdProducts/XdProducts',
    method: 'post',
    data: data
  })
}

// 修改商品
export function updateXdProducts(data) {
  return request({
    url: '/XdProducts/XdProducts',
    method: 'put',
    data: data
  })
}

// 删除商品
export function delXdProducts(id) {
  return request({
    url: '/XdProducts/XdProducts/' + id,
    method: 'delete'
  })
}
