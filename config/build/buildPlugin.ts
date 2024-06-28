import HtmlWebpackPlugin from "html-webpack-plugin";
import webpack from "webpack";
import { BundleAnalyzerPlugin } from "webpack-bundle-analyzer";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import ReactRefreshWebpackPlugin from "@pmmmwh/react-refresh-webpack-plugin";
import CircularDependencyPlugin from "circular-dependency-plugin";
import CopyPlugin from "copy-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { type BuildOptions } from "./types/config";

export function buildPlugins({
  paths,
  isDev,
  apiUrl,
  project,
}: BuildOptions): webpack.WebpackPluginInstance[] {
  const isProd = !isDev;
  const plugins = [
    new HtmlWebpackPlugin({
      template: paths.html,
    }),
    new webpack.ProgressPlugin(),
    // можно прокидывать константы определенные в global.d.ts
    new webpack.DefinePlugin({
      __IS_DEV__: JSON.stringify(isDev),
      __API__: JSON.stringify(apiUrl),
      __PROJECT__: JSON.stringify(project),
    }),

    new CircularDependencyPlugin({
      exclude: /node_modules/,
      failOnError: true,
    }),
    // checking types separate process
    new ForkTsCheckerWebpackPlugin({
      typescript: {
        diagnosticOptions: {
          semantic: true,
          syntactic: true,
        },
        mode: "write-references",
      },
    }),
  ];
  if (isDev) {
    // обновляет страницу без перезагрузки webpack
    plugins.push(new ReactRefreshWebpackPlugin());
    plugins.push(new webpack.HotModuleReplacementPlugin());
    // анализ бандла
    plugins.push(
      new BundleAnalyzerPlugin({
        openAnalyzer: false,
      })
    );
  }
  if (isProd) {
    plugins.push(
      new MiniCssExtractPlugin({
        filename: "css/[name].[contenthash:8].css",
        chunkFilename: "css/[name].[contenthash:8].css",
      })
    );
    // copy translates in build folder
    plugins.push(
      new CopyPlugin({
        patterns: [{ from: paths.locales, to: paths.buildLocales }],
      })
    );
  }
  return plugins;
}
