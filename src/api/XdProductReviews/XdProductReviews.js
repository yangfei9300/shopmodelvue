import request from '@/utils/request'

// 查询用户评价列表
export function listXdProductReviews(query) {
  return request({
    url: '/XdProductReviews/XdProductReviews/list',
    method: 'get',
    params: query
  })
}

// 查询用户评价详细
export function getXdProductReviews(id) {
  return request({
    url: '/XdProductReviews/XdProductReviews/' + id,
    method: 'get'
  })
}

// 新增用户评价
export function addXdProductReviews(data) {
  return request({
    url: '/XdProductReviews/XdProductReviews',
    method: 'post',
    data: data
  })
}

// 修改用户评价
export function updateXdProductReviews(data) {
  return request({
    url: '/XdProductReviews/XdProductReviews',
    method: 'put',
    data: data
  })
}

// 删除用户评价
export function delXdProductReviews(id) {
  return request({
    url: '/XdProductReviews/XdProductReviews/' + id,
    method: 'delete'
  })
}
