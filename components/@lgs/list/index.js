
Component({
  properties: {
    data: Object,
    tips: {
      type: String,
      value: '没有更多啦~'
    },
    height: {
      type: String,
      value: '100%'
    },
    // 当前是否正处于加载中
    loading: {
      type: Boolean,
      value: false
    },
    finished: {
      type: Boolean,
      value: false
    },
    loadingText: {
      type: String,
      value: '拼命加载中...'
    },
    finishedText: {
      type: String,
      value: '没有更多了'
    }
  },

  methods: {
    onLoadMore() {
      const { loading, finished } = this.properties;
      if (!finished && !loading) {
        this.triggerEvent('load')
      }
    }
  }
});


