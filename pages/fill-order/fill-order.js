import { getAddress } from '../../api/address'
import { createOrder } from '../../api/order'
import lgNumber from '../../utils/lg-number';


Page({
  data: {
    num: 1,
    address: null,
    goods: null,
    sIndex: 0,
    totalPrice: 0
  },
  onLoad() {
    this.eventChannel = this.getOpenerEventChannel();
    this.eventChannel.on('acceptDataFromOpenerPage', data => {
      this.setData({
        goods: data
      });
      this._calcTotalPrice();
    })
    this._getAddressList();
  },
  _getAddressList() {
    getAddress().then(res => {
      const address = res.data[0];
      this.setData({
        address: address ? address : -1
      })
    })
  },
  _calcTotalPrice() {
    const {goods: { specifications }, num, sIndex } = this.data;
    this.setData({ totalPrice: lgNumber.multiply(specifications[sIndex].salePrice, num) });
  },
  onNumChange({ detail }) {
    this.setData({
      num: detail
    });
    this._calcTotalPrice();
  },
  onSpecificationsItemTap(event) {
    const index = event.currentTarget.dataset.index;
    this.setData({
      sIndex: index,
      num: 1
    });
    this._calcTotalPrice();
  },
  onSureOrder() {
    const { address, num, goods: {goodsId, specifications, title, thumbnail}, totalPrice, sIndex } = this.data;
    if(!address || address === -1) {
      wx.showToast({
        title: '请添加收货地址',
        icon: 'none'
      })
    }else {
      createOrder({
        addrId: address.addrId,
        goodsId,
        specId: specifications[sIndex].specId,
        num,
        totalPrice
      }).then(res => {
        const {orderId, orderNo} = res.data;
        wx.navigateTo({
          url: `../pay-order/pay-order`,
          success: (res => {
            // 组装数据
            res.eventChannel.emit('acceptDataFromOpenerPage', {
              orderNo, orderId, num, address,thumbnail,
              title: title + '/' + specifications[sIndex].title,
              totalSaleTPrice: lgNumber.multiply(specifications[sIndex].salePrice , num),
              totalOriginPrice: lgNumber.multiply(specifications[sIndex].originPrice , num),
            })
          })
        })
      })
    }
  },
  onGoAddressList() {
    wx.navigateTo({
      url: '../shipping-address/shipping-address?from=fill-order',
      events: {
        changeAddress: data => {
          console.log(data)
          this.setData({
            address: data
          })
        }
      }
    })
  },
})