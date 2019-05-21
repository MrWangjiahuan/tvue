const path = require('path')
const webpack = require('webpack')

module.exports = {
  css: {
    loaderOptions: {
      // modifyVars: {
      //   'primary-color': '#1DA57A'
      // },
      less: {
        // 解决less .bezierEasingMixin();问题
        javascriptEnabled: true
      }
    }
  },
  configureWebpack: {
    // 优化moment构建大小 忽略moment所引用的所有包
    // 需要单独在用时引入所需包
    plugins: [new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)]
    // 由于打包构建icon所占比例比较大，可以采用以下方式解决，但是存在一个问题
    // 如果图标按需加载 需要把ant-design-vue所有的图标都要抽取出来定义 （目前没有很好的解决方案）
    // 所以图标这块段打包暂时不优化
    // resolve: {
    //   alias: {
    //     '@ant-design/icons/lib/dist$': path.resolve(__dirname, './src/icons.js')
    //   }
    // }
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
