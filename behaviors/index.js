module.exports = Behavior({
  methods: {
    boundingClientRect(sel) {
      return new Promise((resolve) => {
        const query = context.createSelectorQuery();
        query.select(sel).boundingClientRect(res => {
          resolve(res);
        });
        query.exec();
      });
    }
  }
})