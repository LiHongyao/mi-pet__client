
import { refund } from '../../api/order'
import { uploadFile } from '../../api/upload'
import { imgToBase64  } from '../../utils/common'
Page({

  data: {
    show: false,
    reason: '',
    status: null,
    files: [],
    options: [
      {label: '已收到货', value: 1},
      {label: '未收到货', value: 0}
    ],
    order: null
  },
  onLoad() {
    const eventChannel = this.getOpenerEventChannel()
    eventChannel.on('acceptDataFromOpenerPage', data => {
      this.setData({ order: data })
    })
  },
  _refund(options) {
    refund(options).then(res => {
      wx.showToast({
        title: res.msg,
        icon: 'none'
      });
      this.isApplied = true;
    })
  },
  onStatusTap() {
    this.setData({ show: true })
  },
  onPickerChange({detail}) {
    console.log(detail);
    this.setData({
      status: detail
    })
  },
  onInput({detail: {value}}) {
    this.setData({
      reason: value
    })
  },
  onAfterRead({detail: { file }}) {
    const files = this.data.files;
    this.setData({
      files: [ ...files,  { url: file.path }]
    });
  },
  onDeleteFile({detail: { index }}) {
    const files = this.data.files;
    files.splice(index, 1);
    this.setData({ files })
  },
  onSubmit() {
    if(this.isApplied) {
     wx.showToast({
       title: '您的申请我们已收到，请勿重复提交！',
       icon: 'none'
     })
      return;
    }
    const { status, reason, order, files} = this.data;
    if(!status) {
      wx.showToast({
        title: '请选择货物状态',
        icon: 'none'
      })
    }else if(!reason) {
      wx.showToast({
        title: '请输入退款原因',
        icon: 'none'
      })
    }else {
      // 判断是否收到货
      if(status.value === 1) {
        // 判断是否上传凭据
        if(files.length >= 2) {
          // 批量上传图片
          uploadFile({
            type: 'refund',
            images: files.map(item => imgToBase64(item.url))
          }).then(res => {
            const images = res.data;
            this._refund({
              orderId:order.orderId.toString(),
              reason,
              cargoStatus: status.value,
              images
            })
          })
        }else {
          wx.showToast({
            title: '请上至少上传2张图片作为退款凭据',
            icon: 'none'
          })
        }
      }else {
        this._refund({
          orderId: order.orderId.toString(),
          reason,
          cargoStatus: status.value
        })
      }
     
    }
  }
})