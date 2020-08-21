import request from '../utils/request'


/**
 * 查询我的优惠券
 */
export function coupons() {
  return request({
    url: '/coupon/list'
  })
}
