
import { goodsList } from '../../api/goods'
import { calcListHeight } from '../../utils/common'

Page({
  data: {
    finished: false,
    list: null,
    listHeight: 0,
    showLoading: false
  },
  onLoad() {
    this.page = 1;
    calcListHeight(this, '.search-res').then(height => {
      this.setData({
        listHeight: height
      });
    });
  },
  // methods
  _getData() {
    goodsList({
      status: 1,
      keyword: this.keyword,
      pageSize: 20,
      page: this.page
    }).then(res => {
      const list = this.data.list;
      const {data, pages: { pageNo, total }} = res.data;
      this.setData({
        finished: pageNo >= total,
        list: list ? [...list, ...data] : data,
        showLoading: false
      })
    })
  },
  // events
  onInputChange({ detail }) {
    this.keyword = detail ? detail : undefined;
  },
  onSearch() {
    this.page = 1;
    this.setData({
      list: null,
      showLoading: true
    });
    this._getData();
  },
  onLoadMore() {
    this.page += 1;
    this._getData();
  },
  onGoodsItemTap({ detail: { goodsId } }) {
    wx.redirectTo({
      url: `../goods-details/goods-details?goodsId=${goodsId}`
    });
  }
})