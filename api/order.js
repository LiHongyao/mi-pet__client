import request from '../utils/request'

/**
 * 创建订单
 * @param {*} data 
 * data.addrId
 * data.goodsId
 * data.specId
 * data.num 
 * data.totalPrice
 */
export function createOrder(data) {
  return request({
    url: '/order/add',
    method: 'POST',
    data
  }, '订单生成中..');
}

/**
 * 获取订单可用优惠卷列表
 * @param {*} orderId 
 */
export function couponList(orderId) {
  return request({
    url: `/order/couponlist`,
    method: 'POST',
    data: { orderId }
  })
}

/**
 * 订单详情
 * @param {*} orderId 
 */
export function orderDetails(orderId) {
  return request({
    url: '/order/details',
    method: 'POST',
    data: {orderId}
  })
}

/**
 * 订单支付
 * @param {*} data 
 * data.orderId
 * data.couponId
 * data.payAmount
 */
export function orderPay(data) {
  return request({
    url: '/order/pay',
    method: 'POST',
    data
  }, '处理中，请稍后...')
}

/**
 * 订单列表
 * @param {*} data 
 * data.type
 * data.pageSize
 * data.page
 */
export function orders(data) {
  return request({
    url: '/order/list',
    method: 'POST',
    data
  })
}
/**
 * 取消订单
 * @param {*} orderId 
 */
export function deleteOrder(orderId) {
  return request({
    url: '/order/delete',
    method: 'POST',
    data: { orderId }
  }, '处理中，请稍后...')
}
/**
 * 退款
 * @param {*} data 
 * data.orderId
 * data.reason
 * data.images
 */
export function refund(data) {
  return request({
    url: '/order/refund',
    method: 'POST',
    data
  }, '处理中，请稍后...')
}

/**
 * 确认收货
 * @param {*} orderId 
 */
export function confirmReceipt(orderId) {
  return request({
    url: '/order/confirm',
    method: 'POST',
    data: { orderId }
  }, '处理中，请稍后...')
}

/**
 * 评价
 * @param {*} data 
 * data.orderId
 * data.content
 * data.star
 */
export function evaluate(data) {
  return request({
    url: '/order/comment',
    method: 'POST',
    data
  })
}

/**
 * 撤销售后
 * orderId
 */
export function cancelAfterSale(orderId) {
  return request({
    url: '/order/cancell',
    method: 'POST',
    data: { orderId }
  }, '撤销中...')
}


/**
 * 催单
 * @param {*} orderId 
 */
export function reminder(orderId) {
  return request({
    url: '/order/reminder',
    method: 'POST',
    data: { orderId }
  }, '处理中，请稍后...')
}

/**
 * 更新支付状态
 * @param {*} data 
 * data.status 支付状态  1 成功 0 失败
 * data.orderId
 */
export function payStatus(data) {
  return request({
    url: '/order/payStatus',
    method: 'POST',
    data
  })
}




