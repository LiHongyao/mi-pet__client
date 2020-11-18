Component({
  properties: {
    mode: { 
      type: String,
      value: 'default'
    },
    customClass: {
      type: String
    },
    backgroundColor: {
      type: String,
      value: '#FFFFFF'
    },
    active: {
      type: Number,
      default: 0,
      observers: function(value) {
        this.setData({
          currentIndex: value
        });
      }
    },
    menus: {
      type: Array,
      required: true
    }
  },
  lifetimes: {
    attached() {
      this._initData();
      this.setData({
        currentIndex: this.properties.active
      });
    }
  },
  data: {
    currentIndex: 0,
    locations: []
  },
  methods: {
    _initData() {
      const query = this.createSelectorQuery();
      const locations = [];
      let cursorHalf = 0;
      // 获取游标的尺寸信息
      query.select('.lg-menu-bar__cursor').boundingClientRect(res => {
        cursorHalf = res.width / 2;
      });
      // 获取菜单项的尺寸信息
      query.selectAll('.lg-menu-bar__item').boundingClientRect(rects => {
        rects.forEach(rect => {
          const { left, width } = rect;
          locations.push(left + width / 2 - cursorHalf);
        });
        this.setData({
          locations
        })
      });
      query.exec();
    },
    onItemTap(event) {
      const index = event.target.dataset.index;
      if(this.data.currentIndex === index) return;
      this.setData({
        currentIndex:index
      })
      this.triggerEvent('change', index);
    }
  }
})
