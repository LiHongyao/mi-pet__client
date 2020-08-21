import { couponList, orderPay } from '../../api/order'
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
      console.log(data)
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
    wx.navigateTo({
      url: '../use-coupon/use-coupon',
      success: res => {
        res.eventChannel.emit('acceptDataFromOpenerPage', this.data.coupons);
      },
      events: {
        selectedCoupon: ({ coupon: { condition, value, couponId } }) => {
          const totalSaleTPrice = this.data.order.totalSaleTPrice;
          let deduction = 0;
          this.couponId = couponId;
          if(condition) { // 满减券
            deduction = value;
          }else { // 折扣券
            deduction = (totalSaleTPrice - (totalSaleTPrice * value / 10)).toFixed(2);
          }
          this.setData({
            deduction,
            payAmount: (totalSaleTPrice - deduction).toFixed(2)
          });
        }
      }
    })
  },
  // 微信支付
  onPay() {
    const {payAmount, order: { orderId }} = this.data;
    orderPay({
      payAmount,
      orderId,
      couponId: this.couponId
    }).then(res => {
      wx.requestPayment({
        ...res.data,
        success: () => {
          wx.navigateTo({
            url: '../pay-res/pay-res?status=1'
          })
        },
        fail: () => {
          wx.navigateTo({
            url: '../pay-res/pay-res?status=0'
          })
        }
      })
    })
  }
})