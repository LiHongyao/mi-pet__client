import request from '../utils/request'

/**
 * 指南列表
 * @param {*} data 
 * data.type 1 猫猫；2 狗狗
 * data.pageSize
 * data.page
 */
export function guideList(data) {
  return request({
    url: '/guide/list',
    method: 'POST',
    data
  })
}

/**
 * 指南详情
 * @param {*} guideId 
 */
export function guideDetails(guideId) {
  return request({
    url: `/guide/${guideId}`
  })
}