import webpack, {Configuration} from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";

export const buildPlugins = ({mode, paths}: BuildOptions): Configuration['plugins'] => {
  const isDev = mode === 'development';

  const plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({template: paths.html}),
  ];

  if (isDev) {
    plugins.push(new webpack.ProgressPlugin())
  }

  if (!isDev) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: '[name].[contenthash:8].css',
        chunkFilename: '[name].[contenthash:8].css',
      }))
  }
  return plugins;
}