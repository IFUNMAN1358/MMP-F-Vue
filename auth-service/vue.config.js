const { DefinePlugin } = require('webpack');

module.exports = {
  devServer: {
    port: parseInt(process.env.VUE_APP_PORT)
  },
  configureWebpack: {
    plugins: [
      new DefinePlugin({
        __VUE_PROD_DEVTOOLS__: false,
        __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false
      })
    ]
  }
};