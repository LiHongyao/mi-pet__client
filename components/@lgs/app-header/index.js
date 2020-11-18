Component({
  options: {
    multipleSlots: true
  },
  properties: {
    // 是否显示左侧胶囊按钮
    showCapsule: {
      type: Boolean,
      value: false
    },
    // 胶囊按钮风格：white / black
    capsuleStyle: {
      type: String,
      value: 'white'
    },
    leftStyle: {
      type: String,
      value: 'default'
    },
    // 标题
    title: {
      type: String,
      value: '默认标题'
    },
    // 标题栏风格：default / custom
    titleViewStyle: {
      type: String,
      value: 'default'
    },
    // 前景色
    tintColor: {
      type: String,
      value: '#373737'
    },
    // 背景色
    backgroundColor: {
      type: String,
      value: '#eeeeee'
    },
    // 渐变导航
    gradientColor: {
      type: String,
      value: ''
    },
    // 显示主页按钮
    showHomeButton: {
      type: Boolean,
      value: true
    }
  },

  data: {
    height: 0, // 导航栏高度
    hasBack: false, // 是否展示返回按钮
    statusBarHeight: 0, // 状态栏高度
    titleBarHeight: 0, // 标题栏高度
    navigationBarWidth: 0, // 导航栏宽度
    navigationBarLeftGap: 0, // 导航栏左侧间距
    menuButtonHeight: 0, // 胶囊按钮高度
    opacity: 1, // 不透明度
    safeWidth: 0, // 安全区域宽度
    iconStyle: { // 图标风格
      border: '',
      backgroundColor: ''
    }
  },


  lifetimes: {
    attached() {
      console.log('__加载导航栏__');
      this._init();
    },
  },

  methods: {
    _init() {
      // 计算所需尺寸
      const { screenWidth, statusBarHeight } = wx.getSystemInfoSync();
      const { width, height, left, top, right } = wx.getMenuButtonBoundingClientRect();
      const titleBarHeight = height + (top - statusBarHeight) * 2;
      const appHeaderHeight = statusBarHeight + titleBarHeight;
      const safeWidth = left - (screenWidth - right);
      // 计算样式
      const capsuleBorder = this.properties.capsuleStyle === 'black' ? '1px solid rgba(0, 0, 0, .1)' : '1px solid rgba(255, 255, 255, .25)';
      const capsuleBackgroundColor = this.properties.capsuleStyle === 'black' ? 'rgba(255, 255, 255, .6)' : 'rgba(0, 0, 0, .15)';
      const opacity = this.properties.gradientColor ? 0 : 1;

      // 是否显示返回按钮
      const hasBack = getCurrentPages().length !== 1;

      // 更新数据
      this.setData({
        height: appHeaderHeight,
        titleBarHeight,
        navigationBarWidth: left,
        statusBarHeight,
        safeWidth,
        navigationBarLeftGap: screenWidth - right,
        menuButtonHeight: height,
        hasBack,
        opacity,
        ['iconStyle.border']: capsuleBorder,
        ['iconStyle.backgroundColor']: capsuleBackgroundColor,
      })
    },
    _goBack() {
      wx.navigateBack({
        delta: 1
      });
    },
    _goHome() {
      wx.switchTab({
        url: '/pages/index/index',
      })
    },
    setOpacity(scrollTop) {
      const maxTop = 200;
      let opacity = 0;
      if (scrollTop < maxTop) {
        opacity = scrollTop / maxTop;
      } else {
        opacity = 1;
      }
      this.setData({
        opacity
      })
    }
  }
})