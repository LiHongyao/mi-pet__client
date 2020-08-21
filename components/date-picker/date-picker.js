const date = new Date();
const year = date.getFullYear();
const month = date.getMonth();
const day = date.getDate();
const years = [], months = [], days = [];

// 处理年
for (let i = 1990; i <= date.getFullYear(); i++) {
  years.push(i)
}

// 处理月
for (let i = 1; i <= 12; i++) {
  months.push(i)
}

// 处理日
for (let i = 1; i <= 31; i++) {
  days.push(i)
}

Component({
  properties: {
    show: {
      type: Boolean,
      value: false
    }
  },
  data: {
    visible: false,
    years, year,
    months, month,
    days,
    day,
    value: [year - 1990, month, day - 1]
  },
  observers: {
    'show': function(value) {
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
    bindChange(e) {
      const val = e.detail.value
      this.setData({
        year: this.data.years[val[0]],
        month: this.data.months[val[1]],
        day: this.data.days[val[2]],
      })
    },
    onSure() {
      this.triggerEvent('change', {
        year: this.data.year,
        month: this.data.month < 10 ? `0${this.data.month}` : this.data.month,
        day: this.data.day < 10 ? `0${this.data.day}` : this.data.day
      });
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
