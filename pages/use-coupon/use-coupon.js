
Page({
  data: {
    coupons: null
  },
  onLoad() {
    this.eventChannel = this.getOpenerEventChannel();
    this.eventChannel.on('acceptDataFromOpenerPage', coupons => {
      this.setData({
        coupons
      })
    })
  },
  onCouponItemTap({ detail }) {
    wx.navigateBack();
    this.eventChannel.emit('selectedCoupon', { coupon: detail });
  }
})