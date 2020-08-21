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
      this.triggerEvent('itemTap', { guideId: this.properties.data.guideId } )
    }
  }
})
