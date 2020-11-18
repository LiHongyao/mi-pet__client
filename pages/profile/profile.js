
import { petFiles } from '../../api/pets'
import { user } from '../../api/user'
import { checkAuth } from '../../utils/common'
import eventBus from '../../utils/eventBus'
var appInst = getApp();

Page({
  data: {
    isAuth: false,
    petFiles: null,
    userInfo: null,
    orders: [
      { text: '待付款', imgPath: './images/order_payment.png' },
      { text: '待发货', imgPath: './images/order_deliver_goods.png' },
      { text: '待收货', imgPath: './images/order_receiving_goods.png' },
      { text: '已完成', imgPath: './images/order_complete.png' },
      { text: '退款/售后', imgPath: './images/order_after_sale.png' }
    ],
    menus: [
      { text: '我的收藏' },
      { text: '收货地址', to: '../shipping-address/shipping-address' },
      { text: '联系客服' },
      { text: '用户协议', to: '../agreement/agreement' },
      { text: '隐私政策', to: '../privacy/privacy' }
    ]
  },
  onLoad() {
    this._initData();
    // 监听绑定手机号
    eventBus.$on('PHONE_CHANGE', () => {
      this._initData();
    });
    // 监听用户下单更新优惠券
    eventBus.$on('COUPON_USED', () => {
      this._initData();
    });
    // 监听宠物添加/修改/删除
    eventBus.$on('PET_UPDATE', () => {
      this._getPetFiles();
    });
    // 监听登录
    eventBus.$on('LOGGED', () => {
      this._initData();
    });
  },
  _initData() {
    const isAuth = appInst.globalData.isAuth;
    this.setData({ isAuth })
    if (isAuth) {
      this._getUserInfo();
      this._getPetFiles();
    }
  },
  // 获取用户信息
  _getUserInfo() {
    user().then(res => {
      this.setData({
        userInfo: res.data
      });
    })
  },
  // 获取宠物档案
  _getPetFiles() {
    petFiles().then(res => {
      this.setData({
        petFiles: res.data
      })
    })
  },
  // events
  onOrderItemTap(e) {
    checkAuth().then(() => {
      const { status, title } = e.currentTarget.dataset;
      wx.navigateTo({
        url: `../orders/orders?title=${title}&status=${status}`
      })
    })
  },
  onMenuItemTap({ currentTarget: { dataset: { text, to } } }) {
    switch (text) {
      case '我的收藏':
        wx.switchTab({
          url: '../collection/collection',
        })
        break;
      case '联系客服':
        wx.makePhoneCall({
          phoneNumber: '4000778182'
        })
        break;
      case '收货地址': 
        checkAuth().then(() => {
          wx.navigateTo({
            url: to,
          })
        })
        break;
      default: {
        wx.navigateTo({
          url: to,
        })
      }
    }
  },
  onAddPet() {
    wx.navigateTo({
      url: '../add-pets/add-pets'
    })
  },
  onPetArchivesItemTap({ detail }) {
    wx.navigateTo({
      url: `../pet-details/pet-details?petId=${detail}`
    })
  },
  onPush(e) {
    const path = e.currentTarget.dataset.path;
    wx.navigateTo({
      url: path
    })
  },
  onLogin() {
    wx.navigateTo({
      url: '../login/login'
    });
  }
})