import type { Configuration as DevServerConfiguration } from "webpack-dev-server";
import { type BuildOptions } from "./types/config";

const fs = require('fs');
// перезапуск сборки после билда
export function buildDevServer(options: BuildOptions): DevServerConfiguration {
  return {
    port: options.port,
    // автоматическое открытие страницы с приложением в браузере
    open: true,
    // для роутинга
    historyApiFallback: true,
    hot: true,
    https: {
        key: fs.readFileSync("cert.key"),
        cert: fs.readFileSync("cert.crt"),
        ca: fs.readFileSync("ca.crt"),
    },
    
  };
}
