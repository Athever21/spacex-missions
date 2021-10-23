const path = require("path");
const cwd = process.cwd();
const TerserPlugin = require("terser-webpack-plugin");
const TsconfigPathsPlugin = require("tsconfig-paths-webpack-plugin");
const webpack = require("webpack");

module.exports = {
  name: "browser",
  mode: "production",
  entry: [path.join(cwd, "client", "index.tsx")],
  output: {
    path: path.join(cwd, "build"),
    filename: "dist-[name].js",
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
  optimization: {
    minimize: true,
    minimizer: [new TerserPlugin()],
    splitChunks: {
      chunks: "all",
    },
  },
  plugins: [
    new webpack.DefinePlugin({
      'API_URL': JSON.stringify("https://test-api.mojob.io/public/job"),
    }),
  ],
  resolve: {
    extensions: [".ts", ".tsx", ".js", ".json"],
    plugins: [new TsconfigPathsPlugin()],
  },
};
