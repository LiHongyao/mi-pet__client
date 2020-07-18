
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




