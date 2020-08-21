Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    index: {
      type: Number,
      value: 0
    },
    editable: {
      type: Boolean,
      value: true
    },
    showDefaultTips: {
      type: Boolean,
      value: true
    },
    showLeftIcon: {
      type: Boolean,
      value: false
    },
    showRightIcon: {
      type: Boolean,
      value: false
    },
    data: {
      type: Object
    }
  },
  methods: {
    onEdit() {
      this.triggerEvent('edit', { data: this.properties.data})
    },
    onItemTap() {
      this.triggerEvent('itemTap', this.properties.data )
    }
  }
})
