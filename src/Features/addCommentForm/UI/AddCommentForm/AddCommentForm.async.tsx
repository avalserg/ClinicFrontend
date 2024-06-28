import { FC, lazy } from "react";
import { AddCommentFormProps } from "./AddCommentForm";

// separate chunk
export const AddCommentFormAsync = lazy<FC<AddCommentFormProps>>(
  async () => await import("./AddCommentForm"),
);
