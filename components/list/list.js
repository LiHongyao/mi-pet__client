import { throttle } from '../../utils/common'

Component({
  properties: {
    height: {
      type: String,
      value: '100%'
    },
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
    onScrollToLower() {
      const { loading, finished } = this.properties;
      if (!finished && !loading) {
        this.triggerEvent('load')
      }
    }
  }
});


