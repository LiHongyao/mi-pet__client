
Page({

  data: {
    fileList: []
  },
  afterRead(event) {
    const { file } = event.detail;
    const { fileList } = this.data;
    console.log('tag', file)
    
    this.setData({ fileList });
    // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
    // wx.uploadFile({
    //   url: 'https://example.weixin.qq.com/upload', // 仅为示例，非真实的接口地址
    //   filePath: file.path,
    //   name: 'file',
    //   formData: { user: 'test' },
    //   success(res) {
    //     // 上传完成需要更新 fileList
    //     const { fileList = [] } = this.data;
    //     fileList.push({ ...file, url: res.data });
    //     this.setData({ fileList });
    //   },
    // });
  },
  onSubmit() {
    console.log('提交退货申请')
  }
})