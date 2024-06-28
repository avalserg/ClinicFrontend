/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { lazy } from "react";

export const ProfilePageAsync = lazy(async () => await import("./ProfilePage"));
