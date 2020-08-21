import { goodsComments } from '../../api/goods'
Page({
  data: {
    list: null,
    finished: false
  },
  onLoad({ goodsId }) {
    this.page = 1;
    this.goodsId = goodsId;
    this._getData();
  },
  // methods
  _getData() {
    goodsComments({
      goodsId: this.goodsId,
      pageSize: 10,
      page: this.page
    }).then(res => {
      const list = this.data.list;
      const { data, pages: { total, pageNo }} = res.data;
      this.setData({
        finished: pageNo >= total,
        list: list ? [...list, ...data] : data
      })
    })
  },
  onLoadMore() {
    this.page += 1;
    this._getData();
  }
})