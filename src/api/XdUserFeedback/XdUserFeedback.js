import request from '@/utils/request'

// 查询意见反馈列表
export function listXdUserFeedback(query) {
  return request({
    url: '/XdUserFeedback/XdUserFeedback/list',
    method: 'get',
    params: query
  })
}

// 查询意见反馈详细
export function getXdUserFeedback(id) {
  return request({
    url: '/XdUserFeedback/XdUserFeedback/' + id,
    method: 'get'
  })
}

// 新增意见反馈
export function addXdUserFeedback(data) {
  return request({
    url: '/XdUserFeedback/XdUserFeedback',
    method: 'post',
    data: data
  })
}

// 修改意见反馈
export function updateXdUserFeedback(data) {
  return request({
    url: '/XdUserFeedback/XdUserFeedback',
    method: 'put',
    data: data
  })
}

// 删除意见反馈
export function delXdUserFeedback(id) {
  return request({
    url: '/XdUserFeedback/XdUserFeedback/' + id,
    method: 'delete'
  })
}
