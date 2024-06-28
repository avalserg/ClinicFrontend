import type webpack from "webpack";
import { type BuildOptions } from "./types/config";
import { buildPlugins } from "./buildPlugin";
import { buildLoaders } from "./buildLoaders";
import { buildResolvers } from "./buildResolvers";
import { buildDevServer } from "./buildDevServer";
// paths in webpack.config.ts
export function buildWebpackConfig(
  options: BuildOptions
): webpack.Configuration {
    const { paths, mode, isDev } = options;
  return {
    mode,
    entry: paths.entry,
    output: {
      // уникальное имя
      filename: "[name].[contenthash].js",
      path: paths.build,
      // чтобы не собирались старые файлы после новой сборки webpack
      clean: true,
      // for articles and so on which doesnt exist such folder
      publicPath: "/",
    },
    plugins: buildPlugins(options),
    module: {
      // конфигурация лоадеров(файлов не js)
      rules: buildLoaders(options),
    },
    resolve: buildResolvers(options),
    // чтобы проще было найти ошибку при неудачной сборке
    devtool: isDev ? "eval-cheap-module-source-map" : undefined,
    devServer: isDev ? buildDevServer(options) : undefined,
  };
}
