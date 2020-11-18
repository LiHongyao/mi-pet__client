
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    // 图标路径
    iconPath: {
      type: String,
      value: './images/icon_check.png'
    },
    // 选中时的图标路径
    checkedIconPath: {
      type: String,
      value: './images/icon_checked.png'
    },
    // 数据
    data: {
      type: Array // => [{label: '', value: ''}]
    },
    // 默认选中的label/value值
    defaultSelected: {
      type: Number,
      optionalTypes: [String, Number],
      observer: function(value) {
        this.setData({
          selected: value
        })
      }
    },
    // 键
    key: {
      type: String
    }
  },
  data: {
    selected: ''
  },
  lifetimes: {
    attached() {
      if(this.properties.defaultSelected) {
        this.setData({
          selected: this.properties.defaultSelected
        })
      }
    }
  },
  methods: {
    onRadioItemTap(event) {
      const {label, value} = event.currentTarget.dataset;
      this.setData({
        selected:label
      });
      this.triggerEvent('change', {
        value: value !== undefined ? value : label,
        key: this.properties.key
      })
    }
  }
})
