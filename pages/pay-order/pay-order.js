import {
  couponList,
  orderPay
} from '../../api/order'
import lgNumber from '../../utils/lg-number'
Page({
  data: {
    order: null,
    coupons: null,
    deduction: 0, // 抵扣金额
    payAmount: 0, // 实际支付金额
  },
  onLoad() {
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.on('acceptDataFromOpenerPage', data => {
      this.setData({
        order: data,
        payAmount: data.totalSaleTPrice
      })
      this._initData();
    });
  },
  // methods
  _initData() {
    this._getCoupons();
  },
  _getCoupons() {
    couponList(this.data.order.orderId).then(res => {
      this.setData({
        coupons: res.data
      })
    })
  },
  // events
  onChooseCoupon() {
    if (this.data.coupons.use.length === 0) {
      wx.showToast({
        title: '当前无可用优惠券',
        icon: 'none'
      })
      return;
    };
    wx.navigateTo({
      url: '../use-coupon/use-coupon',
      success: res => {
        res.eventChannel.emit('acceptDataFromOpenerPage', this.data.coupons);
      },
      events: {
        selectedCoupon: ({
          coupon: {
            condition,
            value,
            couponId
          }
        }) => {
          const totalSaleTPrice = this.data.order.totalSaleTPrice;
          let deduction = 0;
          this.couponId = couponId;
          if (condition) { // 满减券
            deduction = value;
          } else { // 折扣券
            const disPrice = lgNumber.multiply(totalSaleTPrice, value / 10);
            deduction = lgNumber.minus(totalSaleTPrice, disPrice);
          }
          this.setData({
            deduction,
            payAmount: deduction > totalSaleTPrice ? 0 : lgNumber.minus(totalSaleTPrice, deduction)
          });
        }
      }
    })
  },
  // 微信支付
  onPay() {
    const {
      payAmount,
      order: {
        orderId
      }
    } = this.data;
    orderPay({
      payAmount,
      orderId,
      couponId: this.couponId
    }).then(res => {
      if (res.status === 200 && res.data) {
        wx.requestPayment({
          ...res.data,
          success: () => {
            wx.navigateTo({
              url: `../pay-res/pay-res?status=1&orderId=${orderId}`
            })
          },
          fail: () => {
            wx.navigateTo({
              url: `../pay-res/pay-res?status=2&orderId=${orderId}`
            })
          }
        })
      } else if(res.status === 201) {
        wx.navigateTo({
          url: `../pay-res/pay-res?status=1&orderId=${orderId}`
        })
      } else {
        wx.showToast({
          title: '支付异常',
          icon: 'none'
        })
      }
    })
  }
})