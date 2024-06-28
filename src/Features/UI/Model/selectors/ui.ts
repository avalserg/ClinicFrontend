import { createSelector } from "@reduxjs/toolkit";
import { StateSchema } from "@/App/Providers/StoreProvider";

export const getUIScroll = (state: StateSchema) => state.ui.scroll;
// reselect
export const getUIScrollByPath = createSelector(
  // get all object
  getUIScroll,
  // передвем путь
  (state: StateSchema, path: string) => path,
  (scroll, path) => scroll[path] || 0,
);
