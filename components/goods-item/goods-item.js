Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    data: {
      type: Object
    }
  },
  methods: {
    onTap() {
      this.triggerEvent('itemTap', {goodsId: this.properties.data.goodsId});
    }
  }
})
