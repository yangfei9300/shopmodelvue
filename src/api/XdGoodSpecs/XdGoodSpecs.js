import request from '@/utils/request'

// 查询规格管理列表
export function listXdGoodSpecs(query) {
  return request({
    url: '/XdGoodSpecs/XdGoodSpecs/list',
    method: 'get',
    params: query
  })
}

// 查询规格管理详细
export function getXdGoodSpecs(id) {
  return request({
    url: '/XdGoodSpecs/XdGoodSpecs/' + id,
    method: 'get'
  })
}

// 新增规格管理
export function addXdGoodSpecs(data) {
  return request({
    url: '/XdGoodSpecs/XdGoodSpecs',
    method: 'post',
    data: data
  })
}

// 修改规格管理
export function updateXdGoodSpecs(data) {
  return request({
    url: '/XdGoodSpecs/XdGoodSpecs',
    method: 'put',
    data: data
  })
}

// 删除规格管理
export function delXdGoodSpecs(id) {
  return request({
    url: '/XdGoodSpecs/XdGoodSpecs/' + id,
    method: 'delete'
  })
}
