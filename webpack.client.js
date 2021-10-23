const path = require("path");
const webpack = require("webpack");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const cwd = process.cwd();

module.exports = {
  name: "browser",
  mode: "development",
  entry: [
    "webpack-hot-middleware/client?reload=true",
    path.join(cwd, "client", "index.tsx"),
  ],
  output: {
    path: path.join(cwd, "build"),
    filename: "dist.js",
    publicPath: "/build/",
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
      {
        test: /\.s?css/,
        use: ["style-loader", "css-loader", "sass-loader"],
        exclude: /node_modules/,
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
    ],
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      'API_URL': JSON.stringify("https://test-api.mojob.io/public/job")
    })
  ],
  optimization: {
    emitOnErrors: false,
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    alias: {
      "react-dom": "@hot-loader/react-dom",
    },
    plugins: [new TsconfigPathsPlugin()],
  },
};
