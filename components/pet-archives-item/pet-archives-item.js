
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
    onItemTap() {
      this.triggerEvent('itemTap', this.properties.data.petId)
    }
  }
})
