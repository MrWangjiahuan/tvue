module.exports = {
  css: {
    loaderOptions: {
      less: {
        // 解决less .bezierEasingMixin();问题
        javascriptEnabled: true
      }
    }
  }
}
