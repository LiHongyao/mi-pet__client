import { calcListHeight, checkAuth } from '../../utils/common'
import { screeningConditions, goodsList } from '../../api/goods'
import { registerWatcher } from '../../utils/watcher'

Page({
  data: {
    screenChecked: false, // 是否选中筛选
    sIndex: 0,
    priceStatus: -1, // 1：升序 0：降序 （默认）
    breedsAndBrands: [],

    breedSelectedIndex: -1, // 品种选中下标
    brandSelectedIndex: -1, // 品牌选中下标

    listHeight: 0,
    list: null // 搜索结果
  },
  onLoad({title, goodsType}) {
    registerWatcher(this);
    wx.setNavigationBarTitle({
      title: title || ''
    });
    this.goodsType = +goodsType;
    this._initData();
  },
  watch: {
    sIndex(index) {
      // 0：推荐 / 1：销量 / 2：价格
      this.page = 1;
      switch(index) {
        case 0:
          this.setData({ priceStatus: -1 })
          this.orderName = undefined;
          this.orderVal = undefined;
          break;
        case 1:
          this.setData({ priceStatus: -1 })
          this.orderName = 'sales';
          this.orderVal = 'asc';
          break;
        case 2:
          let priceStatus = this.data.priceStatus;
          this.orderName = 'salePrice';
          priceStatus = priceStatus === -1 ? 0 : ( priceStatus === 1  ? 0: 1);
          this.orderVal = priceStatus === 1  ? 'asc': 'desc';
          this.setData({ priceStatus })
          break;
      }
      this.setData({
        list: null
      });
      this._getGoodsFilterList();
    }
  },
  // methods
  _initData() {
    this.page = 1;
    // 获取品种/品牌
    this._getBreedsAndBrands();
    // 获取列表
    this._getGoodsFilterList();
    // 计算高度
    calcListHeight(this, '.list-contents').then(height => {
      this.setData({
        listHeight: height
      });
    })
  },
  _getBreedsAndBrands() {
    screeningConditions().then(res => {
      this.setData({
        breedsAndBrands: res.data
      })
    })
  },
  _getGoodsFilterList() {
    goodsList({
      status: 1,
      typeId: this.goodsType,
      orderName: this.orderName,
      orderVal: this.orderVal,
      brand: this.brand,
      breedId: this.breedId,
      keyword: this.keyword,
      pageSize: 20,
      page: this.page
    }).then(res => {
      const list = this.data.list;
      const {data, pages: { pageNo, total }} = res.data;
      this.setData({
        finished: pageNo >= total,
        list: list ? [...list, ...data] : data
      })
    })
  },
  // events
  onLoadMore() {
    this.page += 1;
    this._getGoodsFilterList();
  },
  // 推荐/销量/价格
  onFilterItemTap(e) {
    const sIndex = e.currentTarget.dataset.index;
    if (sIndex !== 2 && sIndex === this.data.sIndex) return;
    this.setData({
      sIndex: sIndex,
      screenChecked: false,
    });
  },
  onScreenTap() {
    this.setData({
      screenChecked: !this.data.screenChecked
    })
  },

  onBreedItemTap(e) {
    const { index, id } = e.currentTarget.dataset;
    this.breedId = id;
    this.setData({
      breedSelectedIndex: index
    });
  },

  onBrandItemTap(e) {
    const { index, brand } = e.currentTarget.dataset;
    this.brand = brand;
    this.setData({
      brandSelectedIndex: index
    })
  },

  onResetFilters() {
    this.brand = undefined;
    this.breedId = undefined;
    this.setData({
      breedSelectedIndex: -1,
      brandSelectedIndex: -1
    })
  },
  onSureFilters() {
    this.page = 1;
    this.setData({
      screenChecked: false,
      list: null
    });
    this._getGoodsFilterList();
  },
  onInputChange({ detail }) {
    this.keyword = detail ? detail : undefined;
  },
  onSearch() {
    this.page = 1;
    this.setData({
      list: null
    });
    this._getGoodsFilterList();
  },
  onGoodsItemTap({ detail: { goodsId } }) {
    checkAuth().then(() => {
      wx.navigateTo({
        url: `../goods-details/goods-details?goodsId=${goodsId}`
      })
    })
  }
})


