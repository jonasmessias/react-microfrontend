const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';
  const publicPath = process.env.PUBLIC_PATH || (isDev ? 'http://localhost:3000/' : '/microfrontend/');

  return {
    entry: './src/index.tsx',
    mode: 'development',
    devServer: {
      port: 3000,
      hot: true,
      historyApiFallback: true,
      headers: {
        'Access-Control-Allow-Origin': '*',
      },
    },
    output: {
      publicPath,
      clean: true,
    },
    resolve: {
      extensions: ['.ts', '.tsx', '.js', '.jsx'],
    },
    module: {
      rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
      {
        test: /\.css$/,
        use: [
          'style-loader',
          'css-loader',
          {
            loader: 'postcss-loader',
            options: {
              postcssOptions: {
                config: path.resolve(__dirname, 'postcss.config.js'),
              },
            },
          },
        ],
      },
    ],
    },
    plugins: [
    new ModuleFederationPlugin({
      name: 'shell',
      remotes: {
        mfeProducts: process.env.PRODUCTS_URL || (isDev 
          ? 'mfeProducts@http://localhost:3001/remoteEntry.js'
          : 'mfeProducts@/microfrontend/products/remoteEntry.js'),
        mfeCart: process.env.CART_URL || (isDev
          ? 'mfeCart@http://localhost:3002/remoteEntry.js'
          : 'mfeCart@/microfrontend/cart/remoteEntry.js'),
      },
      shared: {
        react: {
          singleton: true,
          requiredVersion: '^18.2.0',
        },
        'react-dom': {
          singleton: true,
          requiredVersion: '^18.2.0',
        },
        zustand: {
          singleton: true,
        },
      },
    }),
    new HtmlWebpackPlugin({
      template: './public/index.html',
    }),
    ],
  };
};
