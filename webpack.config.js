const path = require("path");
const webpack = require("webpack");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const publicPath = "/react/template/";
// const publicPath = '/';

module.exports = {
  mode: "development",
  entry: path.join(__dirname, "src", "index.js"),
  output: {
    path: path.resolve(__dirname, "dist"),
  },
  devServer: {
    port: 3001,
    historyApiFallback: true,
  },
  externals: {
    // global app config object
    config: JSON.stringify({
      apiUrl: "",
      publicPath: "/react/template/",
    }),
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js", ".jsx"],
    alias: {
      Assets: path.resolve(__dirname, "src/assets/"),
    },
  },
  module: {
    rules: [
      {
        // config for es6 jsx
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
        },
      },
      {
        test: /\.js$/,
        enforce: "pre",
        use: ["source-map-loader"],
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        // config for sass compilation
        test: /\.scss$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
          },
          "css-loader",
          {
            loader: "sass-loader",
          },
        ],
      },

      {
        test: /\.(jpe?g|png|gif|woff|woff2|otf|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 1000,
              name: "assets/img/[name].[ext]",
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),

    new HtmlWebpackPlugin({
      template: path.join(__dirname, "public", "index.html"),
      filename: "./index.html",
      favicon: "./public/favicon.png",
    }),
    new MiniCssExtractPlugin({
      // plugin for controlling how compiled css will be outputted and named
      filename: "css/[name].css",
      chunkFilename: "css/[id].css",
    }),
    new CleanWebpackPlugin({
      cleanOnceBeforeBuildPatterns: [
        "css/*.*",
        "js/*.*",
        "fonts/*.*",
        "images/*.*",
      ],
    }),
    new webpack.ProvidePlugin({
      //To automatically load jquery
      $: "jquery",
      jQuery: "jquery",
      "window.jQuery": "jquery",
    }),
  ],
};
