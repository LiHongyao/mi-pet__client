
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    type: {
      type: Number,
      value: 1 // 1可用；2已使用；3已过期,
    },
    data: {
      type: Object
    }
  },
  methods: {
    onCouponItemTap() {
      this.triggerEvent('itemTap', this.properties.data);
    }
  }
})
