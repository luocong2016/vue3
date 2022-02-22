module.exports = {
  lintOnSave: false,
  devServer: {
    overlay: {
      warnings: true,
      errors: true,
    },
    // proxy: {
    //   '/api': {
    //     target: '', // TypeError: Cannot read property 'upgrade' of undefined
    //     ws: true,
    //     changeOrigin: true,
    //   },
    // },
  },
  css: {
    loaderOptions: {
      less: {
        javascriptEnabled: true,
      },
    },
  },
};
