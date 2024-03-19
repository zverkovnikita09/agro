import {resolveRoot} from "./utils";
import webpack from "webpack";
import {buildWebpack} from "./build/buildWebpack";
import {BuildMode, BuildPaths} from "./build/types/types";

interface EnvVariables {
  mode: BuildMode;
  port?: number;
}

export default (env: EnvVariables) => {
  const paths: BuildPaths = {
    output: resolveRoot('build'),
    entry: resolveRoot('src', 'index.tsx'),
    html: resolveRoot('src', 'index.html'),
  }
  const config: webpack.Configuration = buildWebpack({
    mode: env.mode ?? 'development',
    port: env.port ?? 3000,
    paths: paths,
  });
  return config;
};