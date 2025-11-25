const HtmlWebpackPlugin = require('html-webpack-plugin');
const { ModuleFederationPlugin } = require('webpack').container;
const path = require('path');

module.exports = (env, argv) => {
  const isDev = argv.mode === 'development';
  const publicPath = process.env.PUBLIC_PATH || (isDev ? 'http://localhost:3002/' : '/microfrontend/cart/');

  return {
    entry: './src/index.tsx',
    mode: 'development',
    devtool: 'eval-source-map',

    devServer: {
      port: 3002,
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
        name: 'mfeCart',
        filename: 'remoteEntry.js',
        exposes: {
          './Cart': './src/Cart',
          './cartStore': './src/store/cartStore',
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
