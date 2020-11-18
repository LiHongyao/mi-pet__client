import request from '../utils/request'
/**
 * 获取用户地址列表
 */
export function getAddress() {
  return request({
    url: '/address/list'
  })
}

/**
 * 新增或修改收货地址
 * @param {*} data 
 * data.addrId
 * data.name
 * data.phone
 * data.address
 * data.default
 */
export function updateAddress(data) {
  return request({
    url: '/address/update',
    method: 'POST',
    data
  }, '处理中，请稍后...')
}

/**
 * 删除地址
 * @param {*} addrId 
 */
export function deleteAddress(addrId) {
  return request({
    url: '/address/delete',
    method: 'POST',
    data: { addrId }
  }, '正在删除...')
}
