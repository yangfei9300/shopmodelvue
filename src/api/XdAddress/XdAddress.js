import request from '@/utils/request'

// 查询收货地址列表
export function listXdAddress(query) {
  return request({
    url: '/XdAddress/XdAddress/list',
    method: 'get',
    params: query
  })
}

// 查询收货地址详细
export function getXdAddress(id) {
  return request({
    url: '/XdAddress/XdAddress/' + id,
    method: 'get'
  })
}

// 新增收货地址
export function addXdAddress(data) {
  return request({
    url: '/XdAddress/XdAddress',
    method: 'post',
    data: data
  })
}

// 修改收货地址
export function updateXdAddress(data) {
  return request({
    url: '/XdAddress/XdAddress',
    method: 'put',
    data: data
  })
}

// 删除收货地址
export function delXdAddress(id) {
  return request({
    url: '/XdAddress/XdAddress/' + id,
    method: 'delete'
  })
}
