// components/order-info/order-info.js
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    data: Object,
    // 是否显示申请售后按钮
    showAfterSaleButton:Boolean,
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
