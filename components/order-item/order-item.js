Component({
  options: {
    addGlobalClass: true,
    styleIsolation: 'shared'
  },
  properties: {
    // 订单数据
    data: Object,
    // 订单所在列表中的下标位置
    index: Number,
    // 标题
    title: String
  },
  lifetimes: {
    attached() {
      const {index, data: { orderId, goodsId }} = this.properties;
      this.index = index;
      this.orderId = orderId;
      this.goodsId = goodsId;
    }
  },
  methods: {
    onOrderItemTap() {
      // 点击
      this.triggerEvent('orderTap', { orderId: this.orderId });
    },
    
    onDeleteOrder() {
      // 删除订单
      this.triggerEvent('delete', { index: this.index, orderId: this.orderId });
    },

    onPayment() {
      // 支付
      this.triggerEvent('payment', {orderId: this.orderId});
    },
    onRefund() {
      // 退款
      const { thumbnail, title, payAmount,orderId } = this.data.data;
      this.triggerEvent('refund',  { data: { thumbnail, title, payAmount,orderId }} );
    },
    onReminder() {
      // 催单
      this.triggerEvent('reminder', {orderId: this.orderId});
    },
    onConfirmReceipt() {
      // 确认收货
      const { index, data: { orderId }} = this.properties;
      this.triggerEvent('confirmReceipt', { index, orderId });
    },
    onEvaluate() {
      // 立即评价
      this.triggerEvent('evaluate', { 
       orderId: this.orderId,
       goodsId: this.goodsId
      });
    },
    onBuyAgain() {
      // 再买一单
      this.triggerEvent('buyAgain', { goodsId: this.goodsId });
    },
    onRevoke() {
      // 撤销申请
      this.triggerEvent('revoke', { index: this.index, orderId: this.orderId });
    }
  }
})
