import type webpack from "webpack";
import { type BuildOptions } from "./types/config";
import { buildCssLoader } from "./loaders/buildCssLoader";
import { buildBabelLoader } from "./loaders/buildBabelLoader";
// последовательность лоадеров имеет значение
export function buildLoaders(options: BuildOptions): webpack.RuleSetRule[] {
  const { isDev } = options;
  const svgLoader = {
    test: /\.svg$/,
    use: [{
        loader: '@svgr/webpack',
        // чтобы управлять цветами иконок
        options: {
            icon: true,
            svgoConfig: {
                plugins: [
                    {
                        name: 'convertColors',
                        params: {
                            currentColor: true,
                        }
                    }
                ]
            }
        }
    }],
};
  const codeBabelLoader = buildBabelLoader({ ...options, isTsx: false });
  const tsxCodeBabelLoader = buildBabelLoader({ ...options, isTsx: true });
  const cssLoader = buildCssLoader(isDev);
  // если не используем typescript нужен babel-loader
  // const typescriptLoader = {
  //   // лоадер для ts
  //   test: /\.tsx?$/,
  //   use: "ts-loader",
  //   exclude: /node_modules/,
  // };
  const fileLoader = {
    rules: [
      {
        test: /\.(png|jpe?g|gif|woff|woff2)$/i,
        use: [
          {
            loader: "file-loader",
          },
        ],
      },
    ],
  };
  return [
    fileLoader,
    svgLoader,
    codeBabelLoader,
    tsxCodeBabelLoader,
    cssLoader,
  ];
}
