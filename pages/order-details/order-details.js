import {
  orderDetails,
  orderPay,
  couponList
} from '../../api/order'
import lgNumber from '../../utils/lg-number'
Page({
  data: {
    title: '',
    order: null,
    goods: null,
    time: 0,
    coupons: null,
    deduction: 0,
    payAmount: 0,
    steps: []
  },
  onLoad({
    orderId,
    title
  }) {
    this.orderId = orderId;
    this.setData({
      title: title
    });
    this._getData();
    (title === '待付款') && this._getCoupons();
  },
  // methods
  _getData() {
    orderDetails(this.orderId).then(res => {
      const {
        orderNo,
        thumbnail,
        num,
        goodsTitle,
        goodsItemTitle,
        salePrice,
        couponMoney,
        logistics,
        couponId
      } = res.data;
      // 计算总价
      this.totalSalePrice = lgNumber.multiply(salePrice, num);
      this.couponId = couponId;
      // 处理物流数据
      let steps = [];
      logistics && logistics.list.forEach(item => {
        steps.push({
          text: item.status,
          desc: item.time
        });
      })
      // 处理数据
      this.setData({
        order: res.data,
        steps,
        goods: {
          orderNo, 
          thumbnail,
          num,
          goodsTitle,
          goodsItemTitle,
          salePrice
        },
        deduction: couponMoney,
        payAmount: couponMoney > this.totalSalePrice ? 0 : lgNumber.minus(this.totalSalePrice, couponMoney)
      });
    })
  },
  _getCoupons() {
    couponList(this.orderId).then(res => {
      this.setData({
        coupons: res.data
      })
    })
  },
  // events
  onPay() {
    const {
      orderId,
      couponId,
      data: {
        payAmount
      }
    } = this;
    orderPay({
      payAmount,
      orderId,
      couponId: couponId === 0 ? undefined : couponId
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
      } else if (res.status === 201) {
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
  },
  onCopy() {
    wx.setClipboardData({
      data: this.data.order.logistics.expNumber || '',
      success: () => {
        wx.showToast({
          title: '复制成功',
          icon: 'none'
        })
      }
    })
  },
  // 申请售后
  onAfterSale() {
    const {
      orderId,
      thumbnail,
      goodsTitle,
      goodsItemTitle
    } = this.data.order;
    wx.navigateTo({
      url: '../after-sale/after-sale',
      success: (res) => {
        res.eventChannel.emit('acceptDataFromOpenerPage', {
          orderId,
          title: goodsTitle + goodsItemTitle,
          thumbnail,
          payAmount: this.data.payAmount
        })
      }
    })
  },
  // 选择优惠券
  onChooseCoupon() {
    if (this.data.title !== '待付款') return;
    if (this.data.coupons.use.length === 0) {
      wx.showToast({
        title: '当前无可用优惠券',
        icon: 'none'
      })
      return;
    };
    let _this = this;
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
          let deduction = 0;
          _this.couponId = couponId;
          if (condition) { // 满减券
            deduction = value;
          } else { // 折扣券
            const disPrice = lgNumber.multiply(_this.totalSalePrice, value / 10);
            deduction = lgNumber.minus(_this.totalSalePrice, disPrice);
          }
          this.setData({
            deduction,
            payAmount: deduction > _this.totalSalePrice ? 0 : lgNumber.minus(_this.totalSalePrice, deduction)
          });
        }
      }
    })
  },
})