import request from '@/utils/request'

// 查询优惠券列表
export function listXdCoupons(query) {
  return request({
    url: '/XdCoupons/XdCoupons/list',
    method: 'get',
    params: query
  })
}

// 查询优惠券详细
export function getXdCoupons(id) {
  return request({
    url: '/XdCoupons/XdCoupons/' + id,
    method: 'get'
  })
}

// 新增优惠券
export function addXdCoupons(data) {
  return request({
    url: '/XdCoupons/XdCoupons',
    method: 'post',
    data: data
  })
}

// 修改优惠券
export function updateXdCoupons(data) {
  return request({
    url: '/XdCoupons/XdCoupons',
    method: 'put',
    data: data
  })
}

// 删除优惠券
export function delXdCoupons(id) {
  return request({
    url: '/XdCoupons/XdCoupons/' + id,
    method: 'delete'
  })
}
