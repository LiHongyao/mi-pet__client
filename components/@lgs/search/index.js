Component({
  options: {
    addGlobalClass: true,
    styleIsolation: 'shared'
  },
  properties: {
    value: String,
    placeHolder: String,
    disabled: Boolean,
    shape: {
      type: String,
      value: 'square' // shape
    },
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
    clear: Boolean,
    showRightButton: {
      type: Boolean,
      value: true
    }
  },
  methods: {
    onChange({ detail }) {
      this.innerValue = detail;
      this.triggerEvent('change', detail);
    },
    onConfirm({ detail }) {
      this.triggerEvent('confirm', detail);
    },
    onSearch() {
      this.triggerEvent('search', this.innerValue);
    },
    onTap() {
      this.triggerEvent('tap');
    }
  }
})
