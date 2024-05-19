import { Configuration } from "webpack";
import { resolveRoot } from "../utils";
import { BuildOptions } from "./types/types";

export const buildResolvers = (options: BuildOptions): Configuration['resolve'] => {
  return {
    extensions: ['.tsx', '.ts', '.js'],
    alias: {
      "@images": resolveRoot('src', 'shared', 'images'),
      "@shared": resolveRoot('src', 'shared'),
      "@widgets": resolveRoot('src', 'widgets'),
      "@entities": resolveRoot('src', 'entities'),
      "@features": resolveRoot('src', 'features'),
      "@pages": resolveRoot('src', 'pages'),
      "@providers": resolveRoot('src', 'app', 'providers'),
      "@src": resolveRoot('src'),
      '@scripts': resolveRoot('scripts'),
      '@': resolveRoot(''),
    },
  }
}