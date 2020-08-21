import request from '../utils/request'

/**
 * 获取banner
 */
export function banners() {
  return request({
    url: '/banner/list'
  })
}