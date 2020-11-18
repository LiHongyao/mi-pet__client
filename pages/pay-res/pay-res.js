
import { payStatus } from '../../api/order'
Page({
  data: {
    status: -1
  },
  onLoad(options) {
    this.eventChannel = this.getOpenerEventChannel();
    this.setData({ status: +options.status })
    this.orderId = options.orderId;
    
    this._payStatus();
  },
  // methods
  _payStatus() {
    payStatus({
      status: this.data.status,
      orderId: this.orderId
    }).then(() => {
      console.log('上传支付状态成功');
    })
  },
  // events
  onGoHome() {
    wx.switchTab({
      url: '../index/index'
    })
  },
  onGoOrderDetails() {
    wx.navigateTo({
      url: `../order-details/order-details?title=待发货&orderId=${this.orderId}`,
    })
  },
  onRePlay() {
    wx.navigateBack();
  }
})


