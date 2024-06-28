import { lazy } from "react";

// separate chunk
export const ForbiddenPageAsync = lazy(
  async () => await import("./ForbiddenPage"),
);
