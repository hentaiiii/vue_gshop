const path = require('path')

function resolve(dir) {
  return path.resolve(__dirname, dir)
}

// vue.config.js
module.exports = {
  // 配置开发服务器中的代理
  devServer: {
    proxy: {
      '/api': { // 匹配所有以 '/api'开头的请求路径
        target: 'http://localhost:4000', // 代理目标的基础路径
        changeOrigin: true, // 支持跨域
        pathRewrite: { // 重写路径: 去掉路径中开头的'/api'
          '^/api': ''
        }
      }
    }
  },
  // 编写webpack配置
  configureWebpack: {
    resolve: {
      extensions: ['.js', '.vue', '.json'], // 自添加的文件拓展名
      alias: { // 模块路径别名
        '@': resolve('src'),
        'components': resolve('src/components'),
        'pages': resolve('src/pages')
      }
    }
  }

}