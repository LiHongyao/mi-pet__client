import { calcListHeight } from '../../utils/common'
import { coupons } from '../../api/coupon'

Page({
  data: {
    listHeight: 0,
    active: 0,
    useful: null,
    used: null,
    expired: null,
  },
  onLoad() {
    this._initData();
  },
  _initData() {
    this._getCoupons();
  },
  _calc() {
    calcListHeight(this, '.tab-content').then(height => {
      this.setData({
        listHeight: height
      });
    });
  },
  _getCoupons() {
    coupons().then(res => {
      const { useful, used, expired} = res.data;
      this.setData({
        useful,
        used,
        expired
      });
      this._calc();
    })
  },
})