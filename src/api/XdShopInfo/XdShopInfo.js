import request from '@/utils/request'

// 查询商城信息列表
export function listXdShopInfo(query) {
  return request({
    url: '/XdShopInfo/XdShopInfo/list',
    method: 'get',
    params: query
  })
}

// 查询商城信息详细
export function getXdShopInfo(id) {
  return request({
    url: '/XdShopInfo/XdShopInfo/' + id,
    method: 'get'
  })
}

// 新增商城信息
export function addXdShopInfo(data) {
  return request({
    url: '/XdShopInfo/XdShopInfo',
    method: 'post',
    data: data
  })
}

// 修改商城信息
export function updateXdShopInfo(data) {
  return request({
    url: '/XdShopInfo/XdShopInfo',
    method: 'put',
    data: data
  })
}

// 删除商城信息
export function delXdShopInfo(id) {
  return request({
    url: '/XdShopInfo/XdShopInfo/' + id,
    method: 'delete'
  })
}
