import request from '@/utils/request'

// 查询商品分类列表
export function listXdCategories(query) {
  return request({
    url: '/XdCategories/XdCategories/list',
    method: 'get',
    params: query
  })
}

// 查询商品分类详细
export function getXdCategories(id) {
  return request({
    url: '/XdCategories/XdCategories/' + id,
    method: 'get'
  })
}

// 新增商品分类
export function addXdCategories(data) {
  return request({
    url: '/XdCategories/XdCategories',
    method: 'post',
    data: data
  })
}

// 修改商品分类
export function updateXdCategories(data) {
  return request({
    url: '/XdCategories/XdCategories',
    method: 'put',
    data: data
  })
}

// 删除商品分类
export function delXdCategories(id) {
  return request({
    url: '/XdCategories/XdCategories/' + id,
    method: 'delete'
  })
}
