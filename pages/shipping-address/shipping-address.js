import { getAddress, updateAddress } from '../../api/address'
import { toast } from '../../utils/common'

Page({
  data: {
    list: null
  },
  onLoad({ from }) {
    this.eventChannel = this.getOpenerEventChannel();
    this.from = from;;
    this._getData();
  },
  _getData() {
    getAddress().then(res => {
      this.setData({
        list: res.data
      })
    })
  },
  onImportAddress() {
    wx.chooseAddress({
      success: (res) => {
        const { userName, telNumber, provinceName, cityName, countyName, detailInfo } = res;
        const options = {
          name: userName,
          phone: telNumber,
          address: `${provinceName}${cityName}${countyName}${detailInfo}`
        }
        updateAddress(options).then(res => {
          toast({ title: res.msg }).then(() => {
            this._getData();
          });
        })
      },
      fail: () => {
        // this.openConfirm()  
        // 如果获取地址权限失败，弹出确认弹窗，让用户选择是否要打开设置，手动去开权限
      }
    })
  },
  onEditAddress({ detail: { data } }) {
    let _this = this;
    wx.navigateTo({
      url: '../update-address/update-address',
      events: {
        refresh() {
          _this._getData();
        }
      },
      success(res) {
        res.eventChannel.emit('acceptDataFromOpenerPage', data)
      }
    })
  },
  onGoAddAddress() {
    let _this = this;
    wx.navigateTo({
      url: '../update-address/update-address',
      events: {
        refresh() {
          _this._getData();
        }
      },
    })
  },
  onAddressItemTap({ detail }) {
    if (this.from === 'fill-order') {
      this.eventChannel.emit('changeAddress', detail);
      wx.navigateBack();
    }
  }
})


