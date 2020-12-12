
/**
 * 获取节点边界值
 * @param {string} context 上下文
 * @param {string} sel 节点选择器
 */
export function boundingClientRect(context, sel) {
  return new Promise((resolve, reject) => {
    const query = context.createSelectorQuery();
    query.select(sel).boundingClientRect(res => {
      resolve(res);
    });
    query.exec();
  });
}

/**
 * 显示区域的竖直滚动位置
 * @param {string} context 上下文
 */
export function scrollOffset(context) {
  return new Promise((resolve, reject) => {
    const query = context.createSelectorQuery();
    query.selectViewport().scrollOffset(function (res) {
      resolve(res);
    })
    query.exec();
  });
}


/**
 * 计算高度
 * @param {*} context 
 * @param {*} sel 
 */
export function calcListHeight(context, sel) {
  return new Promise(resolve => {
    const { windowHeight } = wx.getSystemInfoSync();
    const query = context.createSelectorQuery();
    query.select(sel).boundingClientRect(rect => {
      resolve(windowHeight - rect.top);
    }).exec();
  })
}

/**
 * 检查是否登录
 */
export function checkAuth() {
  const appInst =  getApp();
  return new Promise(resolve => {
    if(appInst.globalData.isAuth && wx.getStorageSync("token")) {
      resolve();
    }else {
      wx.navigateTo({
        url: '/pages/login/login',
      })
    }
  })
}



/**
 * 轻提示
 * @param {*} options 
 */
export function toast(options) {
  options.icon = options.icon || 'none';
  options.duration = options.duration || 2000;
  return new Promise(resolve => {
    wx.showToast({...options});
    setTimeout(() => {
      resolve();
    }, options.duration);
  })
}

/**
 * 防抖
 * @param {export function} callback 
 * @param {Number} delay 
 */
export function debounce(callback, delay = 500) {
	let timer = null;
	return function(...args) {
		if (timer) {
			clearTimeout(timer); // 清除定时器
		}
		timer = setTimeout(() => {
			callback.apply(this, args);
			clearTimeout(timer)
		}, delay);
	}
}

/**
 * 节流
 * @param {export function} callback 
 * @param {Number} delay 
 */
export function throttle(callback, delay = 10000) {
  console.log('节流')
  // 设置一个开关
  let on = true;
  return function () {
      if (!on) return; // 如果开关已经关掉了就不用往下了
      on = false  
      setTimeout(() => {
          callback.apply(this, arguments)
          on = true; // 执行完才打开开关
      }, delay)
  }
}

/**
 * 将图片转为base64
 * @param {*} filePath 
 */
export function imgToBase64(filePath) {
  return 'data:image/png;base64,' + wx.getFileSystemManager().readFileSync(filePath, "base64")
}






