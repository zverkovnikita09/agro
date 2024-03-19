import {ModuleOptions} from "webpack"
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import {BuildOptions} from "./types/types";

export const buildLoaders = (options: BuildOptions): ModuleOptions['rules'] => {
  const isDev = options.mode === 'development';

  const tsLoader = {
    test: /\.tsx?$/,
    use: 'ts-loader',
    exclude: /node_modules/,
  };

  const scssLoader = {
    test: /\.s[ac]ss$/i,
    use: [
      isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
      {
        loader: "css-loader",
        options: {
          modules: {
            localIdentName: isDev ? '[name]__[local]_[hash:base64:2]' : '[hash:base64:8]',
          },
        },
      },
      "sass-loader",
    ],
  };

  return [
    scssLoader,
    tsLoader,
  ]
}