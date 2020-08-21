import request from '../utils/request'

/**
 * 收藏
 * @param {*} data 
 * data.type 收藏类型1为商品2为指南
 * data.cid 商品id或指南id
 * data.collect 0为取消1为收藏
 */
export function favorSwitch(data) {
  return request({
    url: '/collect/switch',
    method: 'POST',
    data
  }, '处理中...')
}


/**
 * 收藏列表
 * @param {*} data 
 * data.type 收藏类型1为商品2为指南
 * data.pageSize
 * data.page
 */
export function collections(data) {
  return request({
    url: '/collect/own',
    method: 'POST',
    data
  })
}
