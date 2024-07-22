import request from '@/utils/request'

// 查询积分记录列表
export function listXdIntegralRecord(query) {
  return request({
    url: '/XdIntegralRecord/XdIntegralRecord/list',
    method: 'get',
    params: query
  })
}

// 查询积分记录详细
export function getXdIntegralRecord(id) {
  return request({
    url: '/XdIntegralRecord/XdIntegralRecord/' + id,
    method: 'get'
  })
}

// 新增积分记录
export function addXdIntegralRecord(data) {
  return request({
    url: '/XdIntegralRecord/XdIntegralRecord',
    method: 'post',
    data: data
  })
}

// 修改积分记录
export function updateXdIntegralRecord(data) {
  return request({
    url: '/XdIntegralRecord/XdIntegralRecord',
    method: 'put',
    data: data
  })
}

// 删除积分记录
export function delXdIntegralRecord(id) {
  return request({
    url: '/XdIntegralRecord/XdIntegralRecord/' + id,
    method: 'delete'
  })
}
