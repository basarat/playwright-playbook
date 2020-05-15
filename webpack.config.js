module.exports = {
  entry: {
    index: './src/webapp/frontend/index.tsx',
    actions: './src/webapp/frontend/actions.tsx',
  },
  output: {
    path: __dirname + '/public',
    filename: 'build/[name].js',
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js']
  },
  module: {
    rules: [
      { test: /\.tsx?$/, loader: 'ts-loader' }
    ]
  },
  devServer: {
    contentBase: __dirname + '/public',
    port: 3000,
    proxy: {
      '/api': {
        target: 'http://localhost:9000',
      },
      '/auth': {
        target: 'http://localhost:9000',
      }
    }
  }
}
