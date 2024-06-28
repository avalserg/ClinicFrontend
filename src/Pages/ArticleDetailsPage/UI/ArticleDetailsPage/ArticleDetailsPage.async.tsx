import { FC, lazy } from "react";
import { ArticleDetailsPageProps } from "./ArticleDetailsPage";

export const ArticleDetailsPageAsync = lazy<FC<ArticleDetailsPageProps>>(
  async () =>
    await new Promise((resolve) => {
      setTimeout(() => {
        resolve(import("./ArticleDetailsPage"));
      }, 400);
    }),
);
