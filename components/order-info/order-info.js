// components/order-info/order-info.js
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    data: {
      type: Object
    },
    // 是否显示申请售后按钮
    showAfterSaleButton: {
      type: Boolean,
      value: false
    },
    // 是否显示付款金额和数量
    showAmountAndNum: {
      type: Boolean,
      value: true
    }
  },
  methods: {
    onAfterSaleButtonTap() {
      // 申请售后
      this.triggerEvent('afterSale');
    }
  }
})
