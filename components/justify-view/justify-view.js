
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    required: {
      type: Boolean,
      value: false
    },
    text: {
      type: String
    }
  },
  data: {
    letters: []
  },
  lifetimes: {
    attached() {
      this.setData({
        letters: this.properties.text.split('')
      })
    }
  },
})
