import { updateAddress, deleteAddress } from '../../api/address'
import { toast } from '../../utils/common'
import Validator from '../../utils/validator'

Page({
  data: {
    formData: {
      addrId: '',
      name: '',
      phone: '',
      address: '',
      doorplate: '',
      default: false
    }
  },
  onLoad() {
    this.eventChannel = this.getOpenerEventChannel();
    this.eventChannel.on('acceptDataFromOpenerPage', data => {
      if(data) {
        this.isEdit = true;
        this.setData({
          formData: data
        })
      }
    })
  },
  // methods
  _check() {
    return new Promise(resolve => {
      const { name, phone, address } = this.data.formData;
      let title = '';
      switch (true) {
        case !name:
          title = '请填写收货人的姓名';
          break;
        case !phone:
          title = '请填写收货人手机号码';
          break;
        case phone.length < 11:
          title = '请输入11位手机号码';
          break;
        case !Validator.tel(phone):
          title = '手机号码不合法';
          break;
        case !address:
          title = '请填写收货地址';
          break;
      }
      if (title) {
        toast({title})
      } else {
        resolve();
      }
    })
  },
  // events
  onChange({ detail }) {
    this.setData({ ['formData.default']: detail });
  },
  onInput(event) {
    const value = event.detail.value;
    const key = event.target.dataset.key;
    this.setData({
      [`formData.${key}`]: value
    });
  },
  onChooseAddress() {
    wx.chooseLocation({
      complete: res => {
        this.setData({
          ['formData.address']: res.address
        });
      },
    })
  },
  onSaveAddress() {
    this._check().then(() => {
      updateAddress(this.data.formData).then(() => {
        toast({title: this.isEdit ? '修改成功' : '新增成功'}).then(() => {
          this.eventChannel.emit('refresh');
          wx.navigateBack(); 
        });
      })
    });
  },
  onDeleteAddress() {
    deleteAddress(this.data.formData.addrId).then(res => {
      toast({title:'删除成功'}).then(() => {
        this.eventChannel.emit('refresh');
        wx.navigateBack();
      });
    })
  }
})
