
import { toast, imgToBase64 } from '../../utils/common'
import { uploadFile } from '../../api/upload'
import { petUpdate } from '../../api/pets'
import eventBus from '../../utils/eventBus'

Page({
  data: {
    radio: {
      gender: [// 性别
        { label: '妹妹' },
        { label: '弟弟' },
      ],
      sterilization: [// 是否绝育
        { label: '已绝育', value: 1 },
        { label: '未绝育', value: 0 },
      ],
      grade: [// 品级
        { label: '宠物级' },
        { label: '血统级' },
      ]
    },
    show: false, // 日期选择器
    files: [], // 头像文件
    petImageFiles: [], // 宠物图片上传
    isEditAvatar: false,
    isAdd: 1,
    values: {
      petId: '',
      nickname: '',
      breed: '',
      gender: '',
      birthday: '',
      grade: '',
      is_sterilization: ''
    }
  },
  onLoad() {
    this.eventChannel = this.getOpenerEventChannel();
    this.eventChannel.on('acceptDataFromOpenerPage', data => {
      // 编辑
      if (data) {
        const values = {};
        Object.keys(this.data.values).forEach(key => {
          values[key] = data[key];
        });
        this.setData({
          values,
          isAdd: 0,
          files: [{ url: data.avatar }]
        });
      }
    });
  },
  // methods
  _checkForm() {
    return new Promise(resolve => {
      const { files, values: { nickname, breed, gender } } = this.data;
      let errMsg = '';
      switch (true) {
        case files.length < 1:
          errMsg = '请上传宠物头像';
          break;
        case !nickname:
          errMsg = '请填写宠物昵称';
          break;
        case !breed:
          errMsg = '请填写宠物品种';
          break;
        case !gender:
          errMsg = '请选择宠物性别';
          break;
      }
      if (errMsg) {
        wx.showToast({
          title: errMsg,
          icon: 'none'
        })
      } else {
        resolve();
      }
    })
  },
  _uploadPet(avatar) {
    const { files, isAdd, values } = this.data;
    petUpdate({
      ...values,
      avatar: avatar ? avatar : files[0].url
    }).then(() => {
      toast({ title: isAdd ? '添加成功' : '修改成功' }).then(() => {
        eventBus.$emit('PET_UPDATE');
        wx.navigateBack();
      });
    })
  },
  // events
  onAddPets() {
    this._checkForm().then(() => {
      const { files, isEditAvatar } = this.data;
      // 如果编辑了头像/则先调用上传头像的文件
      if(isEditAvatar) {
        uploadFile({
          images: [imgToBase64(files[0].url)],
          type: 'pet'
        }).then(res => {
          // 上传宠物
          this._uploadPet(res.data[0]);
        });
      }else {
        this._uploadPet();
      }
    });
  },
  // 单选框切换
  onRadioChange({ detail: { value, key } }) {
    this.setData({
      [`values.${key}`]: value
    })
  },
  // 处理输入
  onInput({ currentTarget: { dataset: { key } }, detail: { value } }) {
    this.setData({
      [`values.${key}`]: value
    })
  },
  onFilesAfterRead(event) {
    const { file } = event.detail;
    this.setData({
      files: [ { url: file.path }],
      isEditAvatar: true
    });
  },
  // v2.0版本
  onPetImageFilesAfterRead(event) {
    const { file } = event.detail;
    const petImageFiles = this.data.petImageFiles;
    uploadFile({
      image: file,
      type: 'pet',
    }).then(res => {
      if (res.status === '200') {
        this.setData({
          petImageFiles: [...petImageFiles, { url: res.data.image_url }]
        })
      }
    }).catch(error => {
      console.log(error);
    });
  },
  onDelete() {
    this.setData({
      files: []
    })
  },
  // 显示日期拾取器
  onShowPicker(event) {
    console.log(event);
    this.pickerKey = event.currentTarget.dataset.key;
    this.setData({
      show: true
    })
  },
  // 日期拾取器值变化
  onPickerChange({ detail: { day, month, year } }) {
    this.setData({
      [`values.${this.pickerKey}`]: `${year}-${month}-${day}`
    })
  }

})