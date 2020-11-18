

import eventBus from '../../utils/eventBus'
import { favorSwitch } from '../../api/collection'
import { calcListHeight, checkAuth } from '../../utils/common'
import { collections } from '../../api/collection'
Page({
  data: {
    active: 0,
    menus: ['商品收藏', '指南收藏'],
    listHeight: 0,
    goodsFinished: false,
    goodsList: null,
    guideFinished: false,
    guideList: null
  },

  onLoad() {
    // 注册事件
    eventBus.$on('COLLECTION_CHANGE', ({ type }) => {
      if (type === 1) {
        this.setData({
          goodsList: []
        })
      } else if (type === 2) {
        this.setData({
          guideList: []
        })
      }
      this.type = type;
      this._initData();
    });
    // 计算列表高度
    calcListHeight(this, '.tab-contents').then(height => {
      this.setData({
        listHeight: height
      });
    });
    // 初始化数据
    this.type = 1;
    this._initData();
  },

  _initData() {
    this.goodsPage = 1;
    this.guidePage = 1;
    this._getData();
  },
  _getData() {
    const { active, goodsList, guideList } = this.data;
    const page = active === 0 ? this.goodsPage : this.guidePage;
    collections({
      page,
      pageSize: 10,
      type: this.type
    }).then(res => {
      const {data, pages: {total, pageNo} } = res.data;
      switch (this.type) {
        case 1:
          this.setData({
            goodsFinished: pageNo >= total,
            goodsList: goodsList ? [...goodsList, ...data] : data
          })
          break;
        case 2:
          this.setData({
            guideFinished: pageNo >= total,
            guideList: guideList ? [...guideList, ...data] : data
          })
          break;
      }
    })
  },
  onChange({ detail }) {
    this.type = detail + 1;
    this.setData({
      active: detail
    });
    const { goodsList, guideList } = this.data;
    const list = detail === 0 ? goodsList : guideList;
    !list && this._getData();
  },
  onLoadMore(e) {
    switch(this.data.active) {
      case 0: 
        this.goodsPage += 1;
        break;
      case 1: 
        this.guidePage += 1;
        break;
    }
    this._getData();
  },
  onDelete({ detail: { index } }) {
    const guideList = this.data.guideList;
    const guideId = guideList[index].guideId;
    favorSwitch({
      type: 2,
      cid: guideId,
      collect: 0
    }).then(res => {
      wx.showToast({
        title: res.message,
        icon: 'none',
        duration: 2000
      });
      guideList.splice(index, 1);
      this.setData({
        guideList
      })
    })
  },
  onGoodsItemTap({ detail: { goodsId } }) {
    wx.navigateTo({
      url: `../goods-details/goods-details?goodsId=${goodsId}`,
    });
  },
  onGuideItemTap({ detail: { guideId } }) {
    wx.navigateTo({
      url: `../guide-details/guide-details?guideId=${guideId}`,
    })
  }
})