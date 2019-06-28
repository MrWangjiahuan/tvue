const path = require('path')
const webpack = require('webpack')
const AntDesignThemePlugin = require('antd-theme-webpack-plugin')

const isGhpages =
  process.env.VUE_APP_GH_ENV && process.env.VUE_APP_GH_ENV === 'ghpages'
    ? true
    : false
// 主题切换配置 生成color.less
// https://github.com/mzohaibqc/antd-theme-webpack-plugin/blob/master/index.js
let options = {
  antDir: path.join(__dirname, './node_modules/ant-design-vue'),
  stylesDir: path.join(__dirname, './src'),
  varFile: path.join(
    __dirname,
    './node_modules/ant-design-vue/lib/style/themes/default.less'
  ),
  mainLessFile: '',
  themeVariables: ['@primary-color'],
  publicPath: isGhpages ? '/tvue' : '/',
  generateOnce: false
}
// 本地不需要publicPath
if (!isGhpages) {
  delete options.publicPath
}

const themePlugin = new AntDesignThemePlugin(options)

const port = 5200 // dev port

module.exports = {
  productionSourceMap: false,
  publicPath: isGhpages ? '/tvue/' : '/',
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
    plugins: [themePlugin, new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/)]
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
  },
  devServer: {
    port: port,
    open: false,
    overlay: {
      warnings: false,
      errors: true
    },
    proxy: {
      // change xxx-api/login => mock/login
      // detail: https://cli.vuejs.org/config/#devserver-proxy
      [process.env.VUE_APP_BASE_API]: {
        target: `http://localhost:${port}/mock`,
        changeOrigin: true,
        pathRewrite: {
          ['^' + process.env.VUE_APP_BASE_API]: ''
        }
      }
    },
    after: require('./mock/mockServer.ts')
  }
}
