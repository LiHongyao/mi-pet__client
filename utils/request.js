// request.js

const _baseUrl = 'https://api.imichong.com/index.php?s=index';

const request = options => {
  // handle options 
  const { data, method } = options;
  if (data && method !== 'get') {
    options.data = JSON.stringify(data);
  }
  options.url = _baseUrl + options.url;
  options.method = options.method || 'GET';

  wx.showLoading({
    title: '数据加载中',
    mask: true,
  });

  return new Promise((resolve, reject) => {
    wx.request({
      ...options,
      timeout: 5000,
      header: {
        'Content-Type': 'application/json',
        'token': '...'
      },
      dataType: 'json',
      success(res) {
        if (res.statusCode === 200) {

          resolve(res.data)
        } else {
          reject(res.data)
        }
      },
      fail(err) {
        reject(err)
      },
      complete() {
        wx.hideLoading();
      }
    })
  })
}
export default request;