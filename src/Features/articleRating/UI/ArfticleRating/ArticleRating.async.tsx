import { Suspense, lazy } from "react";
import { AricleRatingProps } from "./ArticleRating";
import { Skeleton } from "@/Shared//UI/Skeleton/Skeleton";
// separate chunk
const ArticleRatingLazy = lazy(async () => await import("./ArticleRating"));
export const ArticleRatingAsync = (props: AricleRatingProps) => {
  return (
    <Suspense fallback={<Skeleton width={"100%"} height={140} />}>
      <ArticleRatingLazy {...props} />
    </Suspense>
  );
};
