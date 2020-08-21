module.exports = {
  bus: {},
  $on(event, handler) {
    if (!this.bus[event]) {
      this.bus[event] = []
    }
    this.bus[event].push(handler);
  },
  // 触发事件
  $emit(event, ...args) {
    let handlers = this.bus[event];
    if (!handlers) return false;
    for (let handler of handlers) {
      handler.call(this, ...args);
    }
  },
  // 移除事件监听
  $off(event, handler) {
    let handlers = this.bus[event];
    if (!handlers) return false;
    if (!handler) {
      delete this.bus[event];
    } else {
      handlers.forEach((item, index) => {
        if (item === cb) {
          handlers.splice(index, 1);
        }
      });
    }
  }
}