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
 * 订单状态
 * 1：待付款
 * 2：待发货
 * 3：待收货
 * 4：已完成
 * 5：退款/售后
 */
export function orders(data) {
  return request({
    url: '/order/Index',
    method: 'POST',
    data
  })
}


/**
 * 取消订单
 * @param {*} data 
 */
export function cancelOrder(data) {
  return request({
    url: '/order/Cancel',
    method: 'POST',
    data
  })
}

/**
 * 确认收货
 * @param {*} id 
 */
export function confirmReceipt(id) {
  return request({
    url: '/order/Collect',
    method: 'POST',
    data: { id }
  })
}



/**
 * 退款
 * @param {*} id // 订单id 
 */
export function refund(id) {
  return request({
    url: '/order/refund',
    method: 'POST',
    data: { id }
  })
}
/**
 * 催单
 * @param {*} order_id 
 */
export function reminder(order_id) {
  return request({
    url: '/order/reminder',
    method: 'POST',
    data: { order_id }
  })
}

/**
 * 申请售后
 * @param {*} data 
 */
export function applyAfterSale(data) {
  return request({
    url: '/order/Create',
    method: 'POST',
    data
  })
}
/**
 * 撤销售后
 * data.id
 */
export function cancelAfterSale(data) {
  return request({
    url: '/order/order_after_cancel',
    method: 'POST',
    data
  })
}
/**
 * 评价
 * @param {*} data 
 */
export function evaluate(data) {
  return request({
    url: '/order/CommentsSave',
    method: 'POST',
    data
  })
}

/**
 * 使用优惠券结算
 * @param {*} data 
 * data.coupon_id
 * data.order_no
 */
export function useCoupon(data) {
  return request({
    url: '/order/coupon_use',
    method: 'POST',
    data
  })
}
