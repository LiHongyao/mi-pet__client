
import { orders, deleteOrder, confirmReceipt, reminder, evaluate, cancelAfterSale } from '../../api/order'
import { toast } from '../../utils/common'

Page({
  data: {
    title: '',
    status: 0,
    orders: null,
    show: false,
    evaluateRate: 0,
    evaluateContent: ''
  },
  onLoad(options) {
    const { status, title } = options;
    // 设置标题
    wx.setNavigationBarTitle({title});
    this.setData({title});
    this.page = 1;
    this.type = status;
    this._getOrders();
  },
  // methods
  _getOrders() {
    orders({
      page: this.page,
      pageSize: 10,
      type: this.type,
    }).then(res => {
      console.log(res.data);
      const orders = this.data.orders;
      const {data, pages: { pageNo, total }} = res.data;
      this.setData({
        finished: pageNo >= total,
        orders: orders ? [...orders, ...data] : data
      })
    })
  },
  // events
  onLoadMore() {
    this.page += 1;
    this._getOrders();
  },
  onOrderItemTap({ detail: { orderId } }) {
    wx.navigateTo({
      url: `../order-details/order-details?title=${this.data.title}&orderId=${orderId}`,
    });
  },
  // 取消订单
  onDeleteOrder({ detail: { index, orderId } }) {
    let _this = this;
    wx.showModal({
      title: '提示',
      content: '您确定要删除订单么？',
      success (res) {
        if (res.confirm) {
          deleteOrder(orderId).then(() => {
            wx.showToast({
              title: "订单已删除",
              icon: 'none',
              complete: () => {
                const orders = _this.data.orders;
                orders.splice(index, 1);
                _this.setData({orders});
              }
            })
          })
        }
      }
    })  
  },
 
  // 退款
  onRefund({ detail: { data } }) {
    wx.navigateTo({
      url: `../after-sale/after-sale`,
      success: res => {
        res.eventChannel.emit('acceptDataFromOpenerPage', data )
      }
    })
  },
  // 催单
  onReminder({ detail: { orderId } }) {
    reminder(orderId).then(res => {
      wx.showToast({
        title: res.msg,
        icon: 'none'
      })
    })
  },
  // 确认收货
  onConfirmReceipt({ detail: { index, orderId } }) {
    confirmReceipt(orderId).then(res => {
      wx.showToast({
        title: res.msg,
        icon: 'none',
        complete: () => {
          const orders = this.data.orders;
          orders.splice(index, 1);
          this.setData({orders});
        }
      })
    })
  },
  // 立即评价
  onEvaluate({ detail: { orderId, goodsId } }) {
    this.orderId = orderId;
    this.goodsId = goodsId;
    this.setData({ show: true })
  },
  onSubmitEvaluate() {
    const { evaluateRate, evaluateContent } = this.data;
    if (!evaluateRate) {
      wx.showToast({
        title: '请选择评价星级',
        icon: 'none'
      })
    } else if (!evaluateContent) {
      wx.showToast({
        title: '请输入评价内容',
        icon: 'none'
      })
    } else {
      console.log('tag', this.evaluateContent, this.evaluateRate)
      evaluate({
        orderId: this.orderId,
        star: evaluateRate,
        content: evaluateContent
      }).then(res => {
        toast({ title: res.msg }).then(() => {
          this.setData({show: false})
        })
      })
    }
  },
  onCancelEvaluate() {
    this.setData({
      show: false,
      evaluateRate: 0,
      evaluateContent: ''
    })
  },
  onEvaluateContentInput({ detail: { value } }) {
    this.setData({
      evaluateContent: value
    });
  },
  onEvaluateValueChange({ detail }) {
    this.setData({
      evaluateRate: detail
    });
  },
  // 再买一单
  onBuyAgain({ detail: { goodsId } }) {
    wx.navigateTo({
      url: `../goods-details/goods-details?goodsId=${goodsId}`
    })
  },
  // 撤销申请
  onRevoke({ detail: { index, orderId }}) {
    wx.showModal({
      title: '提示',
      content: '是否确认撤销？',
      success: (res) => {
        if (res.confirm) {
          cancelAfterSale(orderId).then(res => {
            wx.showToast({
              title: res.msg,
              icon: 'none',
              complete: () => {
                const orders = this.data.orders;
                orders.splice(index, 1);
                this.setData({orders});
              }
            });
          })
        }
      }
    })
  }
})