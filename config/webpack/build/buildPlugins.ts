import webpack, { Configuration } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import { BuildOptions } from "./types/types";
import CopyWebpackPlugin from "copy-webpack-plugin"
import dotenv from 'dotenv';

export const buildPlugins = ({ mode, paths }: BuildOptions): Configuration['plugins'] => {
  const isDev = mode === 'development';

  // dotenv вернет объект с полем parsed 
  const env = dotenv.config().parsed;

  // сделаем reduce, чтобы сделать объект
  const envKeys = Object.keys(env ?? {}).reduce((prev, next) => {
    //@ts-ignore
    prev[`process.env.${next}`] = JSON.stringify(env[next]);
    return prev;
  }, {});


  const plugins: Configuration['plugins'] = [
    new HtmlWebpackPlugin({ template: paths.html }),
    new webpack.DefinePlugin(envKeys),
    new CopyWebpackPlugin({
      patterns: [{
        from: 'public',
        to: '',
        globOptions: {
          ignore: [
            '**/index.html'
          ]
        }
      }],

    })
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