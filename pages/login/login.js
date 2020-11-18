import { edit } from '../../api/user'
import eventBus from '../../utils/eventBus'
var appInst = getApp();

Page({
  onGetUserInfo({ detail }) {
    console.log(detail)
    if (/ok/.test(detail.errMsg)) { // 成功授权
      const { avatarUrl, nickName } = detail.userInfo;
      edit({
        nickname: nickName,
        avatar: avatarUrl
      }).then(() => {
        appInst.globalData.isAuth = true;
        eventBus.$emit('LOGGED');
        wx.navigateBack();
      })
    }else {
      // 拒绝授权
      console.log('用户拒绝获取用户信息');
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