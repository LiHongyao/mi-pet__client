import { edit } from '../../api/user'
var appInst = getApp();

Page({

  onLoad() {
    this.eventChannel = this.getOpenerEventChannel();
  },
  onGetUserInfo({ detail }) {
    const { avatarUrl, nickName } = detail.userInfo;
    if (/ok/.test(detail.errMsg)) { // 成功授权
      edit({
        nickname: nickName,
        avatar: avatarUrl
      }).then(() => {
        appInst.globalData.isAuth = true;
        this.eventChannel.emit('refresh');
        wx.navigateBack();
      })
    }
  },
  onNoLogin() {
    wx.navigateBack();
  },
  onPush({currentTarget: { dataset: { path} } }) {
    wx.navigateTo({
      url: path,
    })
  }
})