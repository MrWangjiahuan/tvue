module.exports = {
  css: {
    loaderOptions: {
      less: {
        // 解决less .bezierEasingMixin();问题
        javascriptEnabled: true
      }
    }
  },
  chainWebpack: config => {
    const svgRule = config.module.rule('svg')
    svgRule.uses.clear()
    svgRule
      .oneOf('inline')
      .resourceQuery(/inline/)
      .use('vue-svg-icon-loader')
      .loader('vue-svg-icon-loader')
      .end()
      .end()
      .oneOf('external')
      .use('file-loader')
      .loader('file-loader')
      .options({
        name: 'assets/[name].[hash:8].[ext]'
      })
  }
  // devServer: {
  //   proxy: {
  //     '/api': {
  //       target: 'http://localhost:3000',
  //       bypass: function(req, res) {
  //         if (req.headers.accept.indexOf('html') !== -1) {
  //           console.log('Skipping proxy for browser request.')
  //           return '/index.html'
  //         } else if (process.env.MOCK !== 'none') {
  //           const name = req.path
  //             .split('/api/')[1]
  //             .split('/')
  //             .join('_')
  //           const mock = require(`./mock/${name}`)
  //           const result = mock(req.method)
  //           delete require.cache[require.resolve(`./mock/${name}`)]
  //           return res.send(result)
  //         }
  //       }
  //     }
  //   }
  // }
}
