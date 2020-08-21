Component({
  options: {
    addGlobalClass: true,
    styleIsolation: 'shared'
  },
  properties: {
    // 订单数据
    data: {
      type: Object
    },
    // 订单所在列表中的下标位置
    index: {
      type: Number
    },
    // 订单状态 1~5
    status: {
      type: Number
    },
    // 标题
    title: {
      type: String
    },
  },
  lifetimes: {
    attached() {
      console.log(this.properties.data)
    }
  },
  methods: {
    onOrderItemTap() {
      // 点击
      this.triggerEvent('orderTap', { id: this.properties.data.id });
    },
    
    onCancelOrder() {
      // 取消订单
      const { index, data} = this.properties;
      this.triggerEvent('cancel', { index, id: data.id });
    },
    onPayment() {
      // 支付
      this.triggerEvent('payment', {id: this.properties.data.id});
    },
    onRefund() {
      // 退款
      this.triggerEvent('refund', {id: this.properties.data.id});
    },
    onReminder() {
      // 催单
      this.triggerEvent('reminder', {id: this.properties.data.id});
    },
    onConfirmReceipt() {
      // 确认收货
      const { index, data} = this.properties;
      this.triggerEvent('confirmReceipt', { index, id: data.id });
    },
    onEvaluate() {
      // 立即评价
      this.triggerEvent('evaluate', { 
        orderId: this.properties.data.id,
        goodsId: this.properties.data.items[0].goods_id
      });
    },
    onBuyAgain() {
      // 再买一单
      this.triggerEvent('buyAgain', { goodsId: this.properties.data.items[0].goods_id });
    },
    onRevoke() {
      // 撤销申请
      this.triggerEvent('revoke', { id: this.properties.data.id });
    }
  }
})
