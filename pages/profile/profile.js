
Page({
  data: {
    orders: [
      {text: '待付款', imgPath: './images/order_payment.png'},
      {text: '待发货', imgPath: './images/order_deliver_goods.png'},
      {text: '待收货', imgPath: './images/order_receiving_goods.png'},
      {text: '已完成', imgPath: './images/order_complete.png'},
      {text: '退款/售后', imgPath: './images/order_after_sale.png'}
    ],
    menus: [
      {text: '我的收藏'},
      {text: '收货地址'},
      {text: '用户协议'},
      {text: '联系客服'}
    ]
  }
})