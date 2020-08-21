import { getAddress } from '../../api/address'
import { createOrder } from '../../api/order'

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
      this.setData({
        address: res.data[0]
      })
    })
  },
  _calcTotalPrice() {
    const {goods: { specifications }, num, sIndex } = this.data;
    this.setData({
      totalPrice: specifications[sIndex].salePrice * num
    })
  },
  onNumChange({ detail }) {
    this.setData({
      num: detail
    });
    this._calcTotalPrice();
  },
  onGoAddress() {
    wx.navigateTo({
      url: '../edit-address/edit-address',
      events: {
        refresh:() => {
          this._getAddressList();
        }
      }
    })
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
    if (address) {
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
              totalSaleTPrice: specifications[sIndex].salePrice * num,
              totalOriginPrice: specifications[sIndex].originPrice * num,
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