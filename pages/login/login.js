import {
  login,
  edit
} from '../../api/user'
import eventBus from '../../utils/eventBus'
var appInst = getApp();

Page({
  _login() {
    return new Promise((resolve, reject) => {
      // 如果token不存在，说明该用户还没有注册
      if (!wx.getStorageSync("token")) {
        wx.login({
          complete: (res) => {
            if (res.errMsg === 'login:ok') {
              // 调用登录接口
              login(res.code).then(response => {
                if (response.status === 200) {
                  const {
                    isBindPhone,
                    token
                  } = response.data;
                  // 存储token
                  wx.setStorageSync("token", token);
                  // 存储手机号绑定状态
                  appInst.globalData.isBindPhone = isBindPhone;
                  resolve();
                }else {
                  reject();
                }
              })
            }else {
              reject();
            }
          },
        });
      }else {
        resolve();
      }
    })
  },
  onGetUserInfo({
    detail
  }) {
    if (/ok/.test(detail.errMsg)) { // 成功授权
      this._login().then(() => {
        const {
          avatarUrl,
          nickName
        } = detail.userInfo;
        edit({
          nickname: nickName,
          avatar: avatarUrl
        }).then(() => {
          appInst.globalData.isAuth = true;
          eventBus.$emit('LOGGED');
          wx.navigateBack();
        })
      })
    } else {
      // 拒绝授权
      console.log('用户拒绝获取用户信息');
    }
  },
  onNoLogin() {
    wx.navigateBack();
  },
  onPush({
    currentTarget: {
      dataset: {
        path
      }
    }
  }) {
    wx.navigateTo({
      url: path,
    })
  }
})