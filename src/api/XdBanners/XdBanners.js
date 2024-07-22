import request from '@/utils/request'

// 查询轮播图列表
export function listXdBanners(query) {
  return request({
    url: '/XdBanners/XdBanners/list',
    method: 'get',
    params: query
  })
}

// 查询轮播图详细
export function getXdBanners(id) {
  return request({
    url: '/XdBanners/XdBanners/' + id,
    method: 'get'
  })
}

// 新增轮播图
export function addXdBanners(data) {
  return request({
    url: '/XdBanners/XdBanners',
    method: 'post',
    data: data
  })
}

// 修改轮播图
export function updateXdBanners(data) {
  return request({
    url: '/XdBanners/XdBanners',
    method: 'put',
    data: data
  })
}

// 删除轮播图
export function delXdBanners(id) {
  return request({
    url: '/XdBanners/XdBanners/' + id,
    method: 'delete'
  })
}
