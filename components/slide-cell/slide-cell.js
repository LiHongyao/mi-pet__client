Component({
  properties: {
    // 标识删除位置的下标
    index: {
      type: Number,
    },
    // 距离屏幕左右两侧的间距/默认0px
    spacing: {
      type: Number,
      value: 0
    },
    // 容器高度/默认100px
    height: {
      type: Number,
      value: 100
    },
    // 删除按钮宽度/默认79px
    rightWidth: {
      type: Number,
      value: 79
    }
  },
  data: {
    rW: 0, // 接收删除按钮宽度
    kH: 0, // 接收容器高度
    kSpacing: '' // 接收左右两侧的间距
  },
  lifetimes: {
    attached() {
      // 获取属性并设置data值
      const { rightWidth, height, spacing } = this.properties;
      this.rMiddleX = rightWidth / 2;
      this.setData({
        rW: rightWidth,
        kH: height,
        // 因为在wxml模板中通过calc计算的时候会被转换成px，
        // 所以这里我先直接计算左右两边间距所占的宽度
        // 便于在wxml中通过calc(100% - kSpacing)的形式来计算宽度
        kSpacing: spacing * 2 + 'px'
      });
    }
  },
  methods: {
    // 处理删除操作
    onDelete() {
      // 将index参数发送给delete事件监听者
      // 用于判断删除数据所对应的下标
      this.triggerEvent('delete', { index: this.properties.index })
    },
    onTouchStart(e) {
      this.startX = e.touches[0].pageX;
      this.startY = e.touches[0].pageY;
    },
    onTouchEnd(e) {
    
      const endX = e.changedTouches[0].pageX;
      const endY = e.changedTouches[0].pageY;
      const distanceX = endX - this.startX;
      const distanceY = endY - this.startY;
      if(Math.abs(distanceY) > Math.abs(distanceX)) return;
      if(distanceX < 0) {
        // 向左滑动
        this.setData({
          x: distanceX < this.rMiddleX * -1 ? -this.data.rightWidth : 0
        })
      }else {
        // 向右滑动
        this.setData({
          x: distanceX < this.rMiddleX ? -this.data.rightWidth : 0
        })
      }
    }
  }
});


