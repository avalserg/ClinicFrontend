import { type FC, lazy } from "react";
import { type LoginFormProps } from "./LoginForm";
// separate chunk
export const LoginFormAsync = lazy<FC<LoginFormProps>>(
  async () => await import("./LoginForm"),
);
