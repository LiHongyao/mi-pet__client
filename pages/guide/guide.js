import { calcListHeight } from '../../utils/common'
import { guideList } from '../../api/guide'
Page({
  data: {
    active: 0,
    keyword: '',
    menus: ['猫猫指南', '狗狗指南'],
    listHeight: '100%',
    catFinished: false,
    catList: null,
    dogFinished: false,
    dogList: null,
  },
  onLoad() {
    calcListHeight(this, '.tab-contents').then(height => {
      this.setData({
        listHeight: height
      });
    });
    this._initData();
    
  },
  _initData() {
    this.catPage = 1;
    this.dogPage = 1;
    this._getData();
  },
  _getData() {
    const { active, catList, dogList, keyword } = this.data;
    const page = active === 0 ? this.catPage : this.dogPage;
    const type = active + 1; 
    guideList({
      type,
      pageSize: 5,
      page,
      keyword: keyword ? keyword : undefined
    }).then(res => {
      const {data, pages: {total, pageNo} } = res.data;
      switch(active) {
        case 0: 
          this.setData({
            catFinished: pageNo >= total,
            catList: catList ? [...catList, ...data]  : data
          })
          
          break;
        case 1: 
          this.setData({
            dogFinished: pageNo >= total,
            dogList: dogList ? [...dogList, ...data]  : data
          })
          break;
      }
    })
  },
  onChange({ detail }) {
    let { catList, dogList, keyword } = this.data;
    let list = null;
    if(detail === 0) { // 猫猫指南
      dogList = keyword ? null : dogList;
      list = catList;
    }else { // 狗狗指南
      catList = keyword ? null : catList;
      list = dogList;
    }
    this.setData({
      active: detail,
      keyword: '',
      catList,
      dogList
    });
    !list && this._getData();
  },
  onLoadMore() {
    switch(this.data.active) {
      case 0: 
        this.catPage += 1;
        break;
      case 1: 
        this.dogPage += 1;
        break;
    }
    this._getData();
  },
  onItemTap({ detail: { guideId }}) {
    wx.navigateTo({
      url: `../guide-details/guide-details?guideId=${guideId}`,
    })
  },
  onInputChange({ detail }) {
    this.setData({
      keyword: detail 
    })
  },
  onSearch() {
    switch(this.data.active) {
      case 0: 
        this.setData({ catList: null });
        this.catPage = 1;
        break;
      case 1: 
        this.setData({ dogList: null });
        this.dogPage = 1;
        break;
    }
    this._getData();
  }
});


