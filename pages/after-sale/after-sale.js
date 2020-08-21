
import { applyAfterSale } from '../../api/order'
Page({

  data: {
    show: false,
    content: '',
    status: '',
    options: [
      {label: '已收到货', value: 1},
      {label: '未收到货', value: 2}
    ],
    order: null
  },
  onLoad() {

    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', data => {
      console.log(data)
      this.setData({
        order: data
      })
    })
  },
  onStatusTap() {
    this.setData({
      show: true
    })
  },
  onPickerChange({detail}) {
    this.setData({
      status: detail.label
    })
  },
  onInput({detail: {value}}) {
    this.setData({
      content: value
    })
  },
  onSubmit() {
    const { status, content, order} = this.data;
    if(!status) {
      wx.showToast({
        title: '请选择货物状态',
        icon: 'none'
      })
    }else if(!content) {
      wx.showToast({
        title: '请输入退款原因',
        icon: 'none'
      })
    }else {
      applyAfterSale({
        order_id: order.id,
        order_detail_id: '',
        type: '',
        price: '',
        reason: content
      }).then(res => {
        if(res.status === '200') {
          console.log('申请售后成功')
        }
      }).catch(error => {
        console.log(error);
      })
    }
  }
})