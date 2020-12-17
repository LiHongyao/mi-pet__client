/**
  * 注册监听器
  * @param {Object} context 页面上下文/用于触发监听函数时绑定this
  */
function registerWatcher(context) {
  let { data, watch } = context;
  if (!data || !watch) {
    throw '「监听器」：“data”或“watch”对象未在页面中设置。';
  } else {
    Object.keys(watch).forEach(key => {
      
      let keyArr = key.split('.');
      let length = keyArr.length;
      let newData = data;

      for (let i = 0; i < length - 1; i++) { // 遍历keyArr，排除最后一个！！！
        newData = newData[keyArr[i]];
      }

      let lastKey = keyArr[length - 1];
      let fn = watch[key].handler || watch[key];
      let deep = watch[key].deep;

      watcher(newData, lastKey, fn, deep, context);
    });
  }
}

/**
 * 监听属性变化/执行监听函数
 * @param {Object}   data 监听对象
 * @param {String}   key  监听属性
 * @param {Function} fn   监听函数
 * @param {Boolean}  deep 是否深度监听
 * @param {Object}   context 页面上下文/用于触发监听函数时绑定this
 */
function watcher(data, key, fn, deep, context) {

  let _oldValue = data[key];

  // 判断deep是true 且 val不能为空 且 typeof val==='object'（数组内数值变化也需要深度监听）
  if (deep && _oldValue != null && typeof _oldValue === 'object') {
    Object.keys(_oldValue).forEach(childKey => { // 遍历_oldValue对象下的每一个key
      watcher(_oldValue, childKey, fn, deep, context); // 递归调用监听函数
    })
  }

  // 数据劫持
  Object.defineProperty(data, key, {
    configurable: true,
    enumerable: true,
    set: function (value) {
      fn && fn.call(context, value, _oldValue);
      _oldValue = value;
      if (deep) { // 若是深度监听,重新监听该对象，以便监听其属性。
        watcher(data, key, fn, deep, context);
      }
    },
    get: function () {
      return _oldValue;
    }
  })
}

export {
  registerWatcher
}
