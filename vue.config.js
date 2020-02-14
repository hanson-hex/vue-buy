module.exports = {
  configureWebpack: {
  },
  css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // less vars，customize ant design theme

          // 'primary-color': '#F5222D',
          // 'link-color': '#F5222D',
          // 'border-radius-base': '4px'
        },
        // do not remove this line
        javascriptEnabled: true
      }
    }
  },
  devServer: {
    port: 8000,
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