
Component({
  externalClasses: [
    'custom-class',
    'title-class',
    'value-class'
  ],
  options: {
    addGlobalClass: true,
    styleIsolation: 'apply-shared',
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  properties: {
    title: null,
    titleWidth: {
      type: String,
      value: '120rpx'
    },
    value: String,
   
    border: Boolean,
    isLink: Boolean,
    alignRight: Boolean
  },
  data: {

  },
  lifetimes: {
    attached() {
      this.setData({
        letters: this.properties.title.split('')
      })
    }
  },
  methods: {
    onTap() {
      this.triggerEvent('tap');
    }
  }
})
