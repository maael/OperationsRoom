module.exports = {
  entry: {
    admin: [ __dirname + '/admin/public/vue.js' ]
  }
, output: {
    path: __dirname + '/admin/public/build'
  , filename: '[name].js'
  }
, module: {
    loaders: [
      { test: /\.vue$/
      , loader: 'vue'
      }
    , { test: /\.js$/
      , loader: 'babel-loader'
      }
    ]
  }
}
