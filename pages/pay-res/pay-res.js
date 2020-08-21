
Page({
  data: {
    status: -1
  },
  onLoad(options) {
    this.eventChannel = this.getOpenerEventChannel();
    this.setData({
      status: options.status
    })
  },
  onGoHome() {
    wx.switchTab({
      url: '../index/index'
    })
  },
  onGoOrderDetails() {
    wx.navigateTo({
      url: '../order-details/order-details',
    })
  },
  onRePlay() {
    wx.navigateBack();
  }
})