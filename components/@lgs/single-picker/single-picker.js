Component({
  properties: {
    options: {
      type: Array
    },
    show: {
      type: Boolean,
      value: false
    }
  },
  data: {
    visible: false
  },
  observers: {
    'show': function(value) {
      console.log(value)
      this.setData({
        visible: value
      })
    }
  },
  lifetimes: {
    attached() {
      this.setData({
        visible: this.properties.show
      })
    }
  },
  methods: {
    bindChange({ detail: { value }}) {
      this.value = this.properties.options[value[0]];
    },
    onSure() {
      this.triggerEvent('change', this.value || this.properties.options[0]);
      this.onCancel();
    },
    onCancel() {
      this.triggerEvent('close');
      this.setData({
        visible: false
      });
    }
  }
});
