
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    data: {
      type: Object
    }
  },
  lifetimes: {
    attached() {
      // console.log(this.properties.data) 
    }
  },
})
