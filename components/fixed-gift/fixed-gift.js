Component({
  properties: {
   
  },
  options: {
    addGlobalClass: true,
  },
  data: {
    dialogShow: false
  },
  methods: {
    // events
    onTap() {
     
      this.setData({
        dialogShow: true
      })
    },
    onHideDialog() {
      this.setData({
        dialogShow: false
      })
    },
    onBuy() {
      wx.navigateTo({
        url: '../goods/goods?title=主粮&goodsType=1',
      });
      this.setData({
        dialogShow: false
      })
    }
  }
})
