import eventBus from '../../utils/eventBus'
import { guideDetails } from '../../api/guide'
import { favorSwitch } from '../../api/collection'

Page({
  data: {
    details: null
  },
  onLoad({ guideId }) {
    this._getData(guideId)
  },
  // methods
  _getData(guideId) {
    guideDetails(guideId).then(res => {
      this.setData({
        details: res.data
      })
    })
  },
  // events
  onFavorTap() {
    let { guideId, isFavor } = this.data.details;
    isFavor = isFavor ? 0 : 1;
    favorSwitch({
      type: 2,
      cid: guideId,
      collect: isFavor
    }).then(() => {
      this.setData({
        details: {
          ...this.data.details,
          isFavor
        },
      })
      eventBus.$emit('COLLECTION_CHANGE', { type: 2 });
      wx.showToast({
        title: isFavor ? '已收藏' : '已取消',
        icon: 'none',
        duration: 2000
      });
    })
  }
})
