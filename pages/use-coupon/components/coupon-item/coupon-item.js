
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    data: {
      type: Object
    },
    disabled: {
      type: Boolean,
      value: false
    }
  },
  methods: {
    onCouponItemTap() {
      this.triggerEvent('itemTap', this.properties.data);
    }
  }
})
