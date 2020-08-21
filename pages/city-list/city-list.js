import { citys } from '../../model/citys'
Page({
  data: {
    citys: citys
  },
  onChooseCity(e) {
    const city  = e.currentTarget.dataset.city;
    const eventChannel = this.getOpenerEventChannel();
    eventChannel.emit('cityChange', city);
    wx.navigateBack()
  }
})