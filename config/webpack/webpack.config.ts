import {resolveRoot} from "./utils";
import webpack from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import type {Configuration as DevServerConfiguration} from "webpack-dev-server";

type Mode = 'production' | 'development';

interface EnvVariables {
  mode: Mode;
}

export default (env: EnvVariables) => {
  const config: webpack.Configuration = {
    mode: env.mode ?? 'development',
    entry: resolveRoot('src', 'index.ts'),
    output: {
      path: resolveRoot('build'),
      filename: '[name].[contenthash].js',
      clean: true,
    },
    plugins: [
      new HtmlWebpackPlugin({template: resolveRoot('src', 'index.html')}),
    ],
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.tsx', '.ts', '.js'],
      alias: {
        '@scripts': resolveRoot('scripts'),
      },
    },
    devServer: {
      port: 3000,
      open: true
    }
  }
  return config;
};