module.exports = {
  configureWebpack: {
  },
  devServer: {
    before(app) {
      app.get('/api/goods', function (req, res) {
        res.json({
          list: [
            { text: '架构', price: 100 },
            { text: '爬虫', price: 80 },
            { text: '大师', price: 400 }
          ]
        })
      })
    }
  }
}