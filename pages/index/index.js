import { banner, category } from '../../api/index.js'


Page({
  data: {
    keywords: '',
    banners: [],
    category: [],
    channels: [
      {text: '主食', imgPath: '../../assets/images/icon_staple_food.png'},
      {text: '零食', imgPath: '../../assets/images/icon_snacks.png'},
      {text: '用品', imgPath: '../../assets/images/icon_articles.png'},
      {text: '保健', imgPath: '../../assets/images/icon_healthcare.png'},
    ],
    active: 0
  },
  onLoad() {
    this._initData();
  },
  // methods
  _initData() {
    this._getBanner();
    this._getCategory();
  },
  _getBanner() {
    banner().then(res => {
      if (res.status === '200') {
        this.setData({
          banners: res.data
        });
      }
    }).catch(error => {
      console.log(error);
    })
  },
  _getCategory() {
    category().then(res => {
      if (res.status === '200') {
        console.log(res.data)
        this.setData({
          category: res.data
        });
      }
    }).catch(error => {
      console.log(error);
    })
  },
  // events
  onSearch() {

  }
})
