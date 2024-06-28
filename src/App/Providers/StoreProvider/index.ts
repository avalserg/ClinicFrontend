/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  type StateSchema,
  ThunkConfig,
  StateSchemaKey,
  ReduxStoreWithManager,
} from "./Config/StateSchema";
import { createReduxStore, AppDispatch } from "./Config/store";
import { StoreProvider } from "./UI/StoreProvider";

export { StoreProvider, createReduxStore };
export type {
  StateSchema,
  AppDispatch,
  ThunkConfig,
  ReduxStoreWithManager,
  StateSchemaKey,
};
