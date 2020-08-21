
import { petFiles } from '../../api/pets'
import { user } from '../../api/user'
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
      console.log(res);
      this.setData({
        petFiles: res.data
      })
    })
  },
  // events
  onOrderItemTap(e) {
    const { status, title } = e.currentTarget.dataset;
    wx.navigateTo({
      url: `../orders/orders?title=${title}&status=${status}`
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
          phoneNumber: '17398888669'
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
      url: '../add-pets/add-pets',
      events: {
        refreshPetFile: () => {
          this._getPetFiles();
        }
      }
    })
  },
  onPetArchivesItemTap({ detail }) {
    wx.navigateTo({
      url: `../pet-details/pet-details?petId=${detail}`,
      events: {
        refreshPetFile: () => {
          this._getPetFiles();
        }
      }
    })
  },
  onPush(e) {
    const path = e.currentTarget.dataset.path;
    wx.navigateTo({
      url: path
    })
  },
  onLogin() {
    let _this = this;
    wx.navigateTo({
      url: '../login/login',
      events: {
        refresh() {
          _this._initData();
        }
      },
    });
  }
})