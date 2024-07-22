import request from '@/utils/request'

// 查询优惠券领取使用记录列表
export function listXdUseCoupons(query) {
  return request({
    url: '/XdUseCoupons/XdUseCoupons/list',
    method: 'get',
    params: query
  })
}

// 查询优惠券领取使用记录详细
export function getXdUseCoupons(id) {
  return request({
    url: '/XdUseCoupons/XdUseCoupons/' + id,
    method: 'get'
  })
}

// 新增优惠券领取使用记录
export function addXdUseCoupons(data) {
  return request({
    url: '/XdUseCoupons/XdUseCoupons',
    method: 'post',
    data: data
  })
}

// 修改优惠券领取使用记录
export function updateXdUseCoupons(data) {
  return request({
    url: '/XdUseCoupons/XdUseCoupons',
    method: 'put',
    data: data
  })
}

// 删除优惠券领取使用记录
export function delXdUseCoupons(id) {
  return request({
    url: '/XdUseCoupons/XdUseCoupons/' + id,
    method: 'delete'
  })
}
