const HtmlWebpackPlugin = require("html-webpack-plugin");
const webpack = require("webpack");
const Dotenv = require("dotenv-webpack");
const path = require("path");

module.exports = (env) => {
  console.log('mode', env.development);
  return {
    entry: {
      index: path.resolve(__dirname, "src", "index.js")
    },
    output: {
      filename: "bundle.js",
      path: path.resolve(__dirname, "build"),
      publicPath: "/",
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: [path.resolve(__dirname, 'node_modules')],
          use: ["babel-loader", "eslint-loader"],
        },
        {
          test: /\.(css|sass|scss)$/,
          use: ["style-loader", "css-loader", "sass-loader"],
        },
        {
          test: /\.(woff|woff2|ttf|eot|svg)$/,
          use: ["file-loader", "url-loader"],
        },
      ],
    },
    devtool: "inline-source-map",
    devServer: {
      contentBase: path.resolve(__dirname, "build"),
      compress: true,
      port: 3000,
      historyApiFallback: true,
    },
    stats: {
      errorDetails: true,
    },
    resolve: {
      alias: {
        process: "process/browser",
        buffer: "buffer",
        crypto: "crypto-browserify",
        util: "util",
        stream: "stream-browserify",
      },
      fallback: {},
    },
    plugins: [
      new HtmlWebpackPlugin({
        template: path.resolve(__dirname, "src", "index.html"),
      }),
      new webpack.ProgressPlugin(),
      new webpack.ProvidePlugin({
        process: 'process/browser',
      }),
      env.production ?
        new webpack.DefinePlugin({
          "process.env": {},
        }) :
        new Dotenv({
          path: "./.env",
          safe: true,
        }),
    ],
  };
};
