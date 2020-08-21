// pages/test/test.js
Page({
  /**
   * 页面的初始数据
   */
  data: {

  },
  onChange({ detail }) {
    console.log(detail);
  },
  onConfirm({ detail }) {
    console.log(detail);
  },
  onSearch({ detail }) {
    console.log('搜索', detail);
  }
})