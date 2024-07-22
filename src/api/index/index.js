import request from '@/utils/request'

// 新增收货地址
export function getHomeSums(data) {
  return request({
    url: '/XdOrders/XdOrders/getHomeSums',
    method: 'post',
    data: data
  })
}
// 获取商品销售占比
export function getGoodSaleProportion(data) {
  return request({
    url: '/XdOrders/XdOrders/getGoodSaleProportion',
    method: 'post',
    data: data
  })
}
// 月销售
export function getMonthSales(data) {
  return request({
    url: '/XdOrders/XdOrders/getMonthSales',
    method: 'post',
    data: data
  })
}
export function getWeekSales(data) {
  return request({
    url: '/XdOrders/XdOrders/getWeekSales',
    method: 'post',
    data: data
  })
}



