import MiniCssExtractPlugin from "mini-css-extract-plugin";

export function buildCssLoader(isDev: boolean) {
  return {
    test: /\.s[ac]ss$/i,
    exclude: /node_modules/,
    use: [
      // выбираем лоадеры в зависимости от режима
      isDev ? "style-loader" : MiniCssExtractPlugin.loader,

      {
        loader: "css-loader",
        options: {
          // add css modules support
          modules: {
            // модульные
            auto: (resPath: string) => Boolean(resPath.includes(".module.")),
            // не модульные файлы
            localIdentName: isDev
              ? "[path][name]__[local]--[hash:base64:5]"
              : "[hash:base64:8]",
          },
        },
      },

      "sass-loader",
    ],
  };
}
