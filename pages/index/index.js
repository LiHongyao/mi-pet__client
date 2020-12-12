import {
  goodstypes,
  goodsList
} from '../../api/goods'
import {
  banners
} from '../../api/banners'
import {
  login,
  edit
} from '../../api/user'
import {
  checkAuth
} from '../../utils/common'
var appInst = getApp();

Page({
  data: {
    city: '成都',
    banners: null,
    goods: null,
    goodsTypes: null,
    active: 0,
    showCouponDialog: false,
    showActivitiesDialog: false,
    finished: false
  },
  onLoad() {
    // 校验登录
    this._login().then(() => {
      this._initData();
      // 校验活动弹框
      let targetDate = new Date('2020/12/13 00:00:00');
      let currentDate = new Date();
      if (targetDate - currentDate > 0) {
        this.setData({
          showActivitiesDialog: true
        })
      }
    });

  },
  // methods
  _initData() {
    this.page = 1;
    this._getBanners();
    this._getGoodsTypes();
    this._getGoods();
  },

  _login() {
    return new Promise(resolve => {
      wx.login({
        complete: (res) => {
          if (res.errMsg === 'login:ok') {
            // 调用登录接口
            login(res.code).then(response => {
              if (response.status === 200) {
                const {
                  isBindPhone,
                  isFirstIn,
                  token,
                  hasNewCoupon
                } = response.data;
                // 存储token
                wx.setStorageSync("token", token);
                // 存储手机号绑定状态
                appInst.globalData.isBindPhone = isBindPhone;
                // 是否第1次进入/控制优惠券弹框显示
                // this.setData({
                //   showCouponDialog: hasNewCoupon
                // });
                wx.getSetting({
                  success: res => {
                    if (res.authSetting['scope.userInfo']) {
                      wx.getUserInfo({
                        success: (result) => {
                          const {
                            avatarUrl,
                            nickName
                          } = result.userInfo;
                          edit({
                            nickname: nickName,
                            avatar: avatarUrl
                          }).then(() => {
                            console.log('__用户信息修改成功__');
                          })
                        }
                      })
                    }
                  }
                });
                resolve();
              }
            })
          }
        },
      });
    })
  },

  _getBanners() {
    banners().then(res => {
      this.setData({
        banners: res.data
      });
    })
  },
  _getGoodsTypes() {
    goodstypes().then(res => {
      this.setData({
        goodsTypes: res.data
      })
    })
  },
  _getGoods() {
    goodsList({
      status: 1,
      page: this.page,
      pageSize: 20,
      typeId: 1,
      isRecommend: 1
    }).then(res => {
      const goods = this.data.goods;
      const {
        data,
        pages: {
          pageNo,
          total
        }
      } = res.data;
      this.setData({
        finished: pageNo >= total,
        goods: goods ? [...goods, ...data] : data
      })
    })
  },
  // events
  onSearch() {
    wx.navigateTo({
      url: '../search-list/search-list?type=1',
    })
  },
  onDelete(e) {
    console.log('tag', e)
  },
  onGoodsItemTap({
    detail: {
      goodsId
    }
  }) {
    wx.navigateTo({
      url: `../goods-details/goods-details?goodsId=${goodsId}`
    })
  },
  onGoodsTypeItemTap({
    currentTarget: {
      dataset: {
        title,
        goodsType
      }
    }
  }) {
    wx.navigateTo({
      url: `../goods/goods?title=${title}&goodsType=${goodsType}`
    })
  },
  onHideCouponDialog() {
    this.setData({
      showCouponDialog: false
    })
  },
  onQueryCoupons() {
    checkAuth().then(() => {
      wx.navigateTo({
        url: '../coupon/coupon',
        complete: () => {
          this.setData({
            showCouponDialog: false
          })
        }
      });
    });
  },
  onLoadMore() {
    if (this.data.finished) return;
    this.page += 1;
    this._getGoods();
  },
  onBannerTap(event) {
    checkAuth().then(() => {
      const url = event.currentTarget.dataset.url;
      if (url) {
        wx.navigateTo({
          url
        })
      };
    })
  },
  onActiviesDialogClose() {
    this.setData({
      showActivitiesDialog: false
    })
  },
  onShareAppMessage() {

  }
})