// 基地址
// 生产环境：https://api.imichong.com/api
// 开发环境：http://32d774f978.51vip.biz:30009/api
const BASE_URI = 'https://api.imichong.com/api';

// request
const request = (options, loadingTips) => {
  // handle options 
  const { data, method } = options;
  if (data && /POST/i.test(method)) {
    options.data = JSON.stringify(data);
  }
  options.url = BASE_URI + options.url;
  options.method = options.method || 'GET';
  options.header = {
    'Content-Type': 'application/json',
    'token': wx.getStorageSync("token")
  }
  // loading
  loadingTips && wx.showLoading({
    title: loadingTips,
    mask: true,
  });
  // request
  return new Promise((resolve, reject) => {
    wx.request({
      ...options,
      timeout: 10000,
      dataType: 'json',
      success(res) {
        if (res.statusCode === 200) {
          const { status, msg } = res.data;
          if (status === 200 || status === 201 ) {
            resolve(res.data)
          } else {
            wx.showToast({
              title: msg,
              icon: 'none'
            })
          }
        } else {
          wx.showToast({
            title: '服务器异常，稍后再试！',
            icon: 'none'
          })
          console.log('「接口请求异常：」', res);
        }
      },
      fail(err) {
        console.log('「接口请求异常：」', err);
      },
      complete() {
        loadingTips && wx.hideLoading();
      }
    })
  })
}
export default request;