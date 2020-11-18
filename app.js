// AppID:wxbaf6b94b9db4b2de
// AppSecret:fb2c61ab41d0bb82f4fb8392af8f6db5
// Account：Nd1111xf..
// Password：2601932922@qq.com

App({
  // 页面启动
  onLaunch() {
   
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          this.globalData.isAuth = true;
        }
      }
    });
  },
  // 全局数据
  globalData: {
    // 是否授权
    isAuth: false,
    // 是否绑定手机号
    isBindPhone: 0,

  },
});
