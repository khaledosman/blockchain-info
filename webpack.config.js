const path = require('path')
const slsw = require('serverless-webpack')
const nodeExternals = require('webpack-node-externals')
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const CopyPlugin = require('copy-webpack-plugin')
// const PnpWebpackPlugin = require('pnp-webpack-plugin')

const commonPlugins = []
const plugins = slsw.lib.webpack.isLocal ? [...commonPlugins, new ForkTsCheckerWebpackPlugin({
  eslint: {
    files: '**/*.{ts,tsx,js,jsx}'
  }
})] : commonPlugins
module.exports = {
  context: __dirname,
  mode: slsw.lib.webpack.isLocal ? 'development' : 'production',
  entry: slsw.lib.entries,
  devtool: slsw.lib.webpack.isLocal ? 'cheap-module-source-map' : 'source-map',
  resolve: {
    extensions: ['.ts', '.js', '.mjs', '.cjs'],
    symlinks: false,
    cacheWithContext: false
    // plugins: [
    //   PnpWebpackPlugin
    // ]
  },
  // resolveLoader: {
  //   plugins: [
  //     PnpWebpackPlugin.moduleLoader(module)
  //   ]
  // },
  output: {
    libraryTarget: 'commonjs',
    path: path.join(__dirname, '.webpack'),
    filename: '[name].js'
    // ecmaVersion: 'es6'
  },
  target: 'node',
  externals: [nodeExternals()],
  module: {
    rules: [
      // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
      {
        test: /\.(tsx?)$/,
        loader: 'ts-loader',
        exclude: [
          path.resolve(__dirname, 'node_modules'),
          path.resolve(__dirname, '.serverless'),
          path.resolve(__dirname, '.webpack')
        ],
        options: {
          transpileOnly: true,
          experimentalWatchApi: true
        }
      }
    ]
  },
  plugins: plugins,
  performance: {
    hints: 'warning'
  }
}
