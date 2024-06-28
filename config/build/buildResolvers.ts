import { type ResolveOptions } from "webpack";
import { type BuildOptions } from "./types/config";

export function buildResolvers(options: BuildOptions): ResolveOptions {
  return {
    // чтобы не указывать расширения файлов при импорте
    extensions: [".tsx", ".ts", ".js"],
    // приоритет абсолютных путей
    preferAbsolute: true,
    // шаблоны для абсолютных путей
    modules: [options.paths.src, "node_modules"],
    // главный файл модуля index.tsx
    mainFiles: ["index"],
    alias: { "@": options.paths.src },
  };
}
