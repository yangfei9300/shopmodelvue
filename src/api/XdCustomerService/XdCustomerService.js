import request from '@/utils/request'

// 查询客服信息列表
export function listXdCustomerService(query) {
  return request({
    url: '/XdCustomerService/XdCustomerService/list',
    method: 'get',
    params: query
  })
}

// 查询客服信息详细
export function getXdCustomerService(id) {
  return request({
    url: '/XdCustomerService/XdCustomerService/' + id,
    method: 'get'
  })
}

// 新增客服信息
export function addXdCustomerService(data) {
  return request({
    url: '/XdCustomerService/XdCustomerService',
    method: 'post',
    data: data
  })
}

// 修改客服信息
export function updateXdCustomerService(data) {
  return request({
    url: '/XdCustomerService/XdCustomerService',
    method: 'put',
    data: data
  })
}

// 删除客服信息
export function delXdCustomerService(id) {
  return request({
    url: '/XdCustomerService/XdCustomerService/' + id,
    method: 'delete'
  })
}
