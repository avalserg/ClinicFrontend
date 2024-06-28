export type BuildMode = "production" | "development";
export interface BuildPaths {
  // путь до entrypoint
  entry: string;
  // путь до build папки
  build: string;
  html: string;
  src: string;
  locales: string;
  buildLocales: string;
}
export interface BuildEnv {
  mode: BuildMode;
  port: number;
  apiUrl: string;
}
export interface BuildOptions {
  mode: BuildMode;
  paths: BuildPaths;
  isDev: boolean;
  port: number;
  apiUrl: string;
  // for shared environement
  project: "storybook" | "frontend" | "jest";
}
