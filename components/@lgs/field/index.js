
Component({
  options: {
    addGlobalClass: true,
  },
  properties: {
    customClass: String,
    value: {
      type: String,
      observer: 'setInnerValue'
    },
    type: String,
    placeHolder: String,
    confirmType: {
      type: String,
      value: 'done'
    },
    placeHolderStyle: {
      type: String,
      value: "color:#A8A8A8; font-size:24rpx;"
    },
    caretColor: {
      type: String,
      value: '#A8A8A8'
    },
    clear: {
      type: Boolean,
      observer: 'setShowClear',
    }
  },

  data: {
    innerValue:'',
    showClear: false
  },
  lifetimes: {
    attached() {
      this.setData({innerValue: this.properties.value})
    }
  },
  methods: {
    setShowClear() {
      const clear = this.properties.clear;
      const innerValue = this.data.innerValue;
      this.setData({
        showClear: clear && innerValue
      });
    },
    setInnerValue(value) {
     this.setData({innerValue: value})
    },
    onInput({detail: { value }}) {
      this.setData({innerValue: value})
      this.triggerEvent('change', value);
      this.setShowClear();
    },
    onFocus() {
      this.setShowClear();
    },
    onBlur() {
      this.setData({showClear: false});
    },
    onConfirm({detail: { value }}) {
      this.triggerEvent('confirm', value);
    },
    onClear() {
      this.setData({innerValue: ''});
      this.triggerEvent('change', '');
    }
  }
});

