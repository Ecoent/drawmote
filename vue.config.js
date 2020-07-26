const path = require('path')
const fs = require('fs')
const webpack = require('webpack')

const PrerenderSpaPlugin = require('prerender-spa-plugin')
const HtmlWebpackInlineSourcePlugin = require('html-webpack-inline-source-plugin')
const TerserPlugin = require('terser-webpack-plugin')

const packageDependencies = require('./package-lock.json').dependencies

const webpackPlugins = []

let certs = {}

if (process.env.NODE_ENV === 'production') {
  webpackPlugins.push(new HtmlWebpackInlineSourcePlugin())
  webpackPlugins.push(
    new PrerenderSpaPlugin({
      staticDir: path.join(__dirname, 'dist'),
      routes: ['/'],
      renderer: new PrerenderSpaPlugin.PuppeteerRenderer({
        injectProperty: '__PRERENDERING',
        inject: true,
        renderAfterDocumentEvent: 'render-event',
        skipThirdPartyRequests: true
      }),
      postProcess(context) {
        // context.html = context.html.replace('id="drawmote"', 'id="drawmote" data-server-rendered="true"')
        return context
      }
    })
  )
} else {
  certs = {
    key: fs.readFileSync('./cert/server-key.pem'),
    cert: fs.readFileSync('./cert/server-crt.pem'),
    ca: fs.readFileSync('./cert/ca-crt.pem')
  }
}

const dependencies = {}

new Array('gymote', 'peersox', 'vuetamin', 'lazy-brush').forEach((name) => {
  dependencies[name] = packageDependencies[name].version
})

webpackPlugins.push(
  new webpack.DefinePlugin({
    DEPENDENCIES: JSON.stringify(dependencies)
  })
)

module.exports = {
  productionSourceMap: true,
  filenameHashing: true,
  transpileDependencies: ['debounced-resize', 'peersox'],
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'scss',
      patterns: [path.resolve(__dirname, 'src/assets/scss/vue_include.scss')]
    },
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  },
  devServer: {
    https: {
      ...certs
    }
  },
  configureWebpack: {
    optimization: {
      minimizer:
        process.env.NODE_ENV === 'production'
          ? [
              new TerserPlugin({
                sourceMap: true,
                terserOptions: {
                  ecma: 5,
                  module: true,
                  toplevel: true
                }
              })
            ]
          : []
    },
    resolve: {
      symlinks: false
    },
    plugins: webpackPlugins
  },
  chainWebpack: (config) => {
    config.optimization.delete('splitChunks')
    config.optimization.splitChunks(false)
    config.plugin('define').tap((args) => {
      let v = JSON.stringify(require('./package.json').version)
      args[0]['process.env']['PKG_VERSION'] = v
      return args
    })
    if (process.env.NODE_ENV === 'production') {
      config.plugin('preload').tap((args) => {
        args[0].fileBlacklist.push(/\.css$/)
        return args
      })
      config.plugin('html').tap((args) => {
        args[0].inlineSource = '.(css)$'
        return args
      })
    }
    if (process.env.NODE_ENV === 'development') {
      config.output.filename('[name].[hash].js').end()
    }
    const svgRule = config.module.rule('svg')

    svgRule.uses.clear()

    svgRule
      .use('babel-loader')
      .loader('babel-loader')
      .end()
      .use('vue-svg-loader')
      .loader('vue-svg-loader')
  }
}
