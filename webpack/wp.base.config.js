'use strict'

const path = require('path')

module.exports = {
  context: path.join(__dirname, '../'),
  entry: path.join(__dirname, '../src'),
  target: 'node',
  output: {
    filename: 'index.js',
    path: path.join(__dirname, '../dist'),
    libraryTarget: "commonjs"
  },
  externals: [
    /^[a-z\-0-9]+$/ // Ignore node_modules folder
  ],
  module: {
    loaders: [
      { test: /\.tsx?$/, loader: 'ts-loader', include: [path.join(__dirname, '../libs'),path.join(__dirname, '../src')] },
    ]
  },
  resolve: {
    extensions: ['.webpack.js', '.web.js', '.ts', '.tsx', '.js'],
    modules: ['node_modules'],
    alias: {
      '@common': path.resolve(__dirname, '../libs/common'),
      '@assemblies': path.resolve(__dirname, '../src/assemblies'),
      '@config': path.resolve(__dirname, '../src/config'),
      '@models': path.resolve(__dirname, '../src/models'),
      '@controllers': path.resolve(__dirname, '../src/controllers'),
      '@services': path.resolve(__dirname, '../src/services'),
      '@utils': path.resolve(__dirname, '../src/utils'),
      '@middlewares': path.resolve(__dirname, '../src/middlewares'),
    }  
  },
  plugins: [
  ],
}