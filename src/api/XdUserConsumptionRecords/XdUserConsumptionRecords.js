import request from '@/utils/request'

// 查询用户余额消费记录列表
export function listXdUserConsumptionRecords(query) {
  return request({
    url: '/XdUserConsumptionRecords/XdUserConsumptionRecords/list',
    method: 'get',
    params: query
  })
}

// 查询用户余额消费记录详细
export function getXdUserConsumptionRecords(id) {
  return request({
    url: '/XdUserConsumptionRecords/XdUserConsumptionRecords/' + id,
    method: 'get'
  })
}

// 新增用户余额消费记录
export function addXdUserConsumptionRecords(data) {
  return request({
    url: '/XdUserConsumptionRecords/XdUserConsumptionRecords',
    method: 'post',
    data: data
  })
}

// 修改用户余额消费记录
export function updateXdUserConsumptionRecords(data) {
  return request({
    url: '/XdUserConsumptionRecords/XdUserConsumptionRecords',
    method: 'put',
    data: data
  })
}

// 删除用户余额消费记录
export function delXdUserConsumptionRecords(id) {
  return request({
    url: '/XdUserConsumptionRecords/XdUserConsumptionRecords/' + id,
    method: 'delete'
  })
}
