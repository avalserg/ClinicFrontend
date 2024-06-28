import { lazy } from "react";

// separate chunk
export const SettingsPageAsync = lazy(
  async () => await import("./SettingsPage"),
);
