import { petFileDetails, deletePetFile } from '../../api/pets'
import { toast } from '../../utils/common'
Page({
  data: {
    petInfo: null
  },
  onLoad({petId}) {
    this.eventChannel = this.getOpenerEventChannel();
    this.petId = petId;
    this._getPetFileDetails();
  },
  // methods
  _getPetFileDetails() {
    petFileDetails(this.petId).then(res => {
      this.setData({
        petInfo: res.data
      })
    })
  },
  // events
  onDeletePetFile() {
    wx.showModal({
      title: '提示',
      content: '您确定要删除档案么？',
      success: res =>  {
        if (res.confirm) {
          deletePetFile(this.petId).then(response => {
            console.log(response);
            toast({
              title: response.msg
            }).then(() => {
              this.eventChannel.emit('refreshPetFile');
              wx.navigateBack();
            })
          })
        } 
      }
    })
  },
  onEditPetFile() {
    wx.navigateTo({
      url: '../add-pets/add-pets',
      events: {
        refreshPetFile: () => {
          this._getPetFileDetails();
          this.eventChannel.emit('refreshPetFile');
        }
      },
      success: res => {
        res.eventChannel.emit('acceptDataFromOpenerPage', this.data.petInfo)
      }
    })
  }
})