
import { orders, cancelOrder, confirmReceipt, reminder, refund, evaluate, cancelAfterSale } from '../../api/order'
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
    wx.setNavigationBarTitle({
      title
    });
    this.setData({
      status,
      title
    });
    this.page = 1;
    this._getOrders();
  },
  // methods
  _getOrders() {
    orders({
      page: this.page,
      status: this.data.status
    }).then(res => {
      if (res.status === '200') {
        this.setData({
          orders: res.data.data
        });
      }
    }).catch(error => {
      console.log(error);
    })
  },
  // events
  onOrderItemTap({ detail: { id } }) {
    if (this.data.status === '1') {
      wx.navigateTo({
        url: `../pay-order/pay-order?orderId=${id}`,
      })
    } else {
      wx.navigateTo({
        url: `../order-details/order-details?title=${this.data.title}&orderId=${id}`,
      })
    }
  },
  // 取消订单
  onCancelOrder({ detail: { index, id } }) {
    cancelOrder({
      id
    }).then(res => {
      if (res.status === '200') {
        wx.showToast({
          title: res.message,
          icon: 'none',
          complete: () => {
            const orders = this.data.orders;
            orders.splice(index, 1);
            this.setData({
              orders
            });
          }
        })
      }
    }).catch(error => {
      console.log(error);
    })
  },
  // 立即付款
  onPayment({ detail: { id } }) {
    wx.navigateTo({
      url: `../pay-order/pay-order?orderId=${id}`,
    })
  },
  // 退款
  onRefund({ detail: { id } }) {
    wx.showModal({
      title: '提示',
      content: '是否确认退款？',
      success(res) {
        if (res.confirm) {
          refund(id).then(res => {
            if (res.status === '200') {
              wx.showToast({
                title: res.message,
                icon: 'none'
              })
            } else {
              wx.showToast({
                title: '系统繁忙，请稍后再试！',
                icon: 'none'
              })
            }
          }).catch(error => {
            wx.showToast({
              title: '系统繁忙，请稍后再试！',
              icon: 'none'
            })
            console.log(error);
          })
        }
      }
    })
  },
  // 催单
  onReminder({ detail: { id } }) {
    reminder(id).then(res => {
      if (res.status === '200') {
        wx.showToast({
          title: res.message,
          icon: 'none'
        })
      } else {
        wx.showToast({
          title: '系统繁忙，请稍后再试！',
          icon: 'none'
        })
      }
    }).catch(error => {
      console.log(error);
    })

  },
  // 确认收货
  onConfirmReceipt({ detail: { index, id } }) {
    confirmReceipt(id).then(res => {
      if (res.status === '200') {
        wx.showToast({
          title: res.message,
          icon: 'none',
          complete: () => {
            const orders = this.data.orders;
            orders.splice(index, 1);
            this.setData({
              orders
            });
          }
        })
      }
    }).catch(error => {
      console.log(error);
    })
  },
  // 立即评价
  onEvaluate({ detail: { orderId, goodsId } }) {
    this.orderId = orderId;
    this.goodsId = goodsId;
    this.setData({
      show: true
    })
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
        id: this.orderId,
        business_type: 'order',
        goods_id: this.goodsId,
        rating: evaluateRate,
        content: evaluateContent
      }).then(res => {
        if (res.status === '200') {
          toast({ title: res.message }).then(() => {
            this.setData({
              show: false
            })
          })
        } else {
          toast({ title: res.message }).then(() => {
            this.setData({
              show: false
            })
          })
        }
      }).catch(error => {
        console.log(error)
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
  onRevoke() {
    wx.showModal({
      title: '提示',
      content: '是否确认撤销？',
      success(res) {
        if (res.confirm) {
          cancelAfterSale({

          }).then(res => {
            if (res.status === '200') {
              wx.showToast({
                title: res.message,
                icon: 'none'
              })
            }
          }).catch(error => {
            console.log(error)
          })
        }
      }
    })
  }
})