import request from '../utils/request'
/**
 * 请求banner
 */
export function banner() {
  return request({
    url: '/Banner/Banner_index'
  })
}

/**
 * 商品模块分类
 */
export function category() {
  return request({
    url: '/Shop/shop_category'
  })
}