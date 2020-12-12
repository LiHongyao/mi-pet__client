import eventBus from '../../utils/eventBus'
import { goodsDetails } from '../../api/goods'
import { favorSwitch } from '../../api/collection'
import { editPhone } from '../../api/user'
import { checkAuth } from '../../utils/common'

const appInst = getApp();

Page({
  data: {
    isAuth: false,
    goods: null,
    isBindPhone: -1,
    userInfo: null,
    imageHeight:  wx.getSystemInfoSync().windowWidth
  },

  onLoad({ goodsId }) {

    this.goodsId = goodsId;

    this.setData({
      isAuth: appInst.globalData.isAuth,
      isBindPhone: appInst.globalData.isBindPhone
    });

    this._getGoodsDetails();

    // 监听用户登录
    eventBus.$on('LOGGED', () => {
      this.setData({
        isAuth: appInst.globalData.isAuth
      });
    })
  },
  // methods
  _getGoodsDetails() {
    goodsDetails(this.goodsId).then(res => {
      wx.setNavigationBarTitle({
        title: res.data.title
      })
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

    checkAuth().then(() => {
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
    })
  },
  // 绑定手机号
  onGetPhoneNumber({  detail: { encryptedData, iv, errMsg } }) {
    if (/ok/.test(errMsg)) {
      editPhone({
        iv: encodeURIComponent(iv),
        encryptedData: encodeURIComponent(encryptedData),
      }).then(() => {
        eventBus.$emit('PHONE_CHANGE');
        appInst.globalData.isBindPhone = 1;
        this.setData({ isBindPhone: 1 })
        this.onGoFillOrder();
      })
    } else {
      console.log('获取失败');
    }
  },
  goAuth() {
    wx.navigateTo({
      url: '../login/login',
    })
  },
  onShareAppMessage() {
    const {title, thumbnail, specifications} = this.data.goods;
    return {
      title: `[好友推荐] 亲亲 ${specifications[0].salePrice}元/${specifications[0].title} ${title}`,
      imageUrl: thumbnail
    }
  }
})