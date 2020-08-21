import { orderDetails } from '../../api/order'
Page({
  data: {
    title: '待付款',
    order: null,
    time: 180000,
    steps: [
      {
        text: '运输中',
        desc: '即将抵达战场'
      },
      {
        text: '快件离开上海已发往成都华阳'
      },
      {
        text: '已揽收',
        desc: '上海的李鸿耀【17398888669】已揽收'
      },
      {
        text: '已发货',
        desc: '包裹正在等待揽收'
      },
    ]
  },
  onLoad(options) {
    this.orderId = options.orderId;
    this.setData({
      title: options.title
    });
    this._getData();
  },
  // methods
  _getData() {
    orderDetails({
      id: this.orderId
    }).then(res => {
      if (res.status === '200') {
        this.setData({
          order: res.data.data
        })
      }
    }).catch(error => {
      console.log(error);
    })
  },
  // events
  onCopy() {
    wx.setClipboardData({
      data: this.data.order.express_no || '',
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
    wx.navigateTo({
      url: '../after-sale/after-sale',
      success: (res) => {
        res.eventChannel.emit('acceptDataFromOpenerPage', this.data.order)
      }
    })
  }
})