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
  }
}
