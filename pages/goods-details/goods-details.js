import eventBus from '../../utils/eventBus'
import { goodsDetails } from '../../api/goods'
import { favorSwitch } from '../../api/collection'
import { editPhone } from '../../api/user'
const appInst = getApp();

Page({
  data: {
    goods: null,
    isBindPhone: -1,
    userInfo: null,
  },
  onLoad({ goodsId }) {
    this.goodsId = goodsId;
    this.setData({
      isBindPhone: appInst.globalData.isBindPhone
    })
    this._getGoodsDetails();
  },
  // methods
  _getGoodsDetails() {
    goodsDetails(this.goodsId).then(res => {
      console.log(res.data);
      this.setData({
        goods: res.data
      })
    })
  },
  // events
  onQueryComments() {
    wx.navigateTo({
      url: `../comment/comment?goodsId=${this.goodsId}`
    });
  },
  onGoFillOrder() {
    let _this = this;
    wx.navigateTo({
      url: `../fill-order/fill-order`,
      success(res) {
        // 通过eventChannel向被打开页面传送数据
        res.eventChannel.emit('acceptDataFromOpenerPage', _this.data.goods)
      }
    });
  },
  onFavorTap() {
    let { goodsId, isFavor } = this.data.goods;
    isFavor = isFavor ? 0 : 1;
    favorSwitch({
      type: 1,
      cid: goodsId,
      collect: isFavor
    }).then(() => {
      this.setData({
        goods: {
          ...this.data.goods,
          isFavor
        },
      })
      eventBus.$emit('COLLECTION_CHANGE', { type: 1 });
      wx.showToast({
        title: isFavor ? '已收藏' : '已取消',
        icon: 'none',
        duration: 2000
      });
    })
  },
  // 绑定手机号
  onGetPhoneNumber({ detail, detail: { encryptedData, iv, errMsg } }) {
    if (/ok/.test(errMsg)) {
      editPhone({
        iv: encodeURIComponent(iv),
        encryptedData: encodeURIComponent(encryptedData),
      }).then(() => {
        eventBus.$emit('PHONE_CHANGE');
        this.onGoFillOrder();
      })
    } else {
      console.log('获取失败');
    }
  }
})