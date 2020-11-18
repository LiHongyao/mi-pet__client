import { petFileDetails, deletePetFile } from '../../api/pets'
import { toast } from '../../utils/common'
import eventBus from '../../utils/eventBus'
Page({
  data: {
    petInfo: null
  },
  onLoad({petId}) {
    this.petId = petId;
    this._getPetFileDetails();
    eventBus.$on('PET_UPDATE', () => {
      this._getPetFileDetails();
    });
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
            toast({
              title: response.msg
            }).then(() => {
              eventBus.$emit('PET_UPDATE');
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
      success: res => {
        res.eventChannel.emit('acceptDataFromOpenerPage', this.data.petInfo)
      }
    })
  }
})